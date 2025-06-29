import { cva } from "class-variance-authority";

// Configuration object that we can export for use in stories
export const accordionVariantsConfig = {
  variants: {
    disabled: { true: "cursor-default opacity-50 bg-gray-200" },
    disableGutters: {
      true: "mb-0",
    },
    square: { true: "rounded-none shadow px-1", false: "border-b-1" },
    defaultExpanded: { true: "expanded bg-success", false: "bg-success" },
    expanded: { true: "expanded" },
  },
  defaultVariants: {
    defaultExpanded: false,
    expanded: false,
    disabled: false,
    disableGutters: false,
  },
};

export const accordionVariants = cva(
  "bg-success text-black border-b-5 border-b-gray-200",
  {
    variants: accordionVariantsConfig.variants,
    defaultVariants: accordionVariantsConfig.defaultVariants,
  },
);
