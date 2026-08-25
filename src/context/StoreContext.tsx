import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProduct, type Product } from "../data/products";
import type { CartLine } from "../lib/utils";

export interface CartItem {
  productId: string;
  size: string;
  color: string;
  qty: number;
}

export interface Toast {
  id: number;
  title: string;
  sub?: string;
}

interface StoreShape {
  cart: CartItem[];
  wishlist: string[];
  recentlyViewed: string[];
  toasts: Toast[];
  cartOpen: boolean;
  searchOpen: boolean;
  menuOpen: boolean;
  sizeGuideOpen: boolean;
  quickViewId: string | null;
  setCartOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
  setMenuOpen: (v: boolean) => void;
  setSizeGuideOpen: (v: boolean) => void;
  setQuickViewId: (id: string | null) => void;
  addToCart: (productId: string, size: string, color: string, qty?: number, silent?: boolean) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQty: (productId: string, size: string, color: string, qty: number) => void;
  toggleWishlist: (productId: string) => void;
  inWishlist: (productId: string) => boolean;
  trackView: (productId: string) => void;
  pushToast: (title: string, sub?: string) => void;
  cartLines: CartLine[];
  cartCount: number;
  subtotal: number;
}

const Ctx = createContext<StoreShape | null>(null);

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — ignore */
  }
}

let toastSeq = 1;

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => load("lotus.cart", []));
  const [wishlist, setWishlist] = useState<string[]>(() => load("lotus.wishlist", []));
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => load("lotus.recent", []));
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [quickViewId, setQuickViewId] = useState<string | null>(null);

  useEffect(() => save("lotus.cart", cart), [cart]);
  useEffect(() => save("lotus.wishlist", wishlist), [wishlist]);
  useEffect(() => save("lotus.recent", recentlyViewed), [recentlyViewed]);

  useEffect(() => {
    document.body.style.overflow = cartOpen || searchOpen || menuOpen || quickViewId ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, searchOpen, menuOpen, quickViewId]);

  const pushToast = useCallback((title: string, sub?: string) => {
    const id = toastSeq++;
    setToasts((t) => [...t.slice(-2), { id, title, sub }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  const addToCart = useCallback(
    (productId: string, size: string, color: string, qty = 1, silent = false) => {
      setCart((prev) => {
        const idx = prev.findIndex((i) => i.productId === productId && i.size === size && i.color === color);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], qty: Math.min(10, next[idx].qty + qty) };
          return next;
        }
        return [...prev, { productId, size, color, qty }];
      });
      if (!silent) {
        const p = getProduct(productId);
        pushToast("Added to bag", p ? `${p.name} · ${size}` : undefined);
      }
    },
    [pushToast]
  );

  const removeFromCart = useCallback((productId: string, size: string, color: string) => {
    setCart((prev) => prev.filter((i) => !(i.productId === productId && i.size === size && i.color === color)));
  }, []);

  const updateQty = useCallback((productId: string, size: string, color: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((i) => !(i.productId === productId && i.size === size && i.color === color))
        : prev.map((i) => (i.productId === productId && i.size === size && i.color === color ? { ...i, qty: Math.min(10, qty) } : i))
    );
  }, []);

  const toggleWishlist = useCallback(
    (productId: string) => {
      setWishlist((prev) => {
        const has = prev.includes(productId);
        pushToast(has ? "Removed from wishlist" : "Saved to wishlist", has ? undefined : "Find it under the heart icon");
        return has ? prev.filter((id) => id !== productId) : [...prev, productId];
      });
    },
    [pushToast]
  );

  const inWishlist = useCallback((productId: string) => wishlist.includes(productId), [wishlist]);

  const trackView = useCallback((productId: string) => {
    setRecentlyViewed((prev) => [productId, ...prev.filter((id) => id !== productId)].slice(0, 8));
  }, []);

  const cartLines = useMemo<CartLine[]>(
    () =>
      cart
        .map((i) => {
          const product = getProduct(i.productId);
          return product ? { product, size: i.size, color: i.color, qty: i.qty } : null;
        })
        .filter((x): x is CartLine => x !== null),
    [cart]
  );

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);
  const subtotal = useMemo(() => cartLines.reduce((s, l) => s + l.product.price * l.qty, 0), [cartLines]);

  const value: StoreShape = {
    cart, wishlist, recentlyViewed, toasts,
    cartOpen, searchOpen, menuOpen, sizeGuideOpen, quickViewId,
    setCartOpen, setSearchOpen, setMenuOpen, setSizeGuideOpen, setQuickViewId,
    addToCart, removeFromCart, updateQty, toggleWishlist, inWishlist, trackView, pushToast,
    cartLines, cartCount, subtotal,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export type { Product };
