import { TemplateRef } from "@angular/core";

export type SnackbarVerticalPosition = "top" | "bottom";
export type SnackbarHorizontalPosition = "left" | "center" | "right";

export interface SnackbarAnchorOrigin {
  vertical: SnackbarVerticalPosition;
  horizontal: SnackbarHorizontalPosition;
}

export interface SnackbarOptions {
  message?: string;
  action?: TemplateRef<unknown>;
  autoHideDuration?: number;
  anchorOrigin?: SnackbarAnchorOrigin;
  closeHandle?: () => void;
  open?: boolean;
}
