import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { buttonVariants, type ButtonVariants, buttonVariantsConfig } from './variants';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      [class]="buttonClasses" 
      [disabled]="disabled" 
      (click)="handleClick()"
      [type]="type"
    >
      <span class="flex items-center gap-2">
        <span *ngIf="iconLeft" class="icon-left">{{ iconLeft }}</span>
        <ng-content></ng-content>
        <span *ngIf="iconRight" class="icon-right">{{ iconRight }}</span>
      </span>
    </button>
  `
})
export class ButtonComponent {
  @Input() variant: ButtonVariants['variant'] = 'contained';
  @Input() color: ButtonVariants['color'] = 'primary';
  @Input() size: ButtonVariants['size'] = 'medium';
  @Input() fullWidth: ButtonVariants['fullWidth'] = false;
  @Input() disableElevation: ButtonVariants['disableElevation'] = false;
  @Input() disabled: boolean = false;
  @Input() iconLeft?: string;
  @Input() iconRight?: string;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Output() clicked = new EventEmitter<void>();

  get buttonClasses(): string {
    const baseClasses = buttonVariants({
      variant: this.variant,
      size: this.size,
      fullWidth: this.fullWidth,
      disableElevation: this.disableElevation,
    });

    const colorClasses = this.getColorClasses();
    return `${baseClasses} ${colorClasses}`;
  }

  private getColorClasses(): string {
    if (this.color === 'inherit') {
      return buttonVariantsConfig.variants.color.inherit;
    }

    const colorVariant = buttonVariantsConfig.variants.color[this.color as keyof typeof buttonVariantsConfig.variants.color];
    if (!colorVariant) {
      return '';
    }

    return colorVariant[this.variant as keyof typeof colorVariant] || '';
  }

  handleClick() {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}