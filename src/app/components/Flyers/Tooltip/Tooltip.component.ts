import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  effect,
  DestroyRef,
  inject,
  ElementRef,
  Renderer2,
  OnInit,
} from "@angular/core";

import { NgClass, NgStyle } from "@angular/common";
import { tooltipVariants, TooltipColor, TooltipPlacement } from "./variants";

@Component({
  selector: "xui-tooltip",
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: "./Tooltip.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);

  title = input<string>();
  arrow = input(true);
  disabled = input(false);
  interactive = input(true);
  placement = input<TooltipPlacement>("top");
  color = input<TooltipColor>("primary");
  followCursor = input(false);
  disableFocusListener = input(false);
  disableHoverListener = input(false);
  disableTouchListener = input(false);

  // Changed from input(100) to input(0) for immediate tooltip appearance
  enterDelay = input(0);
  enterNextDelay = input(0);
  leaveDelay = input(0);
  enterTouchDelay = input(700);
  leaveTouchDelay = input(1500);

  id = input<string>();

  onOpen = output<Event>();
  onClose = output<Event>();

  private _isOpen = signal(false);
  private cursorPos = signal<{ x: number; y: number } | null>(null);
  private lastOpenTimestamp = signal(0);

  // Fixed tooltip ID generation - now stable
  private _tooltipId = signal<string>("");

  private enterTimer: ReturnType<typeof setTimeout> | null = null;
  private leaveTimer: ReturnType<typeof setTimeout> | null = null;
  private touchEnterTimer: ReturnType<typeof setTimeout> | null = null;
  private touchLeaveTimer: ReturnType<typeof setTimeout> | null = null;

  // Now uses stable ID from signal
  tooltipId = computed(() => this._tooltipId());

  tooltipClasses = computed(() =>
    tooltipVariants({
      color: this.color(),
      placement: this.placement(),
      arrow: this.arrow(),
      disableInteractive: !this.interactive(),
    }),
  );

  tooltipStyles = computed(() => {
    const cursor = this.cursorPos();
    if (this.followCursor() && cursor) {
      return {
        position: "fixed",
        top: `${cursor.y + 10}px`,
        left: `${cursor.x + 3}px`,
        transform: "none",
      };
    }
    return {};
  });

  constructor() {
    effect((onCleanup) => {
      onCleanup(() => this.clearTimers());
    });
  }

  ngOnInit() {
    // Generate stable tooltip ID once
    const generatedId =
      this.id() ?? `tooltip-${Math.random().toString(36).slice(2, 8)}`;
    this._tooltipId.set(generatedId);
  }

  private clearTimers(): void {
    [
      this.enterTimer,
      this.leaveTimer,
      this.touchEnterTimer,
      this.touchLeaveTimer,
    ].forEach((timer) => {
      if (timer) clearTimeout(timer);
    });

    this.enterTimer = null;
    this.leaveTimer = null;
    this.touchEnterTimer = null;
    this.touchLeaveTimer = null;
  }

  private openTooltip(event: Event): void {
    // Added check for empty/undefined title
    if (this.disabled() || !this.title()?.trim()) return;

    this.clearTimers();
    this._isOpen.set(true);
    this.lastOpenTimestamp.set(Date.now());
    this.onOpen.emit(event);
  }

  private closeTooltip(event: Event): void {
    this.clearTimers();
    this._isOpen.set(false);
    this.onClose.emit(event);
  }

  handleHover(entering: boolean, event: MouseEvent): void {
    if (this.disabled() || this.disableHoverListener()) return;

    this.clearTimers();
    const now = Date.now();

    if (entering) {
      const delay =
        now - this.lastOpenTimestamp() < 1000
          ? this.enterNextDelay()
          : this.enterDelay();

      this.enterTimer = setTimeout(() => this.openTooltip(event), delay);
    } else {
      this.leaveTimer = setTimeout(
        () => this.closeTooltip(event),
        this.leaveDelay(),
      );
    }
  }

  handleFocus(focused: boolean, event: FocusEvent): void {
    if (this.disabled() || this.disableFocusListener()) return;

    this.clearTimers();

    if (focused) {
      this.enterTimer = setTimeout(
        () => this.openTooltip(event),
        this.enterDelay(),
      );
    } else {
      this.leaveTimer = setTimeout(
        () => this.closeTooltip(event),
        this.leaveDelay(),
      );
    }
  }

  handleTouchStart(event: TouchEvent): void {
    if (this.disabled() || this.disableTouchListener()) return;

    this.clearTimers();
    this.touchEnterTimer = setTimeout(
      () => this.openTooltip(event),
      this.enterTouchDelay(),
    );
  }

  handleTouchEnd(event: TouchEvent): void {
    if (this.disabled() || this.disableTouchListener()) return;

    if (this.touchEnterTimer) {
      clearTimeout(this.touchEnterTimer);
      this.touchEnterTimer = null;
    }

    this.touchLeaveTimer = setTimeout(
      () => this.closeTooltip(event),
      this.leaveTouchDelay(),
    );
  }

  handleMouseMove(event: MouseEvent): void {
    if (this.followCursor()) {
      this.cursorPos.set({ x: event.clientX, y: event.clientY });
    }
  }

  protected isOpen = computed(() => this._isOpen());
}
