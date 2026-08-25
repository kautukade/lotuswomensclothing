import { lazy, Suspense, useEffect, useState } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { StoreProvider } from "./context/StoreContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartDrawer, QuickView, SearchOverlay, SizeGuideModal } from "./components/Overlays";
import { AmbientPetals, BottomNav, Cursor, FloatingWhatsApp, Loader, Toasts } from "./components/Chrome";
import { LotusMark } from "./components/ui";

/* route-level code splitting: three.js + page code loads on demand */
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Lookbook = lazy(() => import("./pages/Lookbook").then((m) => ({ default: m.Lookbook })));
const WatchShop = lazy(() => import("./pages/Lookbook").then((m) => ({ default: m.WatchShop })));
const JournalList = lazy(() => import("./pages/Journal").then((m) => ({ default: m.JournalList })));
const JournalPostPage = lazy(() => import("./pages/Journal").then((m) => ({ default: m.JournalPostPage })));
const About = lazy(() => import("./pages/Misc").then((m) => ({ default: m.About })));
const CollectionsPage = lazy(() => import("./pages/Misc").then((m) => ({ default: m.CollectionsPage })));
const Contact = lazy(() => import("./pages/Misc").then((m) => ({ default: m.Contact })));
const NotFound = lazy(() => import("./pages/Misc").then((m) => ({ default: m.NotFound })));
const Privacy = lazy(() => import("./pages/Misc").then((m) => ({ default: m.Privacy })));
const ReviewsPage = lazy(() => import("./pages/Misc").then((m) => ({ default: m.ReviewsPage })));
const ShippingReturns = lazy(() => import("./pages/Misc").then((m) => ({ default: m.ShippingReturns })));
const SizeGuidePage = lazy(() => import("./pages/Misc").then((m) => ({ default: m.SizeGuidePage })));
const Terms = lazy(() => import("./pages/Misc").then((m) => ({ default: m.Terms })));
const WishlistPage = lazy(() => import("./pages/Misc").then((m) => ({ default: m.WishlistPage })));

function Fallback() {
  return (
    <div className="grid min-h-[60vh] place-items-center pt-24">
      <div className="flex flex-col items-center gap-4">
        <motion.span animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.4, repeat: Infinity }}>
          <LotusMark className="h-14 w-14 text-plum" />
        </motion.span>
        <p className="font-body text-[11px] uppercase tracking-[0.3em] text-ink-soft">Blooming…</p>
      </div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

function PageFade({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 pb-20 md:pb-0"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}



export default function App() {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setBooting(false), 2200);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = booting ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [booting]);

  return (
    <StoreProvider>
      <HashRouter>
        <ScrollToTop />
        <Cursor />
        <AmbientPetals />
        <AnimatePresence>{booting && <Loader />}</AnimatePresence>
        <Navbar />
        <PageFade>
          <Suspense fallback={<Fallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/new-arrivals" element={<Shop preset="new" />} />
            <Route path="/plus-size" element={<Shop preset="plus" />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/lookbook" element={<Lookbook />} />
            <Route path="/watch-shop" element={<WatchShop />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/size-guide" element={<SizeGuidePage />} />
            <Route path="/journal" element={<JournalList />} />
            <Route path="/journal/:slug" element={<JournalPostPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/shipping-returns" element={<ShippingReturns />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </PageFade>
        <Footer />
        <CartDrawer />
        <SearchOverlay />
        <QuickView />
        <SizeGuideModal />
        <FloatingWhatsApp />
        <BottomNav />
        <Toasts />
      </HashRouter>
    </StoreProvider>
  );
}
