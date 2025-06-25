import {
  Component,
  ContentChildren,
  AfterContentInit,
  QueryList,
  Input,
  OnInit,
  ElementRef,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";

import { Subscription } from "rxjs";
import { TABLIST_SIZES, TABLIST_VARIANTS, TabsService } from "..";

import { TabComponent } from "../Tab/Tab.component";

import { TabListBaseProps } from "./TabList.types";

@Component({
  selector: "xui-tablist",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./TabList.component.html",
})
export class TabListComponent
  implements OnInit, AfterContentInit, OnDestroy, TabListBaseProps
{
  @Input() variant: keyof typeof TABLIST_VARIANTS = "standard";
  @Input() size: keyof typeof TABLIST_SIZES = "md";
  @Input() className = "";
  @Input() visibleScrollbar = false;
  @Input() centered = false;

  @ContentChildren(TabComponent) tabs?: QueryList<TabComponent>;
  @ViewChild("tabsRef") tabsRef?: ElementRef<HTMLDivElement>;

  orientation: "horizontal" | "vertical" = "horizontal";
  tabsVariant: "standard" | "scrollable" | "fullWidth" = "standard";
  indicatorColor: "primary" | "secondary" = "primary";
  currentValue: any = null;

  indicatorPosition = { left: 0, width: 0, top: 0, height: 0 };
  private subscriptions: Subscription[] = [];

  constructor(
    private tabsService: TabsService,
    public elementRef: ElementRef,
  ) {}

  ngOnInit(): void {
    this.subscribeToTabsService();
  }

  private subscribeToTabsService(): void {
    this.subscriptions.push(
      this.tabsService.orientation$.subscribe((orientation) => {
        this.orientation = orientation;
        setTimeout(() => this.updateIndicator());
      }),

      this.tabsService.variant$.subscribe((variant) => {
        this.tabsVariant = variant;
      }),

      this.tabsService.indicatorColor$.subscribe((color) => {
        this.indicatorColor = color;
      }),

      this.tabsService.value$.subscribe((value) => {
        this.currentValue = value;
        setTimeout(() => this.updateIndicator());
        this.focusSelectedTab();
      }),
    );
  }

  ngAfterContentInit(): void {
    if (!this.tabs) return;

    this.initializeTabs();

    this.subscriptions.push(
      this.tabs.changes.subscribe(() => {
        this.initializeTabs();
      }),
    );
  }

  private initializeTabs(): void {
    if (!this.tabs) return;

    this.tabs.forEach((tab, index) => {
      tab.index = index;
    });

    setTimeout(() => this.updateIndicator());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  updateIndicator(): void {
    if (!this.tabs) return;

    const selectedTab = this.tabs.find(
      (tab) => tab.value === this.currentValue,
    );

    if (!selectedTab || !selectedTab.elementRef?.nativeElement) return;

    const tabElement = selectedTab.elementRef.nativeElement;
    const listRect = tabElement.parentElement?.getBoundingClientRect();

    if (!listRect) return;

    const tabRect = tabElement.getBoundingClientRect();

    this.indicatorPosition =
      this.orientation === "horizontal"
        ? {
            left: tabRect.left - listRect.left,
            width: tabRect.width,
            top: 0,
            height: 0,
          }
        : {
            left: 0,
            width: 0,
            top: tabRect.top - listRect.top,
            height: tabRect.height,
          };
  }

  focusSelectedTab(): void {
    if (!this.tabs || !this.tabsRef) return;

    setTimeout(() => {
      const tabElements = this.getTabElements();
      const selectedTab = this.findSelectedTabElement(tabElements);

      if (selectedTab instanceof HTMLElement) {
        selectedTab.focus();
      }
    });
  }

  private getTabElements(): Element[] {
    return Array.from(this.tabsRef?.nativeElement.children || []).filter(
      (child) =>
        child instanceof HTMLElement && child.getAttribute("role") === "tab",
    );
  }

  private findSelectedTabElement(elements: Element[]): HTMLElement | undefined {
    return elements.find(
      (tab) =>
        tab instanceof HTMLElement &&
        tab.getAttribute("aria-selected") === "true",
    ) as HTMLElement | undefined;
  }

  generateClasses(): string {
    const orientationClass =
      this.orientation === "vertical"
        ? "h-full flex-col rounded-md"
        : "h-10 rounded-md";

    const variantClass = this.getVariantClass();
    const sizeClass = this.getSizeClass();
    const layoutClasses = this.getLayoutClasses();

    return [
      "bg-muted inline-flex items-center justify-center rounded-md p-1",
      orientationClass,
      variantClass,
      sizeClass,
      layoutClasses,
      this.className,
    ]
      .filter(Boolean)
      .join(" ");
  }

  private getVariantClass(): string {
    switch (this.variant) {
      case "standard":
        return "border-b border-gray-200";
      case "contained":
      case "borderless":
        return "border-none";
      default:
        return "";
    }
  }

  private getSizeClass(): string {
    switch (this.size) {
      case "sm":
        return "gap-1";
      case "md":
        return "gap-2";
      case "lg":
        return "gap-4";
      default:
        return "";
    }
  }

  private getLayoutClasses(): string {
    const classes = [];

    if (this.tabsVariant === "fullWidth") {
      classes.push("w-full");
    }

    if (this.tabsVariant === "scrollable") {
      if (!this.visibleScrollbar) {
        classes.push("scrollbar-none");
      }
    }

    if (this.centered) {
      classes.push("justify-center");
    }

    return classes.join(" ");
  }
}
