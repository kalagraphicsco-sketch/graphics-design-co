import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitContactForm } from "../hooks/useQueries";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { mutateAsync, isPending } = useSubmitContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await mutateAsync(form);
      toast.success("Message sent! We'll be in touch soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <section id="contact" className="bg-background py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-orange text-sm font-semibold uppercase tracking-widest">
            Work With Us
          </span>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-foreground mt-2">
            Get In Touch
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Ready to elevate your brand? Tell us about your project and we'll
            get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-navy rounded-2xl p-8 text-white">
              <h3 className="font-display font-bold text-2xl mb-2">
                Let's Create Something
                <span className="text-orange"> Extraordinary</span>
              </h3>
              <p className="text-muted-dark text-sm mb-8">
                Whether you need a new logo, a full rebrand, or a digital
                campaign — we're here to help.
              </p>

              <div className="space-y-5">
                {[
                  {
                    icon: <Mail className="w-5 h-5" />,
                    label: "Email",
                    value: "hello@studionova.co",
                  },
                  {
                    icon: <Phone className="w-5 h-5" />,
                    label: "Phone",
                    value: "+1 (555) 234-5678",
                  },
                  {
                    icon: <MapPin className="w-5 h-5" />,
                    label: "Office",
                    value: "340 Design District, San Francisco, CA",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-orange/20 rounded-xl flex items-center justify-center text-orange shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-white/50 text-xs">{item.label}</p>
                      <p className="text-white text-sm font-medium">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-white/50 text-xs mb-3">Response time</p>
                <p className="text-orange font-semibold">Within 24 hours</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              data-ocid="contact.modal"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="name"
                    className="text-foreground font-medium text-sm mb-1.5 block"
                  >
                    Your Name <span className="text-orange">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="Jane Doe"
                    required
                    className="rounded-xl"
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="email"
                    className="text-foreground font-medium text-sm mb-1.5 block"
                  >
                    Email Address <span className="text-orange">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="jane@company.com"
                    required
                    className="rounded-xl"
                    data-ocid="contact.input"
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="subject"
                  className="text-foreground font-medium text-sm mb-1.5 block"
                >
                  Subject
                </Label>
                <Input
                  id="subject"
                  value={form.subject}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, subject: e.target.value }))
                  }
                  placeholder="Project inquiry"
                  className="rounded-xl"
                  data-ocid="contact.input"
                />
              </div>

              <div>
                <Label
                  htmlFor="message"
                  className="text-foreground font-medium text-sm mb-1.5 block"
                >
                  Message <span className="text-orange">*</span>
                </Label>
                <Textarea
                  id="message"
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  placeholder="Tell us about your project..."
                  rows={5}
                  required
                  className="rounded-xl resize-none"
                  data-ocid="contact.textarea"
                />
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-orange hover:bg-orange-hover text-white rounded-full font-semibold py-3 shadow-orange gap-2 transition-all"
                data-ocid="contact.submit_button"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
