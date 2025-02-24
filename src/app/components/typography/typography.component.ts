import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-typography',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="classes">
      {{ text }}
    </div>
  `
})
export class TypographyComponent {
  @Input() variant: 'h1' | 'h2' | 'h3' | 'h4' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' = 'body1';
  @Input() text: string = '';

  get classes(): string {
    const variantClasses = {
      h1: 'text-5xl font-bold text-gray-900 leading-tight',
      h2: 'text-4xl font-semibold text-gray-900 leading-tight',
      h3: 'text-3xl font-semibold text-gray-900 leading-snug',
      h4: 'text-2xl font-medium text-gray-900 leading-snug',
      subtitle1: 'text-xl font-medium text-gray-800 leading-relaxed',
      subtitle2: 'text-lg font-medium text-gray-800 leading-relaxed',
      body1: 'text-base text-gray-700 leading-relaxed',
      body2: 'text-sm text-gray-700 leading-relaxed',
      caption: 'text-xs text-gray-600 leading-normal'
    };

    return variantClasses[this.variant];
  }
} 