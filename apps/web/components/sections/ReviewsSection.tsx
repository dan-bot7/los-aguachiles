import { Sparkles } from "lucide-react";
import { reviews } from "@los-aguachiles/shared";

export function ReviewsSection() {
  return (
    <section className="section-shell bg-white" aria-labelledby="reviews-title">
      <div className="container-shell">
        <div className="mb-8 max-w-2xl">
          <p className="eyebrow">Reseñas</p>
          <h2 id="reviews-title" className="text-[clamp(2rem,4.5vw,3.25rem)] font-black leading-tight text-navy">
            Comentarios que inspiran confianza
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <blockquote className="card p-6" key={review.quote}>
              <Sparkles className="mb-5 text-aguachile" size={24} aria-hidden="true" />
              <p className="mb-4 text-lg font-black text-navy">“{review.quote}”</p>
              <cite className="not-italic font-bold text-slate-500">{review.author}</cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
