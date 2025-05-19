import {
  SnackbarAnchorOrigin,
  SnackbarSeverity,
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
    filled: "bg-white text-black",
    outlined: "bg-white border border-gray-200 text-blac",
    icon: "text-primary-foreground",
  },
  secondary: {
    filled: "bg-gray-700 text-white",
    outlined: "bg-white border border-gray-700 text-gray-700",
    icon: "text-secondary-foreground",
  },
  success: {
    filled: "bg-green-500 text-white",
    outlined: "bg-white border border-green-500 text-green-500",
    icon: "text-success-foreground",
  },
  error: {
    filled: "bg-red-500 text-white",
    outlined: "bg-white border border-red-500 text-red-500",
    icon: "text-destructive-foreground",
  },
  info: {
    filled: "bg-blue-500 text-white",
    outlined: "bg-white border border-blue-500 text-blue-500",
    icon: "text-info",
  },
  warning: {
    filled: "bg-amber-500 text-white",
    outlined: "bg-white border border-amber-500 text-amber-500",
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

// Visibility styles
export function getVisibilityStyles(open: boolean): string {
  if (!open) {
    return "opacity-0 scale-95 pointer-events-none";
  }
  return "opacity-100";
}

// Get combined styles based on props
export function getSnackbarStyles(
  severity: SnackbarSeverity,
  variant: SnackbarVariant,
  anchorOrigin: SnackbarAnchorOrigin,
  open: boolean,
): string {
  const severityStyle = severityStyles[severity][variant];
  const positionStyle = getPositionStyles(anchorOrigin);
  const visibilityStyle = getVisibilityStyles(open);

  return `${baseSnackbarStyles.container} ${severityStyle} ${positionStyle} ${visibilityStyle}`;
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
