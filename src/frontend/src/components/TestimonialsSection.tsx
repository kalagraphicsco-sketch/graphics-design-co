import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SAMPLE_TESTIMONIALS } from "../data/sampleData";
import { useGetTestimonials } from "../hooks/useQueries";

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const { data: backendTestimonials } = useGetTestimonials();
  const testimonials =
    backendTestimonials && backendTestimonials.length > 0
      ? backendTestimonials
      : SAMPLE_TESTIMONIALS;

  const prev = () =>
    setActive((a) => (a === 0 ? testimonials.length - 1 : a - 1));
  const next = () =>
    setActive((a) => (a === testimonials.length - 1 ? 0 : a + 1));

  return (
    <section className="bg-background py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-orange text-sm font-semibold uppercase tracking-widest">
            Social Proof
          </span>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-foreground mt-2">
            What Clients Say
          </h2>
        </motion.div>

        {/* Desktop: 3 cards */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id.toString()}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-card border border-border"
              data-ocid={`testimonials.item.${i + 1}`}
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: Number(t.rating) }).map((_, j) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: star rating index is stable
                  <Star key={j} className="w-4 h-4 fill-orange text-orange" />
                ))}
              </div>
              <p className="text-foreground text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange to-teal rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {t.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: carousel */}
        <div className="lg:hidden">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-card border border-border"
                data-ocid={`testimonials.item.${active + 1}`}
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({
                    length: Number(testimonials[active].rating),
                  }).map((_, j) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: star rating index is stable
                    <Star key={j} className="w-4 h-4 fill-orange text-orange" />
                  ))}
                </div>
                <p className="text-foreground text-sm leading-relaxed mb-6 italic">
                  &ldquo;{testimonials[active].quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange to-teal rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {testimonials[active].name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {testimonials[active].name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {testimonials[active].role},{" "}
                      {testimonials[active].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-orange hover:text-orange transition-colors"
              data-ocid="testimonials.pagination_prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  type="button"
                  key={t.id.toString()}
                  onClick={() => setActive(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === active ? "bg-orange w-4" : "bg-border"}`}
                  data-ocid="testimonials.tab"
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-orange hover:text-orange transition-colors"
              data-ocid="testimonials.pagination_next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
