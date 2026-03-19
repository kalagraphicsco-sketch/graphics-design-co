import { SiBehance, SiDribbble, SiInstagram, SiLinkedin } from "react-icons/si";

const FOOTER_LINKS = {
  Company: ["About", "Services", "Portfolio", "Careers", "Contact"],
  Services: [
    "Logo Design",
    "Brand Identity",
    "Print Design",
    "Digital Graphics",
    "UI/UX Design",
  ],
};

const SECTION_HREFS: Record<string, string> = {
  About: "#about",
  Services: "#services",
  Portfolio: "#portfolio",
  Careers: "#contact",
  Contact: "#contact",
  "Logo Design": "#services",
  "Brand Identity": "#services",
  "Print Design": "#services",
  "Digital Graphics": "#services",
  "UI/UX Design": "#services",
};

export default function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer className="bg-navy-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-orange rounded-lg flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">
                  N
                </span>
              </div>
              <span className="text-white font-display font-semibold text-lg">
                Studio Nova
              </span>
            </div>
            <p className="text-muted-dark text-sm leading-relaxed mb-6">
              Award-winning graphic design studio crafting bold, beautiful brand
              experiences since 2016.
            </p>
            <div className="flex gap-3">
              {[
                {
                  Icon: SiInstagram,
                  label: "Instagram",
                  href: "https://instagram.com",
                },
                {
                  Icon: SiLinkedin,
                  label: "LinkedIn",
                  href: "https://linkedin.com",
                },
                {
                  Icon: SiBehance,
                  label: "Behance",
                  href: "https://behance.net",
                },
                {
                  Icon: SiDribbble,
                  label: "Dribbble",
                  href: "https://dribbble.com",
                },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 bg-white/10 hover:bg-orange rounded-lg flex items-center justify-center text-white/60 hover:text-white transition-all duration-200"
                  data-ocid="footer.link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-6">
            {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
              <div key={heading}>
                <h4 className="text-white font-semibold text-sm mb-3">
                  {heading}
                </h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href={SECTION_HREFS[link] ?? "#"}
                        className="text-muted-dark text-sm hover:text-orange transition-colors"
                        data-ocid="footer.link"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">
              Stay Inspired
            </h4>
            <p className="text-muted-dark text-sm mb-4">
              Get design tips, case studies, and studio news delivered monthly.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-orange transition-colors"
                data-ocid="footer.input"
              />
              <button
                type="submit"
                className="bg-orange hover:bg-orange-hover text-white rounded-lg px-4 py-2 text-sm font-semibold transition-colors"
                data-ocid="footer.submit_button"
              >
                Join
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-muted-dark text-xs">
            © {year} Studio Nova. All rights reserved.
          </p>
          <p className="text-muted-dark text-xs">
            Built with ♥ using{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
