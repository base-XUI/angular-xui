export const TABPANEL_VARIANTS = {
  standard: "p-4",
  boxed: "p-4 border rounded-lg",
  borderless: "p-4 border-0",
} as const;

export const TABPANEL_ANIMATIONS = {
  fade: "transition-opacity duration-200",
  slide: "transition-transform duration-200",
  none: "",
} as const;
