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
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import {
  SnackbarAnchorOrigin,
  SnackbarSeverity,
  SnackbarTransition,
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
  selector: "xui-snackbar",
  templateUrl: "./snackbar.component.html",
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  animations: [
    trigger("snackbarAnimation", [
      // Fade animation
      state("fade-in", style({ opacity: 1 })),
      state("fade-out", style({ opacity: 0 })),

      // Slide animation
      state(
        "slide-in-top",
        style({
          opacity: 1,
          transform: "translateY(0)",
        }),
      ),
      state(
        "slide-out-top",
        style({
          opacity: 0,
          transform: "translateY(-100%)",
        }),
      ),
      state(
        "slide-in-bottom",
        style({
          opacity: 1,
          transform: "translateY(0)",
        }),
      ),
      state(
        "slide-out-bottom",
        style({
          opacity: 0,
          transform: "translateY(100%)",
        }),
      ),

      // Grow animation
      state(
        "grow-in",
        style({
          opacity: 1,
          transform: "scale(1)",
        }),
      ),
      state(
        "grow-out",
        style({
          opacity: 0,
          transform: "scale(0.9)",
        }),
      ),

      // Transitions
      transition("void => fade-in", [
        style({ opacity: 0 }),
        animate("150ms ease-out"),
      ]),
      transition("fade-in => fade-out", [animate("100ms ease-in")]),

      transition("void => slide-in-top", [
        style({
          opacity: 0,
          transform: "translateY(-100%)",
        }),
        animate("200ms ease-out"),
      ]),
      transition("slide-in-top => slide-out-top", [animate("150ms ease-in")]),

      transition("void => slide-in-bottom", [
        style({
          opacity: 0,
          transform: "translateY(100%)",
        }),
        animate("200ms ease-out"),
      ]),
      transition("slide-in-bottom => slide-out-bottom", [
        animate("150ms ease-in"),
      ]),

      transition("void => grow-in", [
        style({
          opacity: 0,
          transform: "scale(0.9)",
        }),
        animate("200ms ease-out"),
      ]),
      transition("grow-in => grow-out", [animate("150ms ease-in")]),
    ]),
  ],
})
export class SnackbarComponent implements OnInit, OnDestroy, OnChanges {
  // Required inputs
  @Input() open: boolean = false;

  // Optional inputs with default values
  @Input() message?: string;
  @Input() action?: TemplateRef<unknown>;
  @Input() autoHideDuration: number = 5000;
  @Input() anchorOrigin: SnackbarAnchorOrigin = {
    vertical: "bottom",
    horizontal: "left",
  };
  @Input() style: Record<string, string | number> = {};
  @Input() severity: SnackbarSeverity = "info";
  @Input() variant: SnackbarVariant = "filled";
  @Input() withCloseIcon: boolean = true;
  @Input() closeIcon?: TemplateRef<unknown>;
  @Input() customIcon?: TemplateRef<unknown>;
  @Input() transition: SnackbarTransition = "fade";

  // Output events
  @Output() closeHandle = new EventEmitter<void>();

  // Internal properties
  animationState: string = "";
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
    this.setAnimationState();
    this.setupAutoHide();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.updateStyles();
    this.updateSeverityIcon();
    this.setAnimationState();
    this.setupAutoHide();
  }

  ngOnDestroy(): void {
    this.clearAutoHideTimeout();
  }

  private updateStyles(): void {
    this.containerClass = getSnackbarStyles(
      this.severity,
      this.variant,
      this.anchorOrigin,
      this.transition,
      this.open,
    );

    this.closeButtonClass = `ml-2 p-1 rounded-full hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2 ${getCloseButtonStyles(
      this.severity,
      this.variant,
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
        // No icon for default info severity
        this.severityIcon = "";
        break;
      default:
        this.severityIcon = InfoIcon;
        break;
    }
  }

  private setAnimationState(): void {
    if (this.open) {
      switch (this.transition) {
        case "slide":
          this.animationState = `slide-in-${this.anchorOrigin.vertical}`;
          break;
        case "grow":
          this.animationState = "grow-in";
          break;
        case "fade":
        default:
          this.animationState = "fade-in";
          break;
      }
    } else {
      switch (this.transition) {
        case "slide":
          this.animationState = `slide-out-${this.anchorOrigin.vertical}`;
          break;
        case "grow":
          this.animationState = "grow-out";
          break;
        case "fade":
        default:
          this.animationState = "fade-out";
          break;
      }
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
