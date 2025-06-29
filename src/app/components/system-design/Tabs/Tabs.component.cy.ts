import { Component } from "@angular/core";
import { TabsComponent } from "./Tabs.component";
import { CommonModule } from "@angular/common";
import { LucideAngularModule } from "lucide-angular";
import { TabComponent, TabListComponent, TabPanelComponent } from ".";

type TabValue = number;

@Component({
  selector: "basic-tabs-test",
  template: `
    <xui-tabs [defaultValue]="0">
      <xui-tablist>
        <xui-tab [value]="0">Tab 1</xui-tab>
        <xui-tab [value]="1">Tab 2</xui-tab>
        <xui-tab [value]="2">Tab 3</xui-tab>
      </xui-tablist>
      <xui-tabpanel [value]="0">Content 1</xui-tabpanel>
      <xui-tabpanel [value]="1">Content 2</xui-tabpanel>
      <xui-tabpanel [value]="2">Content 3</xui-tabpanel>
    </xui-tabs>
  `,
  standalone: true,
  imports: [TabsComponent, TabListComponent, TabComponent, TabPanelComponent],
})
class BasicTabsTestComponent {}

@Component({
  selector: "controlled-tabs-test",
  template: `
    <div>
      <xui-tabs [value]="activeTab" (valueChange)="onValueChange($event)">
        <xui-tablist>
          <xui-tab [value]="0">Tab 1</xui-tab>
          <xui-tab [value]="1">Tab 2</xui-tab>
        </xui-tablist>
        <xui-tabpanel [value]="0">Content 1</xui-tabpanel>
        <xui-tabpanel [value]="1">Content 2</xui-tabpanel>
      </xui-tabs>
      <div id="active-tab-value">{{ activeTab }}</div>
      <button
        id="external-control"
        (click)="setActiveTab(activeTab === 0 ? 1 : 0)"
      >
        Toggle Tab
      </button>
    </div>
  `,
  standalone: true,
  imports: [
    CommonModule,
    TabsComponent,
    TabListComponent,
    TabComponent,
    TabPanelComponent,
  ],
})
class ControlledTabsTestComponent {
  activeTab: TabValue = 0;

  onValueChange(value: TabValue): void {
    this.activeTab = value;
  }

  setActiveTab(value: TabValue): void {
    this.activeTab = value;
  }
}

@Component({
  selector: "orientation-tabs-test",
  template: `
    <xui-tabs [defaultValue]="0" orientation="vertical" class="flex-col">
      <xui-tablist>
        <xui-tab [value]="0">Tab 1</xui-tab>
        <xui-tab [value]="1">Tab 2</xui-tab>
      </xui-tablist>
      <xui-tabpanel [value]="0">Content 1</xui-tabpanel>
      <xui-tabpanel [value]="1">Content 2</xui-tabpanel>
    </xui-tabs>
  `,
  standalone: true,
  imports: [TabsComponent, TabListComponent, TabComponent, TabPanelComponent],
})
class OrientationTabsTestComponent {}

@Component({
  selector: "variant-tabs-test",
  template: `
    <xui-tabs [defaultValue]="0" variant="fullWidth">
      <xui-tablist>
        <xui-tab [value]="0">Tab 1</xui-tab>
        <xui-tab [value]="1">Tab 2</xui-tab>
      </xui-tablist>
      <xui-tabpanel [value]="0">Content 1</xui-tabpanel>
      <xui-tabpanel [value]="1">Content 2</xui-tabpanel>
    </xui-tabs>
  `,
  standalone: true,
  imports: [TabsComponent, TabListComponent, TabComponent, TabPanelComponent],
})
class VariantTabsTestComponent {}

@Component({
  selector: "icon-tabs-test",
  template: `
    <xui-tabs [defaultValue]="0">
      <xui-tablist>
        <xui-tab [value]="0">
          <div class="flex items-center">
            <home-icon class="mr-2 h-4 w-4"></home-icon>
            Home Tab
          </div>
        </xui-tab>
        <xui-tab [value]="1">Regular Tab</xui-tab>
      </xui-tablist>
      <xui-tabpanel [value]="0">Content 1</xui-tabpanel>
      <xui-tabpanel [value]="1">Content 2</xui-tabpanel>
    </xui-tabs>
  `,
  standalone: true,
  imports: [
    TabsComponent,
    TabListComponent,
    TabComponent,
    TabPanelComponent,
    LucideAngularModule,
  ],
})
class IconTabsTestComponent {}

describe("Tabs Component", () => {
  it("renders basic tabs correctly", () => {
    cy.mount(BasicTabsTestComponent);
    cy.get('[role="tab"]').should("have.length", 3);
    cy.get('[role="tab"]').first().should("have.attr", "aria-selected", "true");
    cy.get('[role="tabpanel"]').first().should("be.visible");
  });

  it("switches tabs when clicked", () => {
    cy.mount(BasicTabsTestComponent);

    cy.get('[role="tab"]').eq(1).click();
    cy.get('[role="tab"]').eq(1).should("have.attr", "aria-selected", "true");
    cy.get('[role="tab"]').eq(0).should("have.attr", "aria-selected", "false");

    cy.get('[role="tabpanel"]').eq(1).should("be.visible");
    cy.get('[role="tabpanel"]').eq(1).should("contain.text", "Content 2");
  });

  it("supports controlled mode with external state", () => {
    cy.mount(ControlledTabsTestComponent);

    // Initial state
    cy.get('[role="tab"]').first().should("have.attr", "aria-selected", "true");
    cy.get("#active-tab-value").should("contain.text", "0");

    // Change through tab click
    cy.get('[role="tab"]').eq(1).click();
    cy.get('[role="tab"]').eq(1).should("have.attr", "aria-selected", "true");
    cy.get("#active-tab-value").should("contain.text", "1");

    // Change through external control
    cy.get("#external-control").click();
    // Wait for the active tab value to update before checking aria-selected
    cy.get("#active-tab-value").should("contain.text", "0");
    // Now check the tab has been selected
    cy.get('[role="tab"]').first().should("have.attr", "aria-selected", "true");
  });

  it("applies vertical orientation correctly", () => {
    cy.mount(OrientationTabsTestComponent);
    cy.get("xui-tabs").should("have.class", "flex-col");
    cy.get('[role="tablist"]').should(
      "have.attr",
      "aria-orientation",
      "vertical",
    );
  });

  it("applies variant-specific styles", () => {
    cy.mount(VariantTabsTestComponent);
    cy.get('[role="tab"]').should("have.class", "flex-1");
  });

  it("renders tabs with icons correctly", () => {
    cy.mount(IconTabsTestComponent);
    cy.get("home-icon").should("exist");
    cy.get('[role="tab"]').first().should("contain.text", "Home Tab");

    // Verify icon doesn't affect functionality
    cy.get('[role="tab"]').eq(1).click();
    cy.get('[role="tab"]').eq(1).should("have.attr", "aria-selected", "true");
    cy.get('[role="tabpanel"]').eq(1).should("be.visible");
  });

  it("maintains accessibility attributes", () => {
    cy.mount(BasicTabsTestComponent);

    // Check tab has proper accessibility attributes
    cy.get('[role="tab"]').first().should("have.attr", "aria-selected", "true");
    cy.get('[role="tab"]').first().should("have.attr", "tabindex", "0");
    cy.get('[role="tab"]').eq(1).should("have.attr", "tabindex", "-1");

    // Check tabpanel has proper accessibility attributes
    cy.get('[role="tabpanel"]').first().should("have.attr", "aria-labelledby");
    cy.get('[role="tabpanel"]').first().should("have.attr", "tabindex", "0");
  });
});
