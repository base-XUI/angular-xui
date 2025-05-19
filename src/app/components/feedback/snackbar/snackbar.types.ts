export type SnackbarSeverity =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning";
export type SnackbarVariant = "filled" | "outlined";
export type SnackbarVerticalPosition = "top" | "bottom";
export type SnackbarHorizontalPosition = "left" | "center" | "right";

export interface SnackbarAnchorOrigin {
  vertical: SnackbarVerticalPosition;
  horizontal: SnackbarHorizontalPosition;
}

export interface SnackbarOptions {
  message?: string;
  action?: any;
  autoHideDuration?: number;
  anchorOrigin?: SnackbarAnchorOrigin;
  style?: Record<string, any>;
  closeHandle?: () => void;
  open?: boolean;
  severity?: SnackbarSeverity;
  variant?: SnackbarVariant;
  withCloseIcon?: boolean;
  closeIcon?: any;
  customIcon?: any;
}
