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
