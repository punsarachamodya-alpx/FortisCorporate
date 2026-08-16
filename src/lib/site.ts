import { getCollection } from 'astro:content';

// Central place for site-wide structural config and firm details.
//
// Firm identity (name, address, phone, email, office hours, footer
// tagline) is CMS-editable content — see src/content/siteSettings/main.json,
// editable from /admin. Call getFirmSettings() to read it.
//
// Everything below stays hardcoded here rather than in the CMS: it's
// structural/technical config (routes, the live domain, GA4 wiring) where a
// typo from a free-text CMS field could break navigation or the build.

// TODO: confirm domain — fortiscorporate.com is a placeholder until the
// client registers/confirms the domain. Nothing below should be hardcoded
// with the domain elsewhere; always import SITE_URL from here.
export const SITE_URL = 'https://fortiscorporate.com';

export const SITE_NAME = 'Fortis Corporate Services';

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
  { anchor: 'website-development', label: 'Website Development & Company Emails' },
];

// GA4 measurement ID — placeholder until the client supplies the real one.
// TODO: replace with real GA4 measurement ID (format: G-XXXXXXXXXX)
export const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX';

/**
 * Firm identity + derived contact links, sourced from the siteSettings
 * content collection (editable at /admin without touching code).
 */
export async function getFirmSettings() {
  const entries = await getCollection('siteSettings');
  const settings = entries[0].data;

  const FIRM = {
    legalName: settings.legalName,
    tradingName: settings.tradingName,
    registrationNo: settings.registrationNo,
    address: {
      line1: settings.addressLine1,
      line2: settings.addressLine2,
      full: `${settings.addressLine1}, ${settings.addressLine2}`,
    },
    phoneDisplay: settings.phoneDisplay,
    phoneE164: settings.phoneE164,
    whatsappNumber: settings.whatsappNumber,
    email: settings.email,
    officeHours: settings.officeHours,
    footerTagline: settings.footerTagline,
  };

  // Exact office coordinates, used to pin the map precisely instead of
  // geocoding the free-text address (which can land in the wrong spot).
  const OFFICE_COORDS = '6.8702845,79.8796700';

  const links = {
    tel: `tel:${FIRM.phoneE164}`,
    whatsapp: `https://wa.me/${FIRM.whatsappNumber}`,
    email: `mailto:${FIRM.email}`,
    googleMapsEmbed: `https://maps.google.com/maps?q=${OFFICE_COORDS}&t=&z=17&ie=UTF8&iwloc=&output=embed`,
  };

  return { FIRM, links };
}
