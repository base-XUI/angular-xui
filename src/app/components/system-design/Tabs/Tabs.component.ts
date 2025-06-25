import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  AfterContentInit,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { CommonModule } from "@angular/common";

import { TabsService } from "./Tabs.service";
import { TabsBaseProps } from "./Tabs.types";
import { TabListComponent } from "./TabList/TabList.component";
import { TabPanelComponent } from "./TabPanel/TabPanel.component";

@Component({
  selector: "xui-tabs",
  standalone: true,
  imports: [CommonModule],
  providers: [TabsService],
  templateUrl: "./Tabs.component.html",
})
export class TabsComponent
  implements OnInit, AfterContentInit, OnChanges, TabsBaseProps
{
  @Input() value?: any;
  @Input() defaultValue: any = 0;
  @Input() orientation: "horizontal" | "vertical" = "horizontal";
  @Input() variant: "standard" | "scrollable" | "fullWidth" = "standard";
  @Input() indicatorColor: "primary" | "secondary" = "primary";
  @Input() textColor: "inherit" | "primary" | "secondary" = "inherit";
  @Input() className: string = "";
  @Input("aria-label") ariaLabel: string | null = null;

  @Output() valueChange = new EventEmitter<any>();

  @ContentChildren(TabListComponent) tabLists!: QueryList<TabListComponent>;
  @ContentChildren(TabPanelComponent) tabPanels!: QueryList<TabPanelComponent>;

  constructor(private tabsService: TabsService) {}

  ngOnInit(): void {
    const initialValue =
      this.value !== undefined ? this.value : this.defaultValue;

    this.tabsService.setValue(initialValue);
    this.tabsService.setOrientation(this.orientation);
    this.tabsService.setVariant(this.variant);
    this.tabsService.setIndicatorColor(this.indicatorColor);
    this.tabsService.setTextColor(this.textColor);

    this.tabsService.value$.subscribe((value) => {
      this.valueChange.emit(value);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["value"] && changes["value"].currentValue !== undefined) {
      this.tabsService.setValue(changes["value"].currentValue);
    }
  }

  ngAfterContentInit(): void {
    this.updateChildren();

    this.tabsService.value$.subscribe(() => {
      this.updateChildren();
    });
  }

  updateChildren(): void {
    const currentValue = this.tabsService.getValue();

    if (this.tabPanels) {
      this.tabPanels.forEach((panel) => {
        panel.active = panel.value === currentValue;
      });
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    const tabListComponent = this.tabLists?.first;
    if (!tabListComponent || !tabListComponent.tabs) return;

    const tabs = tabListComponent.tabs.toArray();
    const selectedIndex = tabs.findIndex(
      (tab) => tab.value === this.tabsService.getValue(),
    );

    if (selectedIndex === -1) return;

    const tabCount = tabs.length;
    const isRtl = document.dir === "rtl";
    let nextIndex = selectedIndex;

    switch (event.key) {
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = tabCount - 1;
        break;
      case "ArrowLeft":
        if (this.orientation === "horizontal") {
          nextIndex = (selectedIndex + (isRtl ? 1 : -1) + tabCount) % tabCount;
        }
        break;
      case "ArrowRight":
        if (this.orientation === "horizontal") {
          nextIndex = (selectedIndex + (isRtl ? -1 : 1) + tabCount) % tabCount;
        }
        break;
      case "ArrowUp":
        if (this.orientation === "vertical") {
          nextIndex = (selectedIndex - 1 + tabCount) % tabCount;
        }
        break;
      case "ArrowDown":
        if (this.orientation === "vertical") {
          nextIndex = (selectedIndex + 1) % tabCount;
        }
        break;
      default:
        return;
    }

    if (nextIndex !== selectedIndex) {
      event.preventDefault();
      const nextTab = tabs[nextIndex];
      this.tabsService.setValue(nextTab.value);

      setTimeout(() => {
        const nextEl = document.querySelector(
          `[role="tab"][data-index="${nextIndex}"]`,
        ) as HTMLElement | null;
        nextEl?.focus();
      });
    }
  }
}
