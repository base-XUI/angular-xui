import { Component } from "@angular/core";

import { TabsComponent } from "../Tabs";
import { TabComponent } from "./Tab.component";
import { TabListComponent } from "../TabList";

@Component({
  selector: "test-wrapper",
  standalone: true,
  imports: [TabsComponent, TabComponent, TabListComponent],
  template: `
    <xui-tabs [defaultValue]="0">
      <xui-tablist>
        <xui-tab [value]="0">Standard Tab</xui-tab>
      </xui-tablist>
    </xui-tabs>
  `,
})
class StandardTabTestComponent {}

@Component({
  selector: "icon-tab-wrapper",
  standalone: true,
  imports: [TabsComponent, TabComponent, TabListComponent],
  template: `
    <xui-tabs [defaultValue]="0">
      <xui-tablist>
        <xui-tab [value]="0">
          <span data-testid="icon">🏠</span>
          With Icon
        </xui-tab>
      </xui-tablist>
    </xui-tabs>
  `,
})
class IconTabTestComponent {}

@Component({
  selector: "disabled-tab-wrapper",
  standalone: true,
  imports: [TabsComponent, TabComponent, TabListComponent],
  template: `
    <xui-tabs [defaultValue]="0">
      <xui-tablist>
        <xui-tab [value]="0">Tab 1</xui-tab>
        <xui-tab [value]="1" [disabled]="true">Disabled Tab</xui-tab>
      </xui-tablist>
    </xui-tabs>
  `,
})
class DisabledTabTestComponent {}

@Component({
  selector: "click-event-wrapper",
  standalone: true,
  imports: [TabsComponent, TabComponent, TabListComponent],
  template: `
    <xui-tabs [defaultValue]="0">
      <xui-tablist>
        <xui-tab [value]="0">Tab 1</xui-tab>
        <xui-tab [value]="1">Tab 2</xui-tab>
      </xui-tablist>
    </xui-tabs>
  `,
})
class ClickEventTabTestComponent {}

describe("TabComponent", () => {
  it("renders standard tab correctly", () => {
    cy.mount(StandardTabTestComponent);

    cy.get('[role="tab"]').should("exist").and("contain.text", "Standard Tab");
    cy.get('[role="tab"]').should("have.attr", "aria-selected", "true");
  });

  it("renders tab with icon", () => {
    cy.mount(IconTabTestComponent);

    cy.get('[data-testid="icon"]').should("exist");
    cy.get('[role="tab"]').should("contain.text", "With Icon");
  });

  it("renders disabled tab", () => {
    cy.mount(DisabledTabTestComponent);

    cy.get('[role="tab"]')
      .eq(1)
      .should("have.attr", "aria-disabled", "true")
      .should("have.attr", "tabindex", "-1");
  });

  it("handles click events", () => {
    cy.mount(ClickEventTabTestComponent);

    cy.get('[role="tab"]').eq(0).should("have.attr", "aria-selected", "true");
    cy.get('[role="tab"]').eq(1).should("have.attr", "aria-selected", "false");

    cy.get('[role="tab"]').eq(1).click();
    cy.get('[role="tab"]').eq(0).should("have.attr", "aria-selected", "false");
    cy.get('[role="tab"]').eq(1).should("have.attr", "aria-selected", "true");
  });

  it("applies appropriate styles based on state", () => {
    cy.mount(ClickEventTabTestComponent);

    cy.get('[role="tab"][aria-selected="true"]')
      .should("exist")
      .and("contain.text", "Tab 1");

    cy.get('[role="tab"][aria-selected="false"]')
      .should("exist")
      .and("contain.text", "Tab 2");
  });
});
