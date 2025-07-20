import { Component, Input, HostBinding } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CardMediaProps } from "./card.types";

@Component({
  selector: "xui-card-media",
  template: `
    <img
      *ngIf="src; else placeholder"
      [src]="src"
      [alt]="alt || ''"
      [class]="objectFitClasses"
    />

    <ng-template #placeholder>
      <div
        class="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400"
      >
        <svg
          class="h-12 w-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      </div>
    </ng-template>
  `,
  imports: [CommonModule],
  standalone: true,
})
export class CardMediaComponent implements CardMediaProps {
  @Input() src?: string;
  @Input() alt?: string;
  @Input() aspectRatio: "16/9" | "4/3" | "1/1" | "3/2" = "16/9";
  @Input() objectFit: "cover" | "contain" | "fill" | "none" | "scale-down" =
    "cover";
  @Input() component = "img";

  @HostBinding("class") get classes() {
    const aspectRatios = {
      "16/9": "aspect-video",
      "4/3": "aspect-[4/3]",
      "1/1": "aspect-square",
      "3/2": "aspect-[3/2]",
    };

    return `block overflow-hidden first:-mt-6 first:rounded-t-xl last:rounded-b-xl only:rounded-xl ${aspectRatios[this.aspectRatio]}`;
  }

  get objectFitClasses() {
    return `h-full w-full ${
      this.objectFit === "cover"
        ? "object-cover"
        : this.objectFit === "contain"
          ? "object-contain"
          : this.objectFit === "fill"
            ? "object-fill"
            : this.objectFit === "none"
              ? "object-none"
              : "object-scale-down"
    }`;
  }

  @HostBinding("attr.data-slot") dataSlot = "card-media";
}
