import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva } from 'class-variance-authority';

const buttonVariants = cva('px-4 py-2 rounded-md', {
  variants: {
    variant: {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700',
      outline: 'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
      danger: 'bg-red-600 text-white hover:bg-red-700',
    },
    size: {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
  },
});

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button [class]="buttonClasses" [disabled]="disabled" (click)="handleClick()">
      <span class="flex items-center gap-2">
        <span *ngIf="iconLeft" class="icon-left">{{ iconLeft }}</span>
        <ng-content></ng-content>
        <span *ngIf="iconRight" class="icon-right">{{ iconRight }}</span>
      </span>
    </button>
  `
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'outline' | 'danger' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() disabled: boolean = false;
  @Input() iconLeft?: string;
  @Input() iconRight?: string;
  @Output() clicked = new EventEmitter<void>();

  get buttonClasses(): string {
    return buttonVariants({ variant: this.variant, size: this.size });
  }

  handleClick() {
    this.clicked.emit();
  }
}