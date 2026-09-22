import Link from "next/link";
import { CartNavLink } from "@/features/cart";
import { productPaths } from "@/features/products";

export function Header() {
  return (
    <header className="site-header">
      <div className="announcement">Complimentary signature gift wrapping on all orders above $150</div>
      <div className="header-inner">
        <nav className="header-nav" aria-label="Primary navigation">
          <Link href={productPaths.list}>Home</Link>
          <Link href={productPaths.list}>Shop</Link>
          <Link href={productPaths.list}>Categories</Link>
          <Link href={productPaths.list}>The Atelier</Link>
        </nav>
        <Link href={productPaths.list} className="wordmark">ODORATUS</Link>
        <div className="header-tools">
          <span className="search-pill">⌕&nbsp; Search fragrances...</span>
          <span aria-label="Account">♙</span>
          <CartNavLink />
        </div>
      </div>
    </header>
  );
}
