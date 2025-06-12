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
import {
  trigger,
  state,
  style,
  transition,
  animate,
  AnimationEvent,
} from "@angular/animations";
import { SnackbarAnchorOrigin } from "./snackbar.types";
import { getPositionStyles } from "./variants";
import { SnackbarContentComponent } from "./snackbar-content.component";

@Component({
  selector: "app-snackbar",
  templateUrl: "./snackbar.component.html",
  standalone: true,
  imports: [CommonModule, SnackbarContentComponent],
  animations: [
    trigger("slideFromBottom", [
      state(
        "void",
        style({
          transform: "translateY(100%) translateX(var(--translate-x, 0))",
          opacity: 0,
        }),
      ),
      state(
        "in",
        style({
          transform: "translateY(0) translateX(var(--translate-x, 0))",
          opacity: 1,
        }),
      ),
      transition("void => in", [animate("300ms ease-out")]),
      transition("in => void", [animate("250ms ease-in")]),
    ]),
    trigger("slideFromTop", [
      state(
        "void",
        style({
          transform: "translateY(-100%) translateX(var(--translate-x, 0))",
          opacity: 0,
        }),
      ),
      state(
        "in",
        style({
          transform: "translateY(0) translateX(var(--translate-x, 0))",
          opacity: 1,
        }),
      ),
      transition("void => in", [animate("300ms ease-out")]),
      transition("in => void", [animate("250ms ease-in")]),
    ]),
  ],
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
  @Input() withCloseIcon: boolean = true;
  @Input() closeIcon?: TemplateRef<unknown>;
  @Input() customIcon?: TemplateRef<unknown>;

  // Output events
  @Output() closeHandle = new EventEmitter<void>();

  // Internal properties
  containerClass: string = "";
  closeButtonClass: string = "";
  autoHideTimeoutId?: number;
  isVisible: boolean = false;
  animationTrigger: string = "";

  constructor(
    private ngZone: NgZone,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.updateStyles();
    this.updateAnimation();
    this.setupAutoHide();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["open"]) {
      this.isVisible = this.open;
      this.updateAnimation();
    }
    this.updateStyles();
    this.setupAutoHide();
  }

  ngOnDestroy(): void {
    this.clearAutoHideTimeout();
  }

  private updateStyles(): void {
    const baseStyles =
      "fixed z-50 flex max-w-md min-w-[356px] items-center rounded-md bg-white text-black";
    const positionStyle = getPositionStyles(this.anchorOrigin);
    // Remove any call to getVisibilityStyles since we're using animations
    this.containerClass = `${baseStyles} ${positionStyle}`;
  }

  private updateAnimation(): void {
    // Simple animation logic based only on vertical position
    if (this.anchorOrigin.vertical === "top") {
      this.animationTrigger = "slideFromTop";
    } else {
      this.animationTrigger = "slideFromBottom";
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
    this.isVisible = false;
  }

  onAnimationDone(event: AnimationEvent): void {
    if (event.toState === "void" && !this.open) {
      // Animation finished, emit close event
      this.closeHandle.emit();
    }
  }
}
