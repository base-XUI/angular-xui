import { Component } from "@angular/core";
import { TabsComponent } from "../Tabs";
import { TabListComponent } from "./TabList.component";
import { TabComponent } from "../Tab/Tab.component";

@Component({
  selector: "standard-test",
  standalone: true,
  imports: [TabsComponent, TabListComponent, TabComponent],
  template: `
    <xui-tabs [defaultValue]="0">
      <xui-tablist>
        <xui-tab [value]="0">Tab 1</xui-tab>
        <xui-tab [value]="1">Tab 2</xui-tab>
      </xui-tablist>
    </xui-tabs>
  `,
})
class StandardTabListTestComponent {}

@Component({
  selector: "vertical-test",
  standalone: true,
  imports: [TabsComponent, TabListComponent, TabComponent],
  template: `
    <xui-tabs [defaultValue]="0" orientation="vertical">
      <xui-tablist>
        <xui-tab [value]="0">Tab 1</xui-tab>
        <xui-tab [value]="1">Tab 2</xui-tab>
      </xui-tablist>
    </xui-tabs>
  `,
})
class VerticalTabListTestComponent {}

@Component({
  selector: "custom-class-test",
  standalone: true,
  imports: [TabsComponent, TabListComponent, TabComponent],
  template: `
    <xui-tabs [defaultValue]="0">
      <xui-tablist className="custom-class">
        <xui-tab [value]="0">Tab 1</xui-tab>
        <xui-tab [value]="1">Tab 2</xui-tab>
      </xui-tablist>
    </xui-tabs>
  `,
})
class CustomClassTabListTestComponent {}

@Component({
  selector: "fullwidth-test",
  standalone: true,
  imports: [TabsComponent, TabListComponent, TabComponent],
  template: `
    <xui-tabs [defaultValue]="0" variant="fullWidth">
      <xui-tablist>
        <xui-tab [value]="0">Tab 1</xui-tab>
        <xui-tab [value]="1">Tab 2</xui-tab>
      </xui-tablist>
    </xui-tabs>
  `,
})
class FullWidthTabListTestComponent {}

describe("TabList Component", () => {
  it("renders standard tab list correctly", () => {
    cy.mount(StandardTabListTestComponent);

    cy.get('[role="tablist"]').should("exist");
    cy.get('[role="tab"]').should("have.length", 2);
  });

  it("aligns tabs based on orientation", () => {
    cy.mount(VerticalTabListTestComponent);

    cy.get('[role="tablist"]').should("have.class", "flex-col");

    cy.mount(StandardTabListTestComponent);

    cy.get('[role="tablist"]').should("not.have.class", "flex-col");
  });

  it("renders with custom className", () => {
    cy.mount(CustomClassTabListTestComponent);

    cy.get('[role="tablist"]').should("have.class", "custom-class");
  });

  it("applies fullWidth styling when tab variant is fullWidth", () => {
    cy.mount(FullWidthTabListTestComponent);

    cy.get('[role="tab"]').should("have.class", "flex-1");
  });
});
