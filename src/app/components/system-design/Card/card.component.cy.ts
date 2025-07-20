import { Component } from "@angular/core";

import {
  CardActionAreaComponent,
  CardActionsComponent,
  CardComponent,
  CardContentComponent,
  CardHeaderComponent,
  CardMediaComponent,
} from "./index";

@Component({
  selector: "test-card-host",
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardContentComponent,
    CardMediaComponent,
    CardActionsComponent,
    CardActionAreaComponent,
  ],
  template: `
    <xui-card>
      <xui-card-header
        [title]="'Test Card Title'"
        [subheader]="'Card Subtitle'"
      ></xui-card-header>

      <xui-card-media
        [src]="'https://via.placeholder.com/150'"
        [alt]="'Sample Image'"
      ></xui-card-media>

      <xui-card-content>
        <p>This is the content of the card.</p>
      </xui-card-content>

      <xui-card-actions>
        <button (click)="onClick()">Click Me</button>
      </xui-card-actions>
    </xui-card>
  `,
})
class TestCardHostComponent {
  onClick = cy.stub().as("onClickStub");
}

describe("xui-card", () => {
  it("should render all card sections", () => {
    cy.mount(TestCardHostComponent);

    cy.contains("Test Card Title").should("exist");
    cy.contains("Card Subtitle").should("exist");
    cy.get('img[alt="Sample Image"]').should("exist");
    cy.contains("This is the content of the card.").should("exist");
    cy.contains("Click Me").should("exist");
  });

  it("should trigger click event", () => {
    cy.mount(TestCardHostComponent);
    cy.contains("Click Me").click();
    cy.get("@onClickStub").should("have.been.calledOnce");
  });
});
