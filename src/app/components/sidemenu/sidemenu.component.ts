import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface MenuItem {
  label: string;
  icon?: string;
  leftIcon?: string;
  href: string;
  active?: boolean;
  children?: MenuItem[];
  badge?: string;
}

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex h-screen">
      <!-- Sidebar -->
      <div [class]="containerClasses">
        <!-- Logo section -->
        <div class="flex items-center h-16 px-4 border-b">
          <span class="text-lg font-semibold">{{ brand }}</span>
        </div>

        <!-- Menu items -->
        <nav class="flex-1 px-2 py-4 space-y-1">
          <ng-container *ngFor="let item of menuItems">
            <!-- Item with children -->
            <div *ngIf="item.children; else singleItem" class="space-y-1">
              <button
                (click)="toggleSubmenu(item)"
                [class]="getParentMenuClasses(item.active)"
              >
                <span class="flex items-center">
                  <span
                    *ngIf="item.leftIcon"
                    class="mr-2"
                    [innerHTML]="sanitizeIcon(item.leftIcon)"
                  ></span>
                  <span
                    *ngIf="item.icon"
                    class="mr-3"
                    [innerHTML]="sanitizeIcon(item.icon)"
                  ></span>
                  {{ item.label }}
                  <span *ngIf="item.badge" [class]="getBadgeClasses()">
                    {{ item.badge }}
                  </span>
                </span>
                <span class="ml-auto">
                  <svg
                    [class]="item.active ? 'transform rotate-180' : ''"
                    class="w-4 h-4 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>

              <!-- Submenu -->
              <div *ngIf="item.active" class="pl-4 space-y-1">
                <a
                  *ngFor="let child of item.children"
                  [href]="child.href"
                  [class]="getSubmenuClasses(child.active)"
                >
                  <span class="flex items-center justify-between w-full">
                    <span class="flex items-center">
                      <span
                        *ngIf="child.leftIcon"
                        class="mr-2"
                        [innerHTML]="sanitizeIcon(child.leftIcon)"
                      ></span>
                      <span
                        *ngIf="child.icon"
                        class="mr-3"
                        [innerHTML]="sanitizeIcon(child.icon)"
                      ></span>
                      {{ child.label }}
                    </span>
                    <span *ngIf="child.badge" [class]="getBadgeClasses()">
                      {{ child.badge }}
                    </span>
                  </span>
                </a>
              </div>
            </div>

            <!-- Single item -->
            <ng-template #singleItem>
              <a [href]="item.href" [class]="getMenuItemClasses(item.active)">
                <span class="flex items-center justify-between w-full">
                  <span class="flex items-center">
                    <span
                      *ngIf="item.leftIcon"
                      class="mr-2"
                      [innerHTML]="sanitizeIcon(item.leftIcon)"
                    ></span>
                    <span
                      *ngIf="item.icon"
                      class="mr-3"
                      [innerHTML]="sanitizeIcon(item.icon)"
                    ></span>
                    {{ item.label }}
                  </span>
                  <span *ngIf="item.badge" [class]="getBadgeClasses()">
                    {{ item.badge }}
                  </span>
                </span>
              </a>
            </ng-template>
          </ng-container>
        </nav>
      </div>
    </div>
  `,
})
export class SidemenuComponent {
  @Input() variant: 'light' | 'dark' = 'light';
  @Input() brand: string = 'Dashboard';
  @Input() menuItems: MenuItem[] = [];
  @Input() collapsed: boolean = false;

  constructor(private sanitizer: DomSanitizer) {}

  sanitizeIcon(icon: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(icon);
  }

  get containerClasses(): string {
    const baseClasses = 'flex flex-col w-64 transition-all duration-300';
    return this.variant === 'light'
      ? `${baseClasses} bg-white border-r`
      : `${baseClasses} bg-gray-800 border-gray-700`;
  }

  getMenuItemClasses(isActive: boolean = false): string {
    const baseClasses =
      'flex items-center px-4 py-2 text-sm rounded-md transition-colors';

    if (this.variant === 'light') {
      return isActive
        ? `${baseClasses} bg-blue-100 text-blue-700`
        : `${baseClasses} text-gray-700 hover:bg-gray-100`;
    } else {
      return isActive
        ? `${baseClasses} bg-gray-900 text-white`
        : `${baseClasses} text-gray-300 hover:bg-gray-700 hover:text-white`;
    }
  }

  getParentMenuClasses(isActive: boolean = false): string {
    const baseClasses =
      'flex items-center justify-between w-full px-4 py-2 text-sm rounded-md transition-colors';

    if (this.variant === 'light') {
      return isActive
        ? `${baseClasses} bg-gray-100 text-gray-900`
        : `${baseClasses} text-gray-700 hover:bg-gray-100`;
    } else {
      return isActive
        ? `${baseClasses} bg-gray-700 text-white`
        : `${baseClasses} text-gray-300 hover:bg-gray-700 hover:text-white`;
    }
  }

  getSubmenuClasses(isActive: boolean = false): string {
    const baseClasses =
      'flex items-center px-4 py-2 text-sm rounded-md transition-colors';

    if (this.variant === 'light') {
      return isActive
        ? `${baseClasses} bg-blue-50 text-blue-700`
        : `${baseClasses} text-gray-600 hover:bg-gray-50`;
    } else {
      return isActive
        ? `${baseClasses} bg-gray-700 text-white`
        : `${baseClasses} text-gray-400 hover:bg-gray-700 hover:text-white`;
    }
  }

  getBadgeClasses(): string {
    const baseClasses = 'ml-2 px-2 py-0.5 text-xs font-medium rounded-full';
    return this.variant === 'light'
      ? `${baseClasses} bg-blue-100 text-blue-800`
      : `${baseClasses} bg-gray-700 text-gray-200`;
  }

  toggleSubmenu(item: MenuItem): void {
    item.active = !item.active;
  }
}
