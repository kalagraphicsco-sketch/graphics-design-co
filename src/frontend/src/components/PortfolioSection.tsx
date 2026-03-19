import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Category } from "../backend.d";
import { SAMPLE_PORTFOLIO } from "../data/sampleData";
import { useGetPortfolioItems } from "../hooks/useQueries";

const CATEGORIES: { label: string; value: "all" | Category }[] = [
  { label: "All", value: "all" },
  { label: "Logo Design", value: Category.logoDesign },
  { label: "Branding", value: Category.branding },
  { label: "Print Media", value: Category.printMedia },
  { label: "Digital Graphics", value: Category.digitalGraphics },
  { label: "UI/UX", value: Category.uiuxDesign },
  { label: "Motion", value: Category.motionGraphics },
];

interface PortfolioCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: Category;
  index: number;
}

function PortfolioCard({
  title,
  description,
  imageUrl,
  category,
  index,
}: PortfolioCardProps) {
  const catLabel =
    CATEGORIES.find((c) => c.value === category)?.label ?? category;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="group relative rounded-2xl overflow-hidden bg-card shadow-card hover:shadow-card-hover transition-all duration-300"
      data-ocid={`portfolio.item.${index + 1}`}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white text-sm">{description}</p>
        </div>
      </div>
      <div className="p-4">
        <span className="inline-block bg-orange/10 text-orange text-xs font-semibold rounded-full px-3 py-0.5 mb-2">
          {catLabel}
        </span>
        <h3 className="font-display font-bold text-foreground text-base">
          {title}
        </h3>
      </div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<"all" | Category>("all");
  const [showAll, setShowAll] = useState(false);
  const { data: backendItems } = useGetPortfolioItems();

  const rawItems =
    backendItems && backendItems.length > 0
      ? backendItems.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          imageUrl: item.imageUrl.getDirectURL(),
          category: item.category,
          featured: item.featured,
        }))
      : SAMPLE_PORTFOLIO;

  const filtered =
    activeCategory === "all"
      ? rawItems
      : rawItems.filter((item) => item.category === activeCategory);

  const visible = showAll ? filtered : filtered.slice(0, 6);

  return (
    <section id="portfolio" className="bg-background py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-orange text-sm font-semibold uppercase tracking-widest">
            Our Work
          </span>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-foreground mt-2">
            Portfolio
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            A selection of our finest projects spanning brand identity, print,
            digital, and more.
          </p>
        </motion.div>

        {/* Category filters */}
        <div
          className="flex flex-wrap gap-2 justify-center mb-10"
          data-ocid="portfolio.filter.tab"
        >
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat.value}
              onClick={() => {
                setActiveCategory(cat.value);
                setShowAll(false);
              }}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat.value
                  ? "bg-orange text-white shadow-orange"
                  : "bg-white text-muted-foreground border border-border hover:border-orange hover:text-orange"
              }`}
              data-ocid="portfolio.tab"
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {visible.length === 0 ? (
          <div className="text-center py-20" data-ocid="portfolio.empty_state">
            <div className="w-16 h-16 bg-muted rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🎨</span>
            </div>
            <p className="text-muted-foreground">
              No projects in this category yet.
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((item, i) => (
                <PortfolioCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  imageUrl={item.imageUrl}
                  category={item.category}
                  index={i}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* View more */}
        {filtered.length > 6 && (
          <div className="text-center mt-10">
            <Button
              onClick={() => setShowAll(!showAll)}
              variant="outline"
              className="border-orange text-orange hover:bg-orange hover:text-white rounded-full px-8 font-semibold transition-all"
              data-ocid="portfolio.primary_button"
            >
              {showAll ? "SHOW LESS" : "VIEW MORE PROJECTS"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
