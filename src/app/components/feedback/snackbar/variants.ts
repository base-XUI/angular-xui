import { SnackbarAnchorOrigin } from "./snackbar.types";

export function getPositionStyles(anchorOrigin: SnackbarAnchorOrigin): string {
  const { vertical, horizontal } = anchorOrigin;

  let position = "";

  if (vertical === "top") {
    position += "top-4 ";
  } else {
    position += "bottom-4 ";
  }

  if (horizontal === "left") {
    position += "left-4";
  } else if (horizontal === "center") {
    position += "left-1/2";
  } else {
    position += "right-4";
  }

  return position;
}

export function getVisibilityStyles(open: boolean): string {
  if (!open) {
    return "opacity-0 scale-95 pointer-events-none";
  }
  return "opacity-100";
}
