import { services } from "./mockData";
import { specialities } from "./specialityData";

/**
 * searchIndex – flat array of searchable items used by the search bar.
 *
 * Each entry has:
 *   title    – display label
 *   route    – React Router path
 *   keywords – lowercase string for matching
 *   category – grouping label shown in results
 */

/* ── Services from mockData (route: /services/:slug) ── */
const serviceItems = services.map((s) => ({
  title: s.name,
  route: `/services/${s.slug}`,
  keywords: `${s.name} ${s.shortDesc} ${s.slug}`.toLowerCase(),
  category: "Service",
}));

/* ── Specialities (route: /speciality/:slug) ── */
const specialityItems = specialities.map((s) => ({
  title: s.name,
  route: `/speciality/${s.slug}`,
  keywords: `${s.name} ${s.slug} speciality`.toLowerCase(),
  category: "Speciality",
}));

/* ── 24×7 / standalone service pages ── */
const standalonePages = [
  {
    title: "Pharmacy",
    route: "/pharmacy",
    keywords: "pharmacy medicine drug 24x7 24/7",
    category: "24×7 Service",
  },
  {
    title: "Accident Trauma & Emergency",
    route: "/accident-trauma-emergency",
    keywords: "accident trauma emergency icu ambulance 24x7 24/7",
    category: "24×7 Service",
  },
  {
    title: "Ambulance Services",
    route: "/services/ambulance-services",
    keywords: "ambulance transport emergency vehicle 24x7",
    category: "24×7 Service",
  },
  {
    title: "Radiology",
    route: "/services/radiology",
    keywords: "radiology xray x-ray ct scan mri imaging ultrasound",
    category: "24×7 Service",
  },
  {
    title: "Clinical Laboratory",
    route: "/services/clinical-laboratory",
    keywords: "laboratory lab blood test pathology report",
    category: "24×7 Service",
  },
  {
    title: "Insurance Empanelment",
    route: "/services/insurance-empanelment",
    keywords: "insurance empanelment cashless tpa policy claim",
    category: "24×7 Service",
  },
];

/* ── Static pages ── */
const staticPages = [
  {
    title: "Home",
    route: "/",
    keywords: "home landing main page hippocare",
    category: "Page",
  },
  {
    title: "About – Hospital Features",
    route: "/#about",
    keywords: "about hospital features functionality admin doctor patient",
    category: "Page",
  },
  {
    title: "All Services",
    route: "/services",
    keywords: "services all browse departments",
    category: "Page",
  },
  {
    title: "Career Opportunities",
    route: "/career",
    keywords: "career job opening hiring nurse resident pharmacist receptionist",
    category: "Page",
  },
  {
    title: "Photo Gallery",
    route: "/photo-gallery",
    keywords: "photo gallery images pictures hospital",
    category: "Page",
  },
  {
    title: "Video Gallery",
    route: "/video-gallery",
    keywords: "video gallery watch tour testimonial",
    category: "Page",
  },
  {
    title: "Health Blog",
    route: "/blog",
    keywords: "blog article health tips news wellness",
    category: "Page",
  },
  {
    title: "Vision, Mission & Values",
    route: "/vision-mission",
    keywords: "vision mission values about us goal purpose",
    category: "Page",
  },
  {
    title: "Login",
    route: "/login",
    keywords: "login sign in admin doctor patient",
    category: "Page",
  },
  {
    title: "Register",
    route: "/register",
    keywords: "register sign up create account",
    category: "Page",
  },
];

/* ── Combine all ── */
const searchIndex = [
  ...standalonePages,
  ...serviceItems,
  ...specialityItems,
  ...staticPages,
];

export default searchIndex;
