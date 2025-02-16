import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button [class]="classes" [disabled]="disabled">
      <span class="flex items-center gap-2">
        <span *ngIf="iconLeft" class="icon-left">{{ iconLeft }}</span>
        {{ label }}
        <span *ngIf="iconRight" class="icon-right">{{ iconRight }}</span>
      </span>
    </button>
  `
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() variant: 'primary' | 'secondary' | 'outline' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() disabled: boolean = false;
  @Input() iconLeft?: string;
  @Input() iconRight?: string;

  get classes(): string {
    const baseClasses = 'rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const sizeClasses = {
      small: 'px-3 py-1.5 text-sm',
      medium: 'px-4 py-2 text-base',
      large: 'px-6 py-3 text-lg'
    };

    const variantClasses = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
      outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500'
    };

    const disabledClasses = this.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

    return `${baseClasses} ${sizeClasses[this.size]} ${variantClasses[this.variant]} ${disabledClasses}`;
  }
} 