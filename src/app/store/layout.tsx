import { CartDrawer, CartProvider } from "@/components/store/Cart";
import { EarlyAccess, StoreFooter, StoreHeader } from "@/components/store/StoreChrome";
import "./store.css";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="store">
        <a href="#store-main" className="skip-link">
          Skip to content
        </a>
        <StoreHeader />
        <main id="store-main">{children}</main>
        <StoreFooter />
        <EarlyAccess />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
