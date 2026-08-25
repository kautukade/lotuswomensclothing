import { useEffect } from "react";
import { BRAND } from "../data/config";
import type { Product } from "../data/products";

export const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(" ");

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export const pctOff = (p: Pick<Product, "price" | "originalPrice">) =>
  Math.max(0, Math.round((1 - p.price / p.originalPrice) * 100));

export const waLink = (message: string) =>
  `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const productUrl = (id: string) => `${window.location.origin}${window.location.pathname}#/product/${id}`;

export interface OrderSelection {
  size?: string;
  color?: string;
  qty?: number;
}

export const orderMessage = (product: Product, sel: OrderSelection = {}) => {
  const lines = [
    "Hello Lotus Women's Clothing 🌸",
    "",
    "I would like to order:",
    "",
    `Product: ${product.name}`,
    `Product Code: ${product.code}`,
  ];
  if (sel.size) lines.push(`Size: ${sel.size}`);
  if (sel.color) lines.push(`Color: ${sel.color}`);
  lines.push(`Quantity: ${sel.qty ?? 1}`);
  lines.push(`Price: ${inr(product.price)}`);
  lines.push("", `Product Link: ${productUrl(product.id)}`);
  lines.push("", "Please confirm availability.");
  return lines.join("\n");
};

export interface CartLine {
  product: Product;
  size: string;
  color: string;
  qty: number;
}

export const checkoutMessage = (lines: CartLine[]) => {
  const items = lines
    .map(
      (l, i) =>
        `${i + 1}. ${l.product.name} (${l.product.code}) — Size: ${l.size}, Color: ${l.color}, Qty: ${l.qty}, Price: ${inr(l.product.price * l.qty)}`
    )
    .join("\n");
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  return [
    "Hello Lotus Women's Clothing 🌸",
    "",
    "I would like to place this order:",
    "",
    items,
    "",
    `Subtotal: ${inr(subtotal)}`,
    "",
    "Please confirm availability and share payment/delivery details.",
  ].join("\n");
};

export const deliveryWindow = () => {
  const [min, max] = BRAND.shippingEtaDays;
  const fmt = (d: Date) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  const a = new Date();
  a.setDate(a.getDate() + min);
  const b = new Date();
  b.setDate(b.getDate() + max);
  return `${fmt(a)} – ${fmt(b)}`;
};

export const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

export const isReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;
