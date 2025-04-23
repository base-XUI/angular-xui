import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type CardVariant = 'basic' | 'bordered' | 'elevated' | 'flat';
type CardPadding = 'none' | 'small' | 'medium' | 'large';
type ImagePosition = 'top' | 'left' | 'right' | 'bottom' | 'background';
type ImageSize = 'small' | 'medium' | 'large' | 'full';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="cardClasses" [ngStyle]="backgroundImageStyle">
      <!-- Background Image Placeholder -->
      <div
        *ngIf="shouldShowImage('background')"
        class="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center"
      >
        <svg
          class="w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      <div [class]="containerClasses">
        <!-- Left Image -->
        <div *ngIf="shouldShowImage('left')" [class]="mediaClasses">
          <div
            *ngIf="!imageUrl"
            class="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center"
          >
            <svg
              class="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <img
            *ngIf="imageUrl"
            [src]="imageUrl"
            [alt]="imageAlt"
            class="w-full h-full object-cover"
          />
        </div>

        <div class="flex flex-col flex-1 relative">
          <!-- Top Image -->
          <div *ngIf="shouldShowImage('top')" [class]="mediaClasses">
            <div
              *ngIf="!imageUrl"
              class="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center"
            >
              <svg
                class="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <img
              *ngIf="imageUrl"
              [src]="imageUrl"
              [alt]="imageAlt"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Card Header -->
          <div *ngIf="title || subtitle" [class]="headerClasses">
            <div *ngIf="title" class="text-lg font-semibold">{{ title }}</div>
            <div
              *ngIf="subtitle"
              class="text-sm text-gray-600 dark:text-gray-400"
            >
              {{ subtitle }}
            </div>
          </div>

          <!-- Card Content -->
          <div [class]="contentClasses">
            <ng-content></ng-content>
          </div>

          <!-- Card Footer -->
          <div *ngIf="footer" [class]="footerClasses">
            <ng-content select="[footer]"></ng-content>
          </div>

          <!-- Bottom Image -->
          <div *ngIf="shouldShowImage('bottom')" [class]="mediaClasses">
            <div
              *ngIf="!imageUrl"
              class="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center"
            >
              <svg
                class="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <img
              *ngIf="imageUrl"
              [src]="imageUrl"
              [alt]="imageAlt"
              class="w-full h-full object-cover"
            />
          </div>
        </div>

        <!-- Right Image -->
        <div *ngIf="shouldShowImage('right')" [class]="mediaClasses">
          <div
            *ngIf="!imageUrl"
            class="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center"
          >
            <svg
              class="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <img
            *ngIf="imageUrl"
            [src]="imageUrl"
            [alt]="imageAlt"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  `,
})
export class CardComponent {
  @Input() variant: CardVariant = 'basic';
  @Input() padding: CardPadding = 'medium';
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() imageUrl?: string;
  @Input() imageAlt?: string;
  @Input() imagePosition: ImagePosition = 'top';
  @Input() imageSize: ImageSize = 'medium';
  @Input() footer: boolean = false;

  get containerClasses(): string {
    return this.imagePosition === 'left' || this.imagePosition === 'right'
      ? 'flex'
      : '';
  }

  get cardClasses(): string {
    const baseClasses = 'overflow-hidden rounded-lg relative';

    const variantClasses = {
      basic: 'bg-white dark:bg-gray-800',
      bordered:
        'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
      elevated: 'bg-white dark:bg-gray-800 shadow-lg',
      flat: 'bg-gray-50 dark:bg-gray-900',
    };

    const backgroundClasses =
      this.imagePosition === 'background' ? 'text-white relative' : '';

    return `${baseClasses} ${variantClasses[this.variant]} ${backgroundClasses}`;
  }

  get paddingClasses(): string {
    return {
      none: '',
      small: 'p-2',
      medium: 'p-4',
      large: 'p-6',
    }[this.padding];
  }

  get headerClasses(): string {
    return `${this.paddingClasses} border-b border-gray-200 dark:border-gray-700`;
  }

  get mediaClasses(): string {
    const baseClasses = 'overflow-hidden';

    if (this.imagePosition === 'left' || this.imagePosition === 'right') {
      const sizeClasses = {
        small: 'w-32',
        medium: 'w-48',
        large: 'w-64',
        full: 'w-1/2',
      };
      return `${baseClasses} ${sizeClasses[this.imageSize]}`;
    }

    const heightClasses = {
      small: 'h-32',
      medium: 'h-48',
      large: 'h-64',
      full: 'aspect-video',
    };
    return `${baseClasses} ${heightClasses[this.imageSize]}`;
  }

  get backgroundImageStyle() {
    if (this.imagePosition === 'background' && this.imageUrl) {
      return {
        'background-image': `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${this.imageUrl})`,
        'background-size': 'cover',
        'background-position': 'center',
      };
    }
    return {};
  }

  get contentClasses(): string {
    return this.paddingClasses;
  }

  get footerClasses(): string {
    return `${this.paddingClasses} border-t border-gray-200 dark:border-gray-700`;
  }

  shouldShowImage(position: ImagePosition): boolean {
    return (
      this.imagePosition === position ||
      (!this.imageUrl && this.imagePosition === position)
    );
  }
}
