import { SnackbarAnchorOrigin } from "./snackbar.types";

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
