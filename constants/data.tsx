import { GitCompareArrows, Headset, ShieldCheck, Truck } from "lucide-react";


export const menuItems = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "Hot Deals", href: "/deal" },
];

export const quickLinksData = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "FAQ", href: "/faq" },
  { label: "Support", href: "/support" },
];
export const categoryData = [
  { label: "Mobiles", href: "/category/mobiles" },
  { label: "Appliances", href: "/category/appliances" },
  { label: "Smartphones", href: "/category/smartphones" },
  { label: "Air-Conditioners", href: "/category/air-conditioners" },
  { label: "Washing Machines", href: "/category/washing-machines" },
  { label: "Kitchen Appliances", href: "/category/kitchen-appliances" },
  { label: "gadget accessories", href: "/category/gadget-accessories" },
];
export const productCategories = [
  { title: "All", value: "all" },
  { title: "Gadgets", value: "gadgets" },
  { title: "Appliances", value: "appliances" },
  { title: "Smartphones", value: "smartphones" },
  { title: "Air Conditioners", value: "air-conditioners" },
  { title: "Washing Machines", value: "washing-machines" },
  { title: "Cameras", value: "cameras" },
  { title: "Airbuds", value: "airbuds" },
  { title: "Smart Watches", value: "smart-watches" },
  { title: "Refrigerators", value: "refrigerators" },
  { title: "Televisions", value: "televisions" },
  { title: "Tablets", value: "tablets" },

]

export const infoData = [
  {
    title: "Free Delivery",
    description: "Free delivery on all orders over $100",
    icon: <Truck size={45} />
  },
  {
    title: "Free Return",
    description: "Free delivery on all orders over $100",
    icon: <GitCompareArrows size={45} />
  },
  {
    title: "Customer Support",
    description: "Friendly customer support 24/7",
    icon: <Headset size={45} />
  },
  {
    title: "Money Back Guarantee",
    description: "Quality checked by our team",
    icon: <ShieldCheck size={45} />
  }
]