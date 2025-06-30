import { cva } from "class-variance-authority";
//Define variant types for better type safety
type LinkColor =
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning";
//Define text decoration of link
type LinkUnderline = "always" | "hover" | "none";
export const linkVariantsConfig = {
  variants: {
    variant: {
      inherit: "inherit",
      h1: "text-7xl font-bold",
      h2: "text-6xl font-bold",
      h3: "text-5xl font-bold",
      h4: "text-4xl font-bold",
      h5: "text-2xl font-bold",
      h6: "text-2xl font-bold",
      subtitle1: "text-xl font-semibold",
      subtitle2: "text-lg font-semibold",
      body1: "text-xl font-normal",
      body2: "text-lg font-normal",
      body3: "text-base font-normal",
      caption: "text-xs font-normal",
    },
    underline: {
      always: "underline",
      hover: "hover:underline",
      none: "no-underline",
    },
    color: {
      inherit: "inherit",
      primary: "text-primary decoration-primary/40 hover:decoration-primary",
      secondary:
        "text-secondary decoration-secondary/40 hover:decoration-secondary",
      success: "text-success decoration-success/40  hover:decoration-success",
      error: "text-error decoration-error/40 hover:decoration-error",
      info: "text-info decoration-info/40 hover:decoration-info",
      warning: "text-warning decoration-warning/40 hover:decoration-warning",
    },
  },
  defaultVariants: {
    variant: "inherit",
    color: "primary",
    underline: "always",
  },
} as const;

export const LinkVariants = cva(
  "inline-flex items-center justify-center font-medium transition-colors cursor-pointer",
  {
    variants: linkVariantsConfig.variants,
    defaultVariants: {
      color: "primary" as LinkColor,
      underline: "always" as LinkUnderline,
      variant: "inherit",
    },
  },
);
