import { cva } from "class-variance-authority";

export const checkboxVariants = cva(
  "relative flex items-center justify-center transition-colors rounded cursor-pointer flex-shrink-0",
  {
    variants: {
      color: {
        primary: "",
        secondary: "",
        success: "",
        error: "",
        info: "",
        warning: "",
        muted: "",
      },
      state: {
        checked: "",
        unchecked: "hover:bg-gray-50",
        indeterminate: "",
      },
      size: {
        small: "h-4 w-4 text-xs",
        medium: "h-5 w-5 text-sm",
        large: "h-6 w-6 text-base",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "cursor-pointer",
      },
      required: {
        true: "!border-red-500",
        false: "",
      },
      hasIcon: {
        true: "",
        false: "border border-gray-300",
      },
    },
    compoundVariants: [
      {
        color: "primary",
        state: ["checked", "indeterminate"],
        className: "bg-primary border-primary hover:bg-primary/90 text-white",
      },
      {
        color: "secondary",
        state: ["checked", "indeterminate"],
        className:
          "bg-secondary border-secondary hover:bg-secondary/90 text-white",
      },
      {
        color: "success",
        state: ["checked", "indeterminate"],
        className: "bg-success border-success hover:bg-success/90 text-white",
      },
      {
        color: "error",
        state: ["checked", "indeterminate"],
        className: "bg-error border-error hover:bg-error/90 text-white",
      },
      {
        color: "info",
        state: ["checked", "indeterminate"],
        className: "bg-info border-info hover:bg-info/90 text-white",
      },
      {
        color: "warning",
        state: ["checked", "indeterminate"],
        className: "bg-warning border-warning hover:bg-warning/90 text-white",
      },
      {
        color: "muted",
        state: ["checked", "indeterminate"],
        className: "bg-muted border-muted hover:bg-muted/90 text-white",
      },
      {
        state: "unchecked",
        hasIcon: false,
        className: "border-gray-300 bg-white",
      },
      { state: "unchecked", hasIcon: true, className: "bg-white" },
      { disabled: true, className: "opacity-50 cursor-not-allowed" },
    ],
    defaultVariants: {
      color: "primary",
      size: "medium",
      state: "unchecked",
      disabled: false,
      required: false,
      hasIcon: false,
    },
  },
);
