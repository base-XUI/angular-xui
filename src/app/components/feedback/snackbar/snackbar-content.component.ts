import { Component, Input, TemplateRef } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-snackbar-content",
  template: `
    <div
      class="m-auto flex min-w-[356px] max-w-lg items-center rounded-md p-4 shadow-lg"
    >
      <div class="flex-grow text-sm font-medium">
        <ng-container *ngIf="message; else contentTpl">{{
          message
        }}</ng-container>
        <ng-template #contentTpl>
          <ng-content></ng-content>
        </ng-template>
      </div>

      <div *ngIf="action" class="ml-auto pl-3">
        <ng-container *ngTemplateOutlet="action"></ng-container>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class SnackbarContentComponent {
  @Input() message?: string;
  @Input() action?: TemplateRef<unknown>;
}
