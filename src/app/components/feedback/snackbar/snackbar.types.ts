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
  withCloseIcon?: boolean;
  closeIcon?: any;
  customIcon?: any;
}
