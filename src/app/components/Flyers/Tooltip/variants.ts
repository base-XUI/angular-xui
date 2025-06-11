import { cva } from "class-variance-authority";

export type TooltipPlacement =
  | "auto-end"
  | "auto-start"
  | "auto"
  | "bottom-end"
  | "bottom-start"
  | "bottom"
  | "left-end"
  | "left-start"
  | "left"
  | "right-end"
  | "right-start"
  | "right"
  | "top-end"
  | "top-start"
  | "top";

export type TooltipColor =
  | "gray"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning"
  | "info";

export const tooltipVariantsConfig = {
  variants: {
    color: {
      gray: "bg-gray-800 text-white",
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      success: "bg-success text-success-foreground",
      error: "bg-error text-error-foreground",
      warning: "bg-warning text-warning-foreground",
      info: "bg-info text-info-foreground",
    },
    placement: {
      auto: "",
      "auto-start": "",
      "auto-end": "",
      top: "-top-3 -translate-y-full left-1/2 -translate-x-1/2",
      bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
      left: "-left-2 -translate-x-full top-1/2 -translate-y-1/2",
      right: "left-full ml-2 top-1/2 -translate-y-1/2",
      "top-start": "-top-3 -translate-y-full left-0",
      "top-end": "-top-3 -translate-y-full right-0",
      "bottom-start": "top-full mt-2 left-0",
      "bottom-end": "top-full mt-2 right-0",
      "left-start": "-left-2 -translate-x-full top-0",
      "left-end": "-left-2 -translate-x-full bottom-0",
      "right-start": "left-full ml-2 top-0",
      "right-end": "left-full ml-2 bottom-0",
    },
    arrow: {
      true: "before:content-[''] before:absolute before:w-2 before:h-2 before:rotate-45 before:bg-inherit",
      false: "",
    },
    disableInteractive: {
      true: "pointer-events-none",
      false: "pointer-events-auto",
    },
  },
  defaultVariants: {
    color: "primary" as TooltipColor,
    placement: "top" as TooltipPlacement,
    arrow: true,
    disableInteractive: false,
  },
};

export const tooltipVariants = cva(
  "z-50 px-2 text-sm rounded shadow-md absolute transition-opacity duration-200",
  {
    ...tooltipVariantsConfig,
    compoundVariants: [
      {
        arrow: true,
        placement: "top",
        className:
          "before:bottom-[-4px] before:left-1/2 before:-translate-x-1/2",
      },
      {
        arrow: true,
        placement: "bottom",
        className: "before:top-[-4px] before:left-1/2 before:-translate-x-1/2",
      },
      {
        arrow: true,
        placement: "left",
        className: "before:right-[-4px] before:top-1/2 before:-translate-y-1/2",
      },
      {
        arrow: true,
        placement: "right",
        className: "before:left-[-4px] before:top-1/2 before:-translate-y-1/2",
      },
      {
        arrow: true,
        placement: "top-start",
        className: "before:bottom-[-4px] before:left-4",
      },
      {
        arrow: true,
        placement: "top-end",
        className: "before:bottom-[-4px] before:right-4",
      },
      {
        arrow: true,
        placement: "bottom-start",
        className: "before:top-[-4px] before:left-4",
      },
      {
        arrow: true,
        placement: "bottom-end",
        className: "before:top-[-4px] before:right-4",
      },
      {
        arrow: true,
        placement: "left-start",
        className: "before:right-[-4px] before:top-4",
      },
      {
        arrow: true,
        placement: "left-end",
        className: "before:right-[-4px] before:bottom-4",
      },
      {
        arrow: true,
        placement: "right-start",
        className: "before:left-[-4px] before:top-4",
      },
      {
        arrow: true,
        placement: "right-end",
        className: "before:left-[-4px] before:bottom-4",
      },
    ],
  },
);
