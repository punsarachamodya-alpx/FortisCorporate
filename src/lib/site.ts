// Central place for firm details and site-wide constants.
// Pulling these from one module means a future change (domain, phone, etc.)
// only needs to happen here.

// TODO: confirm domain — fortiscorporate.com is a placeholder until the
// client registers/confirms the domain. Nothing below should be hardcoded
// with the domain elsewhere; always import SITE_URL from here.
export const SITE_URL = 'https://fortiscorporate.com';

export const SITE_NAME = 'Fortis Corporate Services';

export const FIRM = {
  legalName: 'Fortis Corporate Services (Pvt) Ltd',
  tradingName: 'Fortis Corporate Services',
  registrationNo: 'PV 335287',
  address: {
    line1: '113/5, Dutugemunu Street',
    line2: 'Kohuwala, Sri Lanka',
    full: '113/5, Dutugemunu Street, Kohuwala, Sri Lanka',
  },
  phoneDisplay: '+94 77 655 3151',
  phoneE164: '+94776553151',
  whatsappNumber: '94776553151',
  email: 'fortiscorps@gmail.com',
  officeHours: 'Monday–Friday, 8:30 AM–4:45 PM',
};

export const links = {
  tel: `tel:${FIRM.phoneE164}`,
  whatsapp: `https://wa.me/${FIRM.whatsappNumber}`,
  email: `mailto:${FIRM.email}`,
  googleMapsEmbed: `https://maps.google.com/maps?q=${encodeURIComponent(
    FIRM.address.full
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`,
  // TODO: replace with the firm's real Calendly (or equivalent) scheduling
  // link once a free-tier account is set up.
  calendly: 'https://calendly.com/fortiscorporate/consultation',
};

export type NavLink = { label: string; href: string };

export const primaryNav: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Resources', href: '/resources' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export const footerLegalLinks: NavLink[] = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Use', href: '/terms-of-use' },
  { label: 'Cookie Notice', href: '/cookies' },
  { label: 'Disclaimer', href: '/disclaimer' },
];

export const serviceCategorySlugs = [
  { anchor: 'corporate-secretarial', label: 'Corporate & Company Secretarial Services' },
  { anchor: 'commercial-contracts', label: 'Commercial Contracts & Legal Documentation' },
  { anchor: 'hr-employment', label: 'HR & Employment Services' },
  { anchor: 'notarial-statutory', label: 'Notarial, Statutory & Legal Documentation' },
  { anchor: 'accounting-tax', label: 'Accounting, Tax, Customs & Financial Services' },
  { anchor: 'legal-advisory', label: 'Legal Advisory & Retainer Services' },
];

// GA4 measurement ID — placeholder until the client supplies the real one.
// TODO: replace with real GA4 measurement ID (format: G-XXXXXXXXXX)
export const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX';
