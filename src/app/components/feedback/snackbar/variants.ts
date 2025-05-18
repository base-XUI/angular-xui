import {
  SnackbarAnchorOrigin,
  SnackbarSeverity,
  SnackbarTransition,
  SnackbarVariant,
} from "./snackbar.types";

// Base styles for the snackbar
export const baseSnackbarStyles = {
  container:
    "fixed z-50 flex items-center border p-2 rounded-md shadow-lg max-w-md min-w-[300px] transition-all duration-300 ease-in-out",
  content: "flex-grow flex items-center",
  icon: "w-5 h-5 mr-3 flex-shrink-0",
  message: "text-sm font-medium",
  action: "ml-auto pl-3",
  closeButton:
    "ml-2 p-1 rounded-full hover:bg-opacity-20 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2",
  closeIcon: "w-4 h-4",
};

// Severity styles
export const severityStyles: Record<
  SnackbarSeverity,
  { filled: string; outlined: string; icon: string }
> = {
  primary: {
    filled: "bg-primary border text-primary-foreground",
    outlined: "bg-transparent border border-primary text-primary",
    icon: "text-primary-foreground",
  },
  secondary: {
    filled: "bg-secondary text-secondary-foreground",
    outlined: "bg-transparent border border-secondary text-secondary",
    icon: "text-secondary-foreground",
  },
  success: {
    filled: "bg-success text-success-foreground",
    outlined: "bg-transparent border border-success text-success",
    icon: "text-success-foreground",
  },
  error: {
    filled: "bg-destructive text-destructive-foreground",
    outlined: "bg-transparent border border-destructive text-destructive",
    icon: "text-destructive-foreground",
  },
  info: {
    filled: "bg-white text-black",
    outlined: "bg-transparent border border-info text-info",
    icon: "text-info",
  },
  warning: {
    filled: "bg-warning text-warning-foreground",
    outlined: "bg-transparent border border-warning text-warning",
    icon: "text-warning-foreground",
  },
};

// Position styles
export function getPositionStyles(anchorOrigin: SnackbarAnchorOrigin): string {
  const { vertical, horizontal } = anchorOrigin;

  let position = "";

  // Vertical positioning
  if (vertical === "top") {
    position += "top-4 ";
  } else {
    position += "bottom-4 ";
  }

  // Horizontal positioning
  if (horizontal === "left") {
    position += "left-4";
  } else if (horizontal === "center") {
    position += "left-1/2 transform -translate-x-1/2";
  } else {
    position += "right-4";
  }

  return position;
}

// Transition styles
export function getTransitionStyles(
  transition: SnackbarTransition,
  open: boolean,
  anchorOrigin: SnackbarAnchorOrigin,
): string {
  const { vertical } = anchorOrigin;

  if (!open) {
    return "opacity-0 scale-95 pointer-events-none";
  }

  switch (transition) {
    case "fade":
      return "opacity-100";
    case "slide":
      return `opacity-100 transform ${vertical === "top" ? "translate-y-0" : "translate-y-0"}`;
    case "grow":
      return "opacity-100 scale-100";
    default:
      return "opacity-100";
  }
}

// Get combined styles based on props
export function getSnackbarStyles(
  severity: SnackbarSeverity,
  variant: SnackbarVariant,
  anchorOrigin: SnackbarAnchorOrigin,
  transition: SnackbarTransition,
  open: boolean,
): string {
  const severityStyle = severityStyles[severity][variant];
  const positionStyle = getPositionStyles(anchorOrigin);
  const transitionStyle = getTransitionStyles(transition, open, anchorOrigin);

  return `${baseSnackbarStyles.container} ${severityStyle} ${positionStyle} ${transitionStyle}`;
}

// Get icon color based on severity and variant
export function getIconColor(
  severity: SnackbarSeverity,
  variant: SnackbarVariant,
): string {
  if (variant === "outlined") {
    return `text-${severity}`;
  }
  return "text-current";
}

// Get close button styles based on severity and variant
export function getCloseButtonStyles(
  severity: SnackbarSeverity,
  variant: SnackbarVariant,
): string {
  if (variant === "outlined") {
    return `hover:bg-${severity} hover:bg-opacity-10 focus:ring-${severity}`;
  }
  return "hover:bg-white hover:bg-opacity-10 focus:ring-white focus:ring-opacity-50";
}
