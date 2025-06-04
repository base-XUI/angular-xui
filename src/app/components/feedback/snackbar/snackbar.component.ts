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
import { SnackbarAnchorOrigin } from "./snackbar.types";
import { getPositionStyles, getVisibilityStyles } from "./variants";

@Component({
  selector: "app-snackbar",
  templateUrl: "./snackbar.component.html",
  standalone: true,
  imports: [CommonModule],
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

  constructor(
    private ngZone: NgZone,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.updateStyles();
    this.setupAutoHide();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.updateStyles();
    this.setupAutoHide();
  }

  ngOnDestroy(): void {
    this.clearAutoHideTimeout();
  }

  private updateStyles(): void {
    const baseStyles =
      "fixed z-50 flex items-center border p-2 rounded-md shadow-lg max-w-md min-w-[300px] transition-all duration-300 ease-in-out bg-white text-black";
    const positionStyle = getPositionStyles(this.anchorOrigin);
    const visibilityStyle = getVisibilityStyles(this.open);

    this.containerClass = `${baseStyles} ${positionStyle} ${visibilityStyle}`;
    this.closeButtonClass =
      "ml-2 p-1 rounded-full hover:bg-opacity-20 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-white hover:bg-opacity-10 focus:ring-white focus:ring-opacity-50";
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
