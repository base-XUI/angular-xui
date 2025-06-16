import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ElementRef,
  ChangeDetectorRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Subscription } from "rxjs";
import { TabPanelBaseProps } from "./TabPanel.types";
import { TABPANEL_ANIMATIONS, TABPANEL_VARIANTS } from "./variants";
import { TabsService } from "../Tabs";

@Component({
  selector: "xui-tabpanel",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./TabPanel.component.html",
})
export class TabPanelComponent implements OnInit, OnDestroy, TabPanelBaseProps {
  @Input() value!: any;
  @Input() className: string = "";
  @Input() id?: string;
  @Input() animate: boolean = true;
  @Input() keepMounted: boolean = false;
  @Input() variant: keyof typeof TABPANEL_VARIANTS = "standard";
  @Input() animation: keyof typeof TABPANEL_ANIMATIONS = "fade";

  active = false;
  private subscription?: Subscription;

  constructor(
    private tabsService: TabsService,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.subscription = this.tabsService.value$.subscribe((value) => {
      const wasActive = this.active;
      this.active = this.value === value;

      if (this.active && !wasActive && this.onEnter) {
        this.onEnter();
      } else if (!this.active && wasActive && this.onExit) {
        this.onExit();
      }

      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onEnter?(): void;
  onExit?(): void;

  generateClasses(): string {
    const baseClasses = `
      ring-offset-background 
      ${this.active ? "data-[state=active]:animate-in data-[state=active]:fade-in" : "data-[state=inactive]:animate-out data-[state=inactive]:fade-out"} 
      mt-2
      focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none
      ${this.className}`;

    // Add variant classes
    let variantClass = "";
    switch (this.variant) {
      case "standard":
        variantClass = "p-4";
        break;
      case "boxed":
        variantClass = "p-4 border rounded-lg";
        break;
      case "borderless":
        variantClass = "p-4 border-0";
        break;
    }

    // Add animation classes
    let animationClass = "";
    if (this.animate) {
      switch (this.animation) {
        case "fade":
          animationClass = "transition-opacity duration-200";
          break;
        case "slide":
          animationClass = "transition-transform duration-200";
          break;
        case "none":
          animationClass = "";
          break;
      }
    }

    return `${baseClasses} ${variantClass} ${animationClass}`.trim();
  }
}
