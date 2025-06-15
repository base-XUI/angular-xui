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
    // Top-Left
    trigger("slideFromTopLeft", [
      state("void", style({ transform: "translateY(-100%)", opacity: 0 })),
      state("in", style({ transform: "translateY(0)", opacity: 1 })),
      transition("void => in", [animate("300ms ease-out")]),
      transition("in => void", [animate("250ms ease-in")]),
    ]),
    // Top-Center
    trigger("slideFromTopCenter", [
      state("void", style({ transform: "translate(-50%, -100%)", opacity: 0 })),
      state("in", style({ transform: "translateX(-50%)", opacity: 1 })),
      transition("void => in", [animate("300ms ease-out")]),
      transition("in => void", [animate("250ms ease-in")]),
    ]),
    // Top-Right
    trigger("slideFromTopRight", [
      state("void", style({ transform: "translateY(-100%)", opacity: 0 })),
      state("in", style({ transform: "translateY(0)", opacity: 1 })),
      transition("void => in", [animate("300ms ease-out")]),
      transition("in => void", [animate("250ms ease-in")]),
    ]),
    // Bottom-Left
    trigger("slideFromBottomLeft", [
      state("void", style({ transform: "translateY(100%)", opacity: 0 })),
      state("in", style({ transform: "translateY(0)", opacity: 1 })),
      transition("void => in", [animate("300ms ease-out")]),
      transition("in => void", [animate("250ms ease-in")]),
    ]),
    // Bottom-Center
    trigger("slideFromBottomCenter", [
      state("void", style({ transform: "translate(-50%, 100%)", opacity: 0 })),
      state("in", style({ transform: "translateX(-50%)", opacity: 1 })),
      transition("void => in", [animate("300ms ease-out")]),
      transition("in => void", [animate("250ms ease-in")]),
    ]),
    // Bottom-Right
    trigger("slideFromBottomRight", [
      state("void", style({ transform: "translateY(100%)", opacity: 0 })),
      state("in", style({ transform: "translateY(0)", opacity: 1 })),
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
  @Input() autoHideDuration: number = 5000;
  @Input() anchorOrigin: SnackbarAnchorOrigin = {
    vertical: "bottom",
    horizontal: "left",
  };

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
    this.isVisible = this.open;
    this.updateStyles();
    this.updateAnimation();
    this.setupAutoHide();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["open"] || changes["anchorOrigin"]) {
      if (changes["open"]) {
        this.isVisible = this.open;
      }
      this.updateAnimation();
      this.updateStyles();
      this.setupAutoHide();
    }
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
    const { vertical, horizontal } = this.anchorOrigin;

    if (vertical === "top") {
      if (horizontal === "left") {
        this.animationTrigger = "slideFromTopLeft";
      } else if (horizontal === "center") {
        this.animationTrigger = "slideFromTopCenter";
      } else {
        this.animationTrigger = "slideFromTopRight";
      }
    } else {
      if (horizontal === "left") {
        this.animationTrigger = "slideFromBottomLeft";
      } else if (horizontal === "center") {
        this.animationTrigger = "slideFromBottomCenter";
      } else {
        this.animationTrigger = "slideFromBottomRight";
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
    this.isVisible = false;
  }

  onAnimationDone(event: AnimationEvent): void {
    if (event.toState === "void" && !this.open) {
      // Animation finished, emit close event
      this.closeHandle.emit();
    }
  }
}
