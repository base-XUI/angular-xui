import {
  Component,
  ElementRef,
  Input,
  OnInit,
  HostListener,
  TemplateRef,
  ViewChild,
  AfterViewInit,
  ContentChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";

import { TabsService } from "..";
import { TabBaseProps } from "./Tab.types";

@Component({
  selector: "xui-tab",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./Tab.component.html",
})
export class TabComponent implements OnInit, AfterViewInit, TabBaseProps {
  @Input() value!: any;
  @Input() disabled = false;
  @Input() icon: TemplateRef<any> | null = null;
  @Input() label?: string;
  @Input() className = "";
  @Input() disableRipple = false;
  @Input() disableFocusRipple = false;

  @ViewChild("tabButton") tabButtonRef!: ElementRef<HTMLButtonElement>;
  @ContentChild("iconTemplate") iconRef?: TemplateRef<any>;

  isSelected = false;
  index = 0;
  orientation: "horizontal" | "vertical" = "horizontal";
  variant: "standard" | "scrollable" | "fullWidth" = "standard";

  constructor(
    private tabsService: TabsService,
    public elementRef: ElementRef,
  ) {}

  ngOnInit(): void {
    this.tabsService.value$.subscribe((value) => {
      this.isSelected = this.value === value;
    });

    this.tabsService.orientation$.subscribe((orientation) => {
      this.orientation = orientation;
    });

    this.tabsService.variant$.subscribe((variant) => {
      this.variant = variant;
    });
  }

  ngAfterViewInit(): void {
    // Focus the selected tab initially
    if (this.isSelected) {
      setTimeout(() => this.tabButtonRef.nativeElement.focus());
    }
  }

  @HostListener("focus")
  onFocus(): void {
    if (!this.disabled) {
      this.tabButtonRef.nativeElement.focus();
    }
  }

  handleClick(): void {
    if (!this.disabled) {
      this.tabsService.setValue(this.value);
    }
  }

  generateClasses(): string {
    const baseClasses = `ring-offset-background inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all
    focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none
    ${this.disabled ? "disabled:pointer-events-none disabled:opacity-50" : ""}
    ${this.isSelected ? "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow" : ""}
    ${this.orientation === "vertical" ? "w-full justify-start" : ""}
    ${this.variant === "fullWidth" ? "flex-1" : ""}
    ${this.className}`;

    return baseClasses;
  }
}
