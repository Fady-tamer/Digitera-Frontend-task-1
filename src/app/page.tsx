"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/features/cart";
import { productPaths } from "@/features/products";
import { mockProducts } from "@/features/products/services/products.mock-data";
import type { Product } from "@/features/products/types/product.types";

const featuredProducts = mockProducts.filter((product) =>
  ["fleur-de-lune", "santal-parchment", "sol-dor", "noir-cocoon"].includes(
    product.id,
  ),
);

const archetypes = [
  ["Floral", "Rose, Jasmine, Neroli", "/images/home/archetype-floral.png"],
  ["Woody", "Cedarwood, Oud, Santal", "/images/home/archetype-woody.png"],
  ["Oriental", "Amber, Spices, Vanilla", "/images/home/archetype-oriental.png"],
  ["Fresh", "Bergamot, Sea Salt, Mint", "/images/home/archetype-fresh.png"],
];

const occasions = [
  [
    "Personal Use",
    "Everyday luxury as second skin",
    "/images/home/occasion-personal.png",
  ],
  [
    "Wedding",
    "Immortalize the vows with notes of white jasmine",
    "/images/home/occasion-wedding.png",
  ],
  [
    "Gift Sets",
    "A bespoke gesture of ultimate prestige",
    "/images/home/occasion-gifts.png",
  ],
  [
    "Birthday",
    "Vibrant, celebrating a personal revolution",
    "/images/home/occasion-birthday.png",
  ],
];

function FeaturedCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <article className="home-product-card">
      <Link
        href={productPaths.detail(product.id)}
        className="home-product-image"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 900px) 25vw, 90vw"
        />
      </Link>
      <div className="home-product-details">
        <div className="home-product-heading">
          <Link href={productPaths.detail(product.id)}>
            <h3>{product.name}</h3>
            <p>{product.notes}</p>
          </Link>
          <strong>${product.price}</strong>
        </div>
        <button
          type="button"
          onClick={() =>
            addItem({
              productId: product.id,
              name: product.name,
              price: product.price,
              image: product.images[0],
              selectedOptions: {},
            })
          }
        >
          Add to Cart +
        </button>
      </div>
    </article>
  );
}

export default function HomeRoute() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <Image
          src="/images/home/hero.png"
          alt="A perfume bottle in a sunlit botanical setting"
          fill
          priority
          sizes="100vw"
        />
        <div className="home-hero-overlay" />
        <div className="home-hero-content">
          <h1>Narrative In A Glass</h1>
          <p>
            Ethereal extractions designed to evoke memory, stillness, and
            elegant presence. Crafted with deliberate restraint in our Parisian
            studio.
          </p>
          <Link href={productPaths.list} className="home-gold-button">
            Explore The Collections
          </Link>
        </div>
      </section>

      <section className="home-section home-trending">
        <div className="home-section-heading">
          <h2>Olfactory Signatures</h2>
          <p>THE CURRENTLY HIGHLY COVETED EXTRACTIONS</p>
        </div>
        <div className="home-product-grid">
          {featuredProducts.map((product) => (
            <FeaturedCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="home-section home-archetypes">
        <div className="home-section-heading">
          <h2>Scent Archetypes</h2>
          <p>CURATE YOUR PRESENCE BY SCENT PROFILE</p>
        </div>
        <div className="home-archetype-grid">
          {archetypes.map(([name, notes, image]) => (
            <Link
              href={productPaths.list}
              className="home-archetype"
              key={name}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="(min-width: 900px) 25vw, 90vw"
              />
              <span className="home-card-overlay" />
              <span>
                <b>{name}</b>
                <small>{notes}</small>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section home-occasions">
        <div className="home-section-heading">
          <h2>Occasional Scent Curation</h2>
          <p>INTENTIONALLY FORMULATED FOR SIGNIFICANT MOMENTS</p>
        </div>
        <div className="home-occasion-grid">
          {occasions.map(([name, description, image]) => (
            <Link href={productPaths.list} className="home-occasion" key={name}>
              <Image
                src={image}
                alt=""
                fill
                sizes="(min-width: 900px) 25vw, 90vw"
              />
              <span>
                <b>{name}</b>
                <small>{description}</small>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-promo">
        <div className="home-promo-image">
          <Image
            src="/images/home/solstice.png"
            alt="The Solstice fragrance collection"
            fill
            sizes="(min-width: 900px) 46vw, 100vw"
          />
        </div>
        <div className="home-promo-content">
          <p>The Summer Solstice</p>
          <h2>Le Jardin d&apos;Or Solstice Collection</h2>
          <span>
            Our highly anticipated limited reserve capturing the fleeting scent
            of summer dusk. Formulated with night-blooming cereus and sun-warmed
            clay.
          </span>
          <Link href={productPaths.list} className="home-dark-button">
            Secure the Bottle
          </Link>
        </div>
      </section>

      <section className="home-newsletter">
        <h2>Atelier Chronicles</h2>
        <p>
          Subscribe to receive exclusive access to Private Reserves, launch
          invitations, and seasonal olfactory compositions.
        </p>
        <form>
          <input
            type="email"
            placeholder="Enter your email address"
            aria-label="Email address"
          />
          <button type="submit">Join</button>
        </form>
      </section>
      <footer className="home-footer">
        <div className="home-footer-brand">
          <div>ODORATUS</div>
          <p>
            An independent olfactory house cultivating slow-luxury liquid
            narratives. Every bottle is hand-poured in small batches using
            sustainably sourced botanicals.
          </p>
          <span>◎ &nbsp; ◌ &nbsp; ◉</span>
        </div>
        <div>
          <b>Collections</b>
          <Link href={productPaths.list}>La Maison</Link>
          <Link href={productPaths.list}>Private Reserve</Link>
          <Link href={productPaths.list}>Scented Candles</Link>
          <Link href={productPaths.list}>Discovery Sets</Link>
        </div>
        <div>
          <b>Customer Care</b>
          <Link href={productPaths.list}>Olfactory Consultation</Link>
          <Link href={productPaths.list}>Shipping &amp; Returns</Link>
          <Link href={productPaths.list}>Atelier Appointments</Link>
          <Link href={productPaths.list}>Care Guide</Link>
        </div>
        <div>
          <b>About Us</b>
          <Link href={productPaths.list}>Our Philosophy</Link>
          <Link href={productPaths.list}>Sourcing Standards</Link>
          <Link href={productPaths.list}>Sustainability Commitments</Link>
          <Link href={productPaths.list}>Contact</Link>
        </div>
      </footer>
    </div>
  );
}
