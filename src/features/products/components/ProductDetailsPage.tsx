"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useProduct } from "@/features/products/hooks/useProduct";
import type { Product } from "@/features/products/types/product.types";
import Image from "next/image";
import Link from "next/link";

export type ProductDetailsActionsContext = {
  product: Product;
  selectedOptions: Record<string, string>;
};

type ProductDetailsPageProps = {
  productId: string;
  actions?: (context: ProductDetailsActionsContext) => ReactNode;
};

export function ProductDetailsPage({
  productId,
  actions,
}: ProductDetailsPageProps) {
  const productQuery = useProduct(productId);
  const product = productQuery.data;
  const [selectedOptions] = useState<Record<string, string>>({});

  const resolvedOptions = useMemo(() => {
    if (!product) {
      return selectedOptions;
    }

    return Object.fromEntries(
      product.options.map((option) => [
        option.id,
        selectedOptions[option.id] ?? option.values[0],
      ]),
    );
  }, [product, selectedOptions]);

  if (productQuery.isLoading) {
    return <p className="text-sm text-zinc-600">Loading product...</p>;
  }

  if (!product) {
    return <p className="text-sm text-zinc-600">Product not found.</p>;
  }

  const companions = [
    ["fleur-de-lune", "Fleur de Lune", 195, "/images/products/fleur-de-lune.png", "Floral / Jasmine & White Musk"],
    ["noir-cocoon", "Noir Cocoon", 240, "/images/products/noir-cocoon.png", "Oriental / Tobacco & Amber"],
    ["sol-dor", "Sol d'Or", 185, "/images/products/sol-dor.png", "Fresh / Bergamot & Sea Salt"],
    ["rose-absolute", "Rose Absolute", 205, "/images/products/rose-absolute.png", "Floral / Damask Rose & Cedar"],
  ] as const;

  return (
    <>
      <section className="product-shell">
        <div className="breadcrumb">Home <span>›</span> Shop <span>›</span> Fragrances <span>›</span> <b>{product.name}</b></div>
        <div className="product-layout">
          <div className="gallery">
            <div className="hero-image"><Image src={product.images[0]} alt={product.name} fill priority sizes="(max-width: 900px) 100vw, 50vw" /></div>
            <div className="thumb-row">
              {[product.images[0], "/images/products/noir-cocoon.png", "/images/products/sol-dor.png"].map((image, index) => (
                <div className="thumb" key={image}><Image src={image} alt={`${product.name} view ${index + 1}`} fill sizes="20vw" /></div>
              ))}
            </div>
          </div>
          <div className="purchase-panel">
            <div className="eyebrows"><span>Scent family: {product.scentFamily}</span><span>Occasion: Evening</span></div>
            <h1>{product.name}</h1>
            <div className="price">${product.price}</div>
            <div className="availability"><i /> Available in Atelier</div>
            <div className="rule" />
            <label className="label">Select volume</label>
            <div className="volume-grid">
              {[["30 ml", "$145"], ["50 ml", "$180"], ["100 ml", "$220"]].map(([volume, amount], index) => <button className={index === 2 ? "volume active" : "volume"} key={volume}>{volume}<small>{amount}</small></button>)}
            </div>
            <div className="gift-box"><span>Complimentary Signature Gift Wrapping<small>Encased in linen paper box with custom wax seal stamp.</small></span><b>◯</b></div>
            <div className="cart-row"><div className="quantity"><button>−</button><span>1</span><button>+</button></div><div className="action-button">{actions?.({ product, selectedOptions: resolvedOptions })}</div></div>
            <div className="anatomy"><h2>Scent Anatomy</h2><p>{product.description} It opens with bright top notes, shifting to clean papyrus and warm, rich sandalwood that dry down into airy cardamom and amber.</p><div className="note-row"><b>Top notes</b><span>Sicilian Bergamot, Pink Pepper</span></div><div className="note-row"><b>Heart notes</b><span>Egyptian Jasmine, Benzoin, Papyrus</span></div><div className="note-row"><b>Base notes</b><span>West Indian Sandalwood, Cardamom, Amber</span></div></div>
          </div>
        </div>
      </section>
      <section className="companions"><h2>Olfactory Companions</h2><p>Fragrances of synonymous sophistication</p><div className="companion-grid">{companions.map(([id, name, price, image, notes]) => <article className="companion" key={id}><Link href={`/products/${id}`} className="companion-image"><Image src={image} alt={name} fill sizes="25vw" /></Link><div className="companion-meta"><span>{name}</span><b>${price}</b></div><small>{notes}</small><Link href={`/products/${id}`} className="companion-button">Add to cart +</Link></article>)}</div></section>
      <footer className="site-footer"><div><div className="footer-brand">ODORATUS</div><p>An independent olfactory house cultivating slow-luxury liquid narratives. Every bottle is hand-poured in small batches using sustainably sourced botanicals.</p><div className="socials">◎　◉　●</div></div><div><b>Collections</b><p>La Maison</p><p>Private Reserve</p><p>Scented Candles</p><p>Discovery Sets</p></div><div><b>Customer care</b><p>Olfactory Consultation</p><p>Shipping & Returns</p><p>Atelier Appointments</p><p>Care Guide</p></div><div><b>About us</b><p>Our Philosophy</p><p>Sourcing Standards</p><p>Sustainability Commitments</p><p>Journal</p></div></footer>
    </>
  );
}
