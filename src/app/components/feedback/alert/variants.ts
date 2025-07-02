import { cva } from "class-variance-authority";

export const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 flex justify-between  gap-2",
  {
    variants: {
      variant: {
        default: "",
        filled: "border-transparent",
        outlined: "bg-transparent",
      },
      severity: {
        success: "",
        info: "",
        warning: "",
        error: "",
      },
    },
    compoundVariants: [
      // Default variant with different severities
      {
        variant: "default",
        severity: "success",
        className: "bg-green-50 text-green-800 border-green-100",
      },
      {
        variant: "default",
        severity: "info",
        className: "bg-blue-50 text-blue-800 border-blue-100",
      },
      {
        variant: "default",
        severity: "warning",
        className: "bg-amber-50 text-amber-800 border-amber-100",
      },
      {
        variant: "default",
        severity: "error",
        className: "bg-red-50 text-red-800 border-red-100",
      },
      // Filled variant with different severities
      {
        variant: "filled",
        severity: "success",
        className: "bg-green-600 text-white",
      },
      {
        variant: "filled",
        severity: "info",
        className: "bg-blue-600 text-white",
      },
      {
        variant: "filled",
        severity: "warning",
        className: "bg-amber-600 text-white",
      },
      {
        variant: "filled",
        severity: "error",
        className: "bg-red-600 text-white",
      },
      // Outlined variant with different severities
      {
        variant: "outlined",
        severity: "success",
        className: "border-green-600 text-green-800",
      },
      {
        variant: "outlined",
        severity: "info",
        className: "border-blue-600 text-blue-800",
      },
      {
        variant: "outlined",
        severity: "warning",
        className: "border-amber-600 text-amber-800",
      },
      {
        variant: "outlined",
        severity: "error",
        className: "border-red-600 text-red-800",
      },
    ],
    defaultVariants: {
      variant: "default",
      severity: "success",
    },
  },
);

export const alertIconVariants = cva("flex-shrink-0", {
  variants: {
    variant: {
      default: "",
      filled: "text-white",
      outlined: "",
    },
    severity: {
      success: "text-green-600",
      info: "text-blue-600",
      warning: "text-amber-600",
      error: "text-red-600",
    },
  },
  compoundVariants: [
    {
      variant: "filled",
      severity: ["success", "info", "warning", "error"],
      className: "text-white",
    },
  ],
  defaultVariants: {
    variant: "default",
    severity: "success",
  },
});

export const alertTitleVariants = cva(
  "font-medium leading-none tracking-tight",
  {
    variants: {
      variant: {
        default: "",
        filled: "text-white",
        outlined: "",
      },
      severity: {
        success: "text-green-800",
        info: "text-blue-800",
        warning: "text-amber-800",
        error: "text-red-800",
      },
    },
    compoundVariants: [
      {
        variant: "filled",
        severity: ["success", "info", "warning", "error"],
        className: "text-white",
      },
    ],
    defaultVariants: {
      variant: "default",
      severity: "success",
    },
  },
);

export const alertActionVariants = cva("ml-auto flex-shrink-0", {
  variants: {
    variant: {
      default: "",
      filled: "",
      outlined: "",
    },
    severity: {
      success: "",
      info: "",
      warning: "",
      error: "",
    },
  },
  defaultVariants: {
    variant: "default",
    severity: "success",
  },
});
