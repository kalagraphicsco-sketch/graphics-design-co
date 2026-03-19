import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-navy overflow-hidden flex items-center"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-orange/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-teal/5 blur-3xl" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-orange/8 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-orange/15 border border-orange/30 rounded-full px-4 py-1.5 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange" />
              <span className="text-orange text-sm font-medium tracking-wide">
                Award-Winning Design Studio
              </span>
            </motion.div>

            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] mb-6">
              WE CRAFT
              <br />
              <span className="text-orange">BOLD</span> &amp;
              <br />
              BEAUTIFUL
              <br />
              DESIGN
            </h1>

            <p className="text-muted-dark text-lg leading-relaxed mb-8 max-w-md">
              Studio Nova transforms ideas into iconic visual identities. From
              logos to full brand systems, we create design that captivates,
              communicates, and converts.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#portfolio">
                <Button
                  size="lg"
                  className="bg-orange hover:bg-orange-hover text-white rounded-full px-8 font-semibold shadow-orange gap-2 group transition-all"
                  data-ocid="hero.primary_button"
                >
                  VIEW PORTFOLIO
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="#contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/10 hover:border-white/60 rounded-full px-8 font-semibold gap-2"
                  data-ocid="hero.secondary_button"
                >
                  <Play className="w-4 h-4" />
                  START A PROJECT
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12 pt-8 border-t border-white/10">
              {[
                { value: "200+", label: "Projects Delivered" },
                { value: "50+", label: "Happy Clients" },
                { value: "8+", label: "Years of Craft" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display font-bold text-2xl text-orange">
                    {stat.value}
                  </p>
                  <p className="text-muted-dark text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right column - collage */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg mx-auto">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="relative z-10"
              >
                <img
                  src="/assets/generated/hero-collage.dim_800x700.png"
                  alt="Design portfolio collage"
                  className="w-full rounded-2xl shadow-2xl"
                />
              </motion.div>

              {/* Floating accent cards */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [-3, -3, -3] }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -top-6 -left-6 bg-white rounded-xl shadow-card p-3 z-20"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange rounded-lg flex items-center justify-center text-white text-sm font-bold">
                    ✦
                  </div>
                  <div>
                    <p className="text-foreground text-xs font-semibold">
                      Logo Design
                    </p>
                    <p className="text-muted-foreground text-[10px]">
                      Just delivered
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0], rotate: [5, 5, 5] }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-4 -right-4 bg-navy-dark border border-white/10 rounded-xl shadow-card p-3 z-20"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-teal rounded-lg flex items-center justify-center text-white text-sm">
                    ◈
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">
                      Brand Identity
                    </p>
                    <p className="text-muted-dark text-[10px]">In progress</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave - decorative */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="presentation"
        >
          <path
            d="M0 60L1440 60L1440 30C1200 60 720 0 0 30L0 60Z"
            fill="oklch(var(--off-white))"
          />
        </svg>
      </div>
    </section>
  );
}
