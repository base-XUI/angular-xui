import { CardActionAreaComponent } from "./card-action-area";
import { CardActionsComponent } from "./card-actions";
import { CardContentComponent } from "./card-content";
import { CardHeaderComponent } from "./card-header";
import { CardMediaComponent } from "./card-media";
import { CardComponent } from "./card";

describe("Card Component", () => {
  it("renders basic card with default props", () => {
    cy.mount(
      `
      <ui-card>
        <ui-card-content>Basic card content</ui-card-content>
      </ui-card>
    `,
      {
        imports: [CardComponent, CardContentComponent],
      },
    );

    cy.get('[data-slot="card"]').should("exist");
    cy.get('[data-slot="card-content"]').should(
      "contain.text",
      "Basic card content",
    );
  });

  it("renders filled variant by default", () => {
    cy.mount("<ui-card></ui-card>", {
      imports: [CardComponent],
    });

    cy.get('[data-slot="card"]').should("have.class", "bg-card");
  });

  it("renders outlined variant", () => {
    cy.mount('<ui-card variant="outlined"></ui-card>', {
      imports: [CardComponent],
    });

    cy.get('[data-slot="card"]')
      .should("have.class", "bg-transparent")
      .should("have.class", "border");
  });

  it("renders square variant without rounded corners", () => {
    cy.mount('<ui-card [square]="true"></ui-card>', {
      imports: [CardComponent],
    });

    cy.get('[data-slot="card"]').should("not.have.class", "rounded-xl");
  });

  it("applies custom className", () => {
    cy.mount('<ui-card className="custom-class"></ui-card>', {
      imports: [CardComponent],
    });

    cy.get('[data-slot="card"]').should("have.class", "custom-class");
  });
});

describe("CardHeader Component", () => {
  it("renders title and subheader", () => {
    cy.mount(
      `
      <ui-card>
        <ui-card-header title="Test Title" subheader="Test Subheader"></ui-card-header>
      </ui-card>
    `,
      {
        imports: [CardComponent, CardHeaderComponent],
      },
    );

    cy.get('[data-slot="card-title"]').should("contain.text", "Test Title");
    cy.get('[data-slot="card-subheader"]').should(
      "contain.text",
      "Test Subheader",
    );
  });

  it("renders avatar and action", () => {
    cy.mount(
      `
      <ui-card>
        <ui-card-header>
          <div slot="avatar" data-testid="avatar">A</div>
          <button slot="action" data-testid="action">Action</button>
        </ui-card-header>
      </ui-card>
    `,
      {
        imports: [CardComponent, CardHeaderComponent],
      },
    );

    cy.get('[data-slot="card-avatar"]').should("exist");
    cy.get('[data-testid="avatar"]').should("contain.text", "A");
    cy.get('[data-slot="card-action"]').should("exist");
    cy.get('[data-testid="action"]').should("contain.text", "Action");
  });
});

describe("CardContent Component", () => {
  it("renders content with proper padding", () => {
    cy.mount(
      `
      <ui-card>
        <ui-card-content>Content text</ui-card-content>
      </ui-card>
    `,
      {
        imports: [CardComponent, CardContentComponent],
      },
    );

    cy.get('[data-slot="card-content"]')
      .should("contain.text", "Content text")
      .should("have.class", "px-6");
  });
});

describe("CardActions Component", () => {
  it("renders actions with default alignment", () => {
    cy.mount(
      `
      <ui-card>
        <ui-card-actions>
          <button>Save</button>
          <button>Cancel</button>
        </ui-card-actions>
      </ui-card>
    `,
      {
        imports: [CardComponent, CardActionsComponent],
      },
    );

    cy.get('[data-slot="card-actions"]')
      .should("have.class", "justify-start")
      .should("contain.text", "Save")
      .should("contain.text", "Cancel");
  });

  it("renders with different alignments", () => {
    cy.mount(
      `
      <ui-card>
        <ui-card-actions alignment="end">
          <button>Action</button>
        </ui-card-actions>
      </ui-card>
    `,
      {
        imports: [CardComponent, CardActionsComponent],
      },
    );

    cy.get('[data-slot="card-actions"]').should("have.class", "justify-end");
  });

  it("renders with different spacing", () => {
    cy.mount(
      `
      <ui-card>
        <ui-card-actions spacing="comfortable">
          <button>Action</button>
        </ui-card-actions>
      </ui-card>
    `,
      {
        imports: [CardComponent, CardActionsComponent],
      },
    );

    cy.get('[data-slot="card-actions"]').should("have.class", "gap-4");
  });
});

describe("CardMedia Component", () => {
  it("renders image with src", () => {
    cy.mount(
      `
      <ui-card>
        <ui-card-media src="test-image.jpg" alt="Test image"></ui-card-media>
      </ui-card>
    `,
      {
        imports: [CardComponent, CardMediaComponent],
      },
    );

    cy.get('[data-slot="card-media"] img')
      .should("have.attr", "src", "test-image.jpg")
      .should("have.attr", "alt", "Test image");
  });

  it("renders placeholder when no src provided", () => {
    cy.mount(
      `
      <ui-card>
        <ui-card-media></ui-card-media>
      </ui-card>
    `,
      {
        imports: [CardComponent, CardMediaComponent],
      },
    );

    cy.get('[data-slot="card-media"] svg').should("exist");
  });

  it("applies aspect ratio classes", () => {
    cy.mount(
      `
      <ui-card>
        <ui-card-media aspectRatio="1/1"></ui-card-media>
      </ui-card>
    `,
      {
        imports: [CardComponent, CardMediaComponent],
      },
    );

    cy.get('[data-slot="card-media"]').should("have.class", "aspect-square");
  });
});

