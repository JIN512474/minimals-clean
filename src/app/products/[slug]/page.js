import { notFound } from "next/navigation";
import { findBySlug } from "../../../data/products";
import ProductDetailClient from "../../../components/ProductDetailClient";

export default function ProductDetailPage({ params }) {
  const product = findBySlug(params.slug);
  if (!product) return notFound();
  return <ProductDetailClient product={product} />;
}
