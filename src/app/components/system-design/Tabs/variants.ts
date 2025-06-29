// Tab variants
export const TAB_VARIANTS = {
  standard: "px-4 py-2 transition-all duration-200",
  fullWidth: "flex-1 px-4 py-2 transition-all duration-200",
} as const;

export const TAB_STATES = {
  active: "border-b-2",
  disabled: "opacity-50 cursor-not-allowed",
  default: "cursor-pointer hover:bg-gray-100",
} as const;

export const TAB_COLORS = {
  primary: "text-primary border-primary",
  secondary: "text-secondary border-secondary",
  inherit: "text-inherit border-current",
} as const;

// TabList variants
export const TABLIST_VARIANTS = {
  standard: "border-b border-gray-200",
  contained: "border-none",
  borderless: "border-none",
} as const;

export const TABLIST_ORIENTATIONS = {
  horizontal: "flex-row",
  vertical: "flex-col",
} as const;

export const TABLIST_SIZES = {
  sm: "gap-1",
  md: "gap-2",
  lg: "gap-4",
} as const;

// TabPanel variants
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

// Tabs variants
export const TABS_VARIANTS = {
  standard: "flex relative",
  scrollable: "flex relative overflow-x-auto scrollbar-thin",
  fullWidth: "flex relative w-full",
} as const;

export const TABS_ORIENTATIONS = {
  horizontal: "flex-row",
  vertical: "flex-col",
} as const;

export const TABS_COLORS = {
  primary: "text-primary",
  secondary: "text-secondary",
  inherit: "text-inherit",
} as const;

// Consolidated variant types for TypeScript
export type TabVariant = keyof typeof TAB_VARIANTS;
export type TabState = keyof typeof TAB_STATES;
export type TabColor = keyof typeof TAB_COLORS;

export type TabListVariant = keyof typeof TABLIST_VARIANTS;
export type TabListOrientation = keyof typeof TABLIST_ORIENTATIONS;
export type TabListSize = keyof typeof TABLIST_SIZES;

export type TabPanelVariant = keyof typeof TABPANEL_VARIANTS;
export type TabPanelAnimation = keyof typeof TABPANEL_ANIMATIONS;

export type TabsVariant = keyof typeof TABS_VARIANTS;
export type TabsOrientation = keyof typeof TABS_ORIENTATIONS;
export type TabsColor = keyof typeof TABS_COLORS;
