import { cva } from "class-variance-authority";

// Configuration object that we can export for use in stories
export const accordionVariantsConfig = {
  variants: {
    disabled: { true: "cursor-default opacity-50 bg-gray-200" },
    disableGutters: {
      true: "mb-0",
    },
    square: { true: "rounded-none shadow px-1", false: "border-b-1" },
    defaultExpanded: { true: "expanded" },
    expanded: { true: "expanded" },
  },
  defaultVariants: {
    defaultExpanded: false,
    expanded: false,
    disabled: false,
    disableGutters: false,
    square: false,
  },
  component: "div",
  slots: {} as const,
  classes: {} as const,
  id: `accordion-${Math.random().toString(36).substr(2, 9)}`,
};

export const accordionVariants = cva("bg-white text-black border-b-gray-200", {
  variants: accordionVariantsConfig.variants,
  defaultVariants: accordionVariantsConfig.defaultVariants,
});