describe("CardActionArea Component", () => {
  it("handles click events", () => {
    const onCardClick = cy.stub().as("onCardClick");

    cy.mount(
      `
      <ui-card>
        <ui-card-action-area (cardClick)="onCardClick($event)">
          <ui-card-content>Clickable content</ui-card-content>
        </ui-card-action-area>
      </ui-card>
    `,
      {
        imports: [CardComponent, CardActionAreaComponent, CardContentComponent],
        componentProperties: {
          onCardClick,
        },
      },
    );

    cy.get('[data-slot="card-action-area"]').click();
    cy.get("@onCardClick").should("have.been.called");
  });

  it("handles keyboard events", () => {
    const onCardClick = cy.stub().as("onCardClick");

    cy.mount(
      `
      <ui-card>
        <ui-card-action-area (cardClick)="onCardClick($event)">
          <ui-card-content>Clickable content</ui-card-content>
        </ui-card-action-area>
      </ui-card>
    `,
      {
        imports: [CardComponent, CardActionAreaComponent, CardContentComponent],
        componentProperties: {
          onCardClick,
        },
      },
    );

    cy.get('[data-slot="card-action-area"]').focus().type("{enter}");
    cy.get("@onCardClick").should("have.been.called");
  });

  it("renders as disabled", () => {
    cy.mount(
      `
      <ui-card>
        <ui-card-action-area [disabled]="true">
          <ui-card-content>Disabled content</ui-card-content>
        </ui-card-action-area>
      </ui-card>
    `,
      {
        imports: [CardComponent, CardActionAreaComponent, CardContentComponent],
      },
    );

    cy.get('[data-slot="card-action-area"]')
      .should("have.class", "opacity-50")
      .should("have.class", "pointer-events-none");
  });

  it("does not emit events when disabled", () => {
    const onCardClick = cy.stub().as("onCardClick");

    cy.mount(
      `
      <ui-card>
        <ui-card-action-area [disabled]="true" (cardClick)="onCardClick($event)">
          <ui-card-content>Disabled content</ui-card-content>
        </ui-card-action-area>
      </ui-card>
    `,
      {
        imports: [CardComponent, CardActionAreaComponent, CardContentComponent],
        componentProperties: {
          onCardClick,
        },
      },
    );

    cy.get('[data-slot="card-action-area"]').click();
    cy.get("@onCardClick").should("not.have.been.called");
  });
});

describe("Card Integration", () => {
  it("renders complex card with all components", () => {
    cy.mount(
      `
      <ui-card className="w-96">
        <ui-card-header title="Complex Card" subheader="With all components">
          <div slot="avatar">A</div>
          <button slot="action">View</button>
        </ui-card-header>
        
        <ui-card-media src="test-image.jpg" alt="Test"></ui-card-media>
        
        <ui-card-content>
          <p>This is content</p>
        </ui-card-content>
        
        <ui-card-actions>
          <button>Save</button>
          <button>Cancel</button>
        </ui-card-actions>
      </ui-card>
    `,
      {
        imports: [
          CardComponent,
          CardHeaderComponent,
          CardMediaComponent,
          CardContentComponent,
          CardActionsComponent,
        ],
      },
    );

    cy.get('[data-slot="card"]').should("exist");
    cy.get('[data-slot="card-header"]').should("exist");
    cy.get('[data-slot="card-media"]').should("exist");
    cy.get('[data-slot="card-content"]').should("exist");
    cy.get('[data-slot="card-actions"]').should("exist");
  });

  it("handles complex interaction flow", () => {
    const onCardClick = cy.stub().as("onCardClick");

    cy.mount(
      `
      <ui-card className="w-96">
        <ui-card-action-area (cardClick)="onCardClick($event)">
          <ui-card-header title="Interactive Card"></ui-card-header>
          <ui-card-content>
            <p>Click me!</p>
          </ui-card-content>
        </ui-card-action-area>
        
        <ui-card-actions>
          <button data-testid="save-btn">Save</button>
          <button data-testid="cancel-btn">Cancel</button>
        </ui-card-actions>
      </ui-card>
    `,
      {
        imports: [
          CardComponent,
          CardHeaderComponent,
          CardContentComponent,
          CardActionsComponent,
          CardActionAreaComponent,
        ],
        componentProperties: {
          onCardClick,
        },
      },
    );

    // Test card click
    cy.get('[data-slot="card-action-area"]').click();
    cy.get("@onCardClick").should("have.been.called");

    // Test that action buttons are separate from card click area
    cy.get('[data-testid="save-btn"]').should("exist").and("be.visible");
    cy.get('[data-testid="cancel-btn"]').should("exist").and("be.visible");
  });
});
