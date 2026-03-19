import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { SAMPLE_SERVICES } from "../data/sampleData";
import { useGetServices } from "../hooks/useQueries";

export default function ServicesSection() {
  const { data: backendServices } = useGetServices();
  const services =
    backendServices && backendServices.length > 0
      ? backendServices
      : SAMPLE_SERVICES;

  return (
    <section id="services" className="bg-charcoal py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-orange text-sm font-semibold uppercase tracking-widest">
            What We Do
          </span>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-white mt-2">
            Our Services
          </h2>
          <p className="text-muted-dark mt-4 max-w-xl mx-auto">
            From concept to delivery, we offer end-to-end design solutions
            tailored to your brand.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id.toString()}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              data-ocid={`services.item.${i + 1}`}
            >
              <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:bg-orange/20 transition-colors">
                <span className="text-orange">{service.icon}</span>
              </div>
              <h3 className="font-display font-bold text-lg text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-1 text-orange text-sm font-semibold hover:gap-2 transition-all"
              >
                Learn More <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
