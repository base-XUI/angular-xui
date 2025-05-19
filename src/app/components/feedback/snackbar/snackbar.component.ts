import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  NgZone,
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { SvgIconComponent } from "./svg-icon/svg-icon.component";

import {
  SnackbarAnchorOrigin,
  SnackbarSeverity,
  SnackbarVariant,
} from "./snackbar.types";
import { getSnackbarStyles, getCloseButtonStyles } from "./variants";
import {
  SuccessIcon,
  ErrorIcon,
  InfoIcon,
  WarningIcon,
  CloseIcon,
} from "./icons";

@Component({
  selector: "app-snackbar",
  templateUrl: "./snackbar.component.html",
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
})
export class SnackbarComponent implements OnInit, OnDestroy, OnChanges {
  // Required inputs
  @Input() open: boolean = false;

  // Optional inputs with default values
  @Input() message?: string;
  @Input() action?: TemplateRef<unknown>;
  @Input() autoHideDuration: number = 50000000;
  @Input() anchorOrigin: SnackbarAnchorOrigin = {
    vertical: "bottom",
    horizontal: "left",
  };
  @Input() style: Record<string, string | number> = {};
  @Input() severity?: SnackbarSeverity = "primary";
  @Input() variant?: SnackbarVariant = "filled";
  @Input() withCloseIcon: boolean = true;
  @Input() closeIcon?: TemplateRef<unknown>;
  @Input() customIcon?: TemplateRef<unknown>;

  // Output events
  @Output() closeHandle = new EventEmitter<void>();

  // Internal properties
  containerClass: string = "";
  closeButtonClass: string = "";
  autoHideTimeoutId?: number;

  // Icons
  severityIcon: string = "";
  defaultCloseIcon: string = CloseIcon;

  constructor(
    private ngZone: NgZone,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.updateStyles();
    this.updateSeverityIcon();
    this.setupAutoHide();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.updateStyles();
    this.updateSeverityIcon();
    this.setupAutoHide();
  }

  ngOnDestroy(): void {
    this.clearAutoHideTimeout();
  }

  private updateStyles(): void {
    this.containerClass = getSnackbarStyles(
      this.severity || "primary",
      this.variant || "filled",
      this.anchorOrigin,
      this.open,
    );

    this.closeButtonClass = `ml-2 p-1 rounded-full hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2 ${getCloseButtonStyles(
      this.severity || "primary",
      this.variant || "filled",
    )}`;
  }

  private updateSeverityIcon(): void {
    switch (this.severity) {
      case "success":
        this.severityIcon = SuccessIcon;
        break;
      case "error":
        this.severityIcon = ErrorIcon;
        break;
      case "warning":
        this.severityIcon = WarningIcon;
        break;
      case "info":
        this.severityIcon = InfoIcon;
        break;
      default:
        this.severityIcon = "";
        break;
    }
  }

  private setupAutoHide(): void {
    this.clearAutoHideTimeout();

    if (this.open && this.autoHideDuration > 0) {
      this.ngZone.runOutsideAngular(() => {
        this.autoHideTimeoutId = window.setTimeout(() => {
          this.ngZone.run(() => {
            this.handleClose();
          });
        }, this.autoHideDuration);
      });
    }
  }

  private clearAutoHideTimeout(): void {
    if (this.autoHideTimeoutId !== undefined) {
      clearTimeout(this.autoHideTimeoutId);
      this.autoHideTimeoutId = undefined;
    }
  }

  handleClose(): void {
    this.clearAutoHideTimeout();
    this.closeHandle.emit();
  }
}
