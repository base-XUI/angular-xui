import { Component, Input, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';
type TooltipVariant = 'dark' | 'light' | 'info' | 'warning' | 'error';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative inline-block">
      <!-- Tooltip trigger -->
      <div (mouseenter)="show()" (mouseleave)="hide()">
        <ng-content></ng-content>
      </div>

      <!-- Tooltip content -->
      <div
        *ngIf="isVisible"
        [class]="tooltipClasses"
        [style.margin-left.px]="
          position === 'top' || position === 'bottom' ? offsetX : 0
        "
        [style.margin-top.px]="
          position === 'left' || position === 'right' ? offsetY : 0
        "
      >
        {{ content }}
        <div [class]="arrowClasses"></div>
      </div>
    </div>
  `,
})
export class TooltipComponent {
  @Input() content: string = '';
  @Input() position: TooltipPosition = 'top';
  @Input() variant: TooltipVariant = 'dark';
  @Input() delay: number = 0;

  isVisible: boolean = false;
  offsetX: number = 0;
  offsetY: number = 0;

  private showTimeout?: number;

  constructor(private elementRef: ElementRef) {}

  get tooltipClasses(): string {
    const baseClasses =
      'absolute z-50 px-2 py-1 text-sm rounded shadow-lg whitespace-nowrap';
    const positionClasses = {
      top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
      right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
      bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    };
    const variantClasses = {
      dark: 'bg-gray-900 text-white',
      light: 'bg-white text-gray-900 border border-gray-200',
      info: 'bg-blue-600 text-white',
      warning: 'bg-yellow-500 text-white',
      error: 'bg-red-600 text-white',
    };

    return `${baseClasses} ${positionClasses[this.position]} ${variantClasses[this.variant]}`;
  }

  get arrowClasses(): string {
    const baseClasses = 'absolute w-2 h-2 transform rotate-45';
    const positionClasses = {
      top: 'bottom-[-4px] left-1/2 -translate-x-1/2',
      right: 'left-[-4px] top-1/2 -translate-y-1/2',
      bottom: 'top-[-4px] left-1/2 -translate-x-1/2',
      left: 'right-[-4px] top-1/2 -translate-y-1/2',
    };
    const variantClasses = {
      dark: 'bg-gray-900',
      light: 'bg-white border-b border-r border-gray-200',
      info: 'bg-blue-600',
      warning: 'bg-yellow-500',
      error: 'bg-red-600',
    };

    return `${baseClasses} ${positionClasses[this.position]} ${variantClasses[this.variant]}`;
  }

  show(): void {
    if (this.delay) {
      this.showTimeout = window.setTimeout(() => {
        this.isVisible = true;
        this.updatePosition();
      }, this.delay);
    } else {
      this.isVisible = true;
      this.updatePosition();
    }
  }

  hide(): void {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
    }
    this.isVisible = false;
  }

  private updatePosition(): void {
    const element = this.elementRef.nativeElement as HTMLElement;
    const tooltip = element.querySelector('[class*="absolute"]') as HTMLElement;
    if (!tooltip) return;

    const tooltipRect = tooltip.getBoundingClientRect();

    // Adjust position if tooltip is outside viewport
    if (this.position === 'top' || this.position === 'bottom') {
      const leftOverflow = tooltipRect.left < 0;
      const rightOverflow = tooltipRect.right > window.innerWidth;

      if (leftOverflow) {
        this.offsetX = -tooltipRect.left + 8;
      } else if (rightOverflow) {
        this.offsetX = window.innerWidth - tooltipRect.right - 8;
      }
    } else {
      const topOverflow = tooltipRect.top < 0;
      const bottomOverflow = tooltipRect.bottom > window.innerHeight;

      if (topOverflow) {
        this.offsetY = -tooltipRect.top + 8;
      } else if (bottomOverflow) {
        this.offsetY = window.innerHeight - tooltipRect.bottom - 8;
      }
    }
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  onWindowChange(): void {
    if (this.isVisible) {
      this.updatePosition();
    }
  }
}
