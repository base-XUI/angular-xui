import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav [class]="containerClasses">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo/Brand -->
          <div class="flex-shrink-0">
            <span class="text-xl font-semibold">{{ brand }}</span>
          </div>

          <!-- Desktop Menu -->
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <ng-container *ngFor="let item of menuItems">
                <a [class]="getLinkClasses(item.active)" [href]="item.href">
                  {{ item.label }}
                </a>
              </ng-container>
            </div>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button
              type="button"
              (click)="isOpen = !isOpen"
              [class]="mobileButtonClasses"
            >
              <span class="sr-only">Open main menu</span>
              <!-- Icon when menu is closed -->
              <svg
                *ngIf="!isOpen"
                class="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <!-- Icon when menu is open -->
              <svg
                *ngIf="isOpen"
                class="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div class="md:hidden" [class.block]="isOpen" [class.hidden]="!isOpen">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <ng-container *ngFor="let item of menuItems">
            <a [class]="getMobileLinkClasses(item.active)" [href]="item.href">
              {{ item.label }}
            </a>
          </ng-container>
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  @Input() variant: 'light' | 'dark' = 'light';
  @Input() brand: string = 'Brand';
  @Input() menuItems: Array<{
    label: string;
    href: string;
    active?: boolean;
  }> = [];

  isOpen = false;

  get containerClasses(): string {
    return this.variant === 'light' ? 'bg-white shadow' : 'bg-gray-800';
  }

  get mobileButtonClasses(): string {
    return `
      inline-flex items-center justify-center p-2 rounded-md
      ${
        this.variant === 'light'
          ? 'text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500'
          : 'text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
      }
    `;
  }

  getLinkClasses(isActive: boolean = false): string {
    const baseClasses = 'px-3 py-2 rounded-md text-sm font-medium';

    if (this.variant === 'light') {
      return isActive
        ? `${baseClasses} bg-blue-100 text-blue-700`
        : `${baseClasses} text-gray-700 hover:text-gray-900 hover:bg-gray-100`;
    } else {
      return isActive
        ? `${baseClasses} bg-gray-900 text-white`
        : `${baseClasses} text-gray-300 hover:text-white hover:bg-gray-700`;
    }
  }

  getMobileLinkClasses(isActive: boolean = false): string {
    const baseClasses = 'block px-3 py-2 rounded-md text-base font-medium';

    if (this.variant === 'light') {
      return isActive
        ? `${baseClasses} bg-blue-100 text-blue-700`
        : `${baseClasses} text-gray-700 hover:text-gray-900 hover:bg-gray-100`;
    } else {
      return isActive
        ? `${baseClasses} bg-gray-900 text-white`
        : `${baseClasses} text-gray-300 hover:text-white hover:bg-gray-700`;
    }
  }
}
