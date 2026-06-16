// Centralized data-testid registry (kebab-case)
export const NAV = {
  logo: "nav-logo",
  linkInicio: "nav-link-inicio",
  linkNosotros: "nav-link-nosotros",
  linkServicios: "nav-link-servicios",
  linkIndustrias: "nav-link-industrias",
  linkContacto: "nav-link-contacto",
  ctaCotizar: "nav-cta-cotizar",
  mobileToggle: "nav-mobile-toggle",
};

export const HERO = {
  badge: "hero-badge-experiencia",
  title: "hero-title",
  subtitle: "hero-subtitle",
  ctaPrimary: "hero-cta-cotizar",
  ctaSecondary: "hero-cta-servicios",
};

export const SECTIONS = {
  about: "section-about",
  services: "section-services",
  industries: "section-industries",
  values: "section-values",
  quote: "section-quote",
  contact: "section-contact",
};

export const SERVICES = {
  card: (slug) => `service-card-${slug}`,
};

export const INDUSTRIES = {
  card: (slug) => `industry-card-${slug}`,
};

export const QUOTE_FORM = {
  form: "quote-form",
  fullName: "quote-input-fullname",
  email: "quote-input-email",
  phone: "quote-input-phone",
  company: "quote-input-company",
  industry: "quote-select-industry",
  service: "quote-select-service",
  quantity: "quote-input-quantity",
  message: "quote-textarea-message",
  submit: "quote-submit",
  success: "quote-success-message",
  error: "quote-error-message",
};

export const CONTACT = {
  phone: "contact-phone",
  whatsapp: "contact-whatsapp",
  email: "contact-email",
  address: "contact-address",
  hours: "contact-hours",
};

export const FOOTER = {
  root: "footer-root",
  copyright: "footer-copyright",
};
