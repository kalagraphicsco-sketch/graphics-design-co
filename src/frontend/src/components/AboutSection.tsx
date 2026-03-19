import { CheckCircle } from "lucide-react";
import { motion } from "motion/react";

const VALUES = [
  "Client-first approach in every project",
  "Pixel-perfect craft and attention to detail",
  "Transparent process and clear communication",
  "Timeless design over passing trends",
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-background py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-orange text-sm font-semibold uppercase tracking-widest">
              Our Story
            </span>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-foreground mt-2 mb-6">
              Design That Drives Results
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded in 2016, Studio Nova was built on the belief that
              exceptional design is one of the most powerful business tools
              available. We partner with brands of all sizes — from ambitious
              startups to established enterprises — to create visual identities
              that resonate deeply and endure.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our multidisciplinary team brings together expertise in brand
              strategy, graphic design, digital experience, and motion —
              delivering cohesive, impactful work across every touchpoint.
            </p>

            <ul className="space-y-3">
              {VALUES.map((val) => (
                <li key={val} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-orange mt-0.5 shrink-0" />
                  <span className="text-foreground text-sm">{val}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              {
                label: "Projects Delivered",
                value: "200+",
                color: "bg-orange",
              },
              { label: "Happy Clients", value: "50+", color: "bg-teal" },
              { label: "Years of Craft", value: "8+", color: "bg-navy" },
              { label: "Design Awards", value: "12", color: "bg-charcoal" },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`${stat.color} rounded-2xl p-6 flex flex-col justify-center`}
              >
                <p className="font-display font-bold text-4xl text-white">
                  {stat.value}
                </p>
                <p className="text-white/70 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
