import type { Meta, StoryObj } from "@storybook/angular";
import { CardComponent } from "./card";
import { CardHeaderComponent } from "./card-header";
import { CardContentComponent } from "./card-content";
import { CardMediaComponent } from "./card-media";
import { CardActionsComponent } from "./card-actions";
import { CardActionAreaComponent } from "./card-action-area";
import { ButtonComponent } from "../../inputs/button/button.component";
import { moduleMetadata } from "@storybook/angular";
import { NgClass, NgStyle } from "@angular/common";

const meta: Meta<CardComponent> = {
  title: "Surfaces/Card",
  component: CardComponent,
  decorators: [
    moduleMetadata({
      imports: [
        NgStyle,
        NgClass,
        CardComponent,
        CardHeaderComponent,
        CardContentComponent,
        CardMediaComponent,
        CardActionsComponent,
        CardActionAreaComponent,
        ButtonComponent,
      ],
    }),
  ],
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible, reusable card component with composable sub-components",
      },
    },
    controls: {
      expanded: true,
    },
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["outlined", "filled"],
      description: "Visual style variant of the card",
    },
    square: {
      control: "boolean",
      description: "When true, removes rounded corners",
    },
    component: {
      control: { type: "select" },
      options: ["div", "article", "section", "aside"],
      description: "The HTML element to render",
    },
  },
};

export default meta;
type Story = StoryObj<CardComponent>;

export const Basic: Story = {
  render: (args) => ({
    props: args,
    template: `
      <xui-card [variant]="variant" [square]="square" class="w-96">
        <xui-card-header title="Basic Card Title" subheader="Card Subheader" [avatar]="avatarTemplate" />
        <xui-card-content>
          <p>This card demonstrates all available sections working together.</p>
          <p class="mt-2 text-sm text-gray-600">
            Header with title and action, content area, and footer with buttons.
          </p>
        </xui-card-content>
        <xui-card-actions>
          <xui-button>Save</xui-button>
          <xui-button variant="outlined">Cancel</xui-button>
        </xui-card-actions>
      </xui-card>
      <ng-template #avatarTemplate>
        <div class='w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center'>A</div>
      </ng-template>
    `,
  }),
};

export const OutlinedCard: Story = {
  render: () => ({
    template: `
      <xui-card variant="outlined" class="w-96">
        <xui-card-header title="Card Title" subheader="Card Subheader" />
        <xui-card-content>
          <p>This is an example of outlined card.</p>
        </xui-card-content>
        <xui-card-actions>
          <xui-button>Edit</xui-button>
          <xui-button variant="outlined">Cancel</xui-button>
        </xui-card-actions>
      </xui-card>
    `,
  }),
};

export const ComplexInteraction: Story = {
  render: () => ({
    template: `
      <xui-card class="w-96">
        <xui-card-header
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
          [avatar]="avatarTemplate"
          [action]="viewAction"
        >
          <ng-template #avatarTemplate>
            <div class='w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center'>A</div>
          </ng-template>
          <ng-template #viewAction>
            <xui-button variant="text">View</xui-button>
          </ng-template>
        </xui-card-header>
        
        <xui-card-media
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop"
          alt="Mountain landscape"
          aspectRatio="16/9"
        ></xui-card-media>
        
        <xui-card-content>
          <p class="text-muted-foreground leading-5">
            This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the
            mussels, if you like.
          </p>
        </xui-card-content>
        
        <xui-card-actions>
          <xui-button>Save</xui-button>
          <xui-button variant="outlined">Cancel</xui-button>
        </xui-card-actions>
      </xui-card>
      
    `,
  }),
};

export const Media: Story = {
  render: () => ({
    template: `
      <xui-card class="w-96">
        <xui-card-media
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop"
          alt="Mountain landscape"
          aspectRatio="16/9"
        ></xui-card-media>
        
        <xui-card-content>
          <h5 class="mb-2">Lizard</h5>
          <p class="text-muted-foreground leading-5">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </p>
        </xui-card-content>
        
        <xui-card-actions class="flex gap-2">
          <xui-button variant="text">Share</xui-button>
          <xui-button variant="text">Learn More</xui-button>
        </xui-card-actions>
      </xui-card>
    `,
  }),
};

export const PrimaryAction: Story = {
  render: () => ({
    props: {
      handleCardClick: () => console.log("Hello World"),
    },
    template: `
      <xui-card class="w-96">
        <xui-card-action-area (clicked)="handleCardClick()">
          <xui-card-media
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop"
            alt="Beautiful landscape"
            aspectRatio="16/9"
          ></xui-card-media>
          <xui-card-header
            title="Beautiful Landscape"
            subheader="Nature Photography"
          ></xui-card-header>
          <xui-card-content>
            <p>Click anywhere to log "Hello World" in console.</p>
          </xui-card-content>
        </xui-card-action-area>
      </xui-card>
    `,
  }),
};

export const ActiveStateStyle: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
        <xui-card *ngFor="let card of cards; let i = index">
          <xui-card-action-area
            (clicked)="selectedCard = i"
            [class.bg-muted]="selectedCard === i"
            class="h-full"
          >
            <xui-card-content>
              <h5>{{card.title}}</h5>
              <p>{{card.description}}</p>
            </xui-card-content>
          </xui-card-action-area>
        </xui-card>
      </div>
    `,
    props: {
      cards: [
        {
          id: 1,
          title: "Plants",
          description: "Plants are essential for all life.",
        },
        {
          id: 2,
          title: "Animals",
          description: "Animals are a part of nature.",
        },
        {
          id: 3,
          title: "Humans",
          description: "Humans depend on plants and animals for survival.",
        },
      ],
      selectedCard: 0,
    },
  }),
  parameters: {
    docs: {
      source: {
        code: `
const cards = [
  { title: "Plants", description: "Plants are essential for all life." },
  { title: "Animals", description: "Animals are a part of nature." },
  { title: "Humans", description: "Humans depend on plants and animals for survival." },
];

function ActiveCard() {
  const [selectedCard, setSelectedCard] = useState(0);
  
  return (
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
      {cards.map((card, index) => (
        <xui-card>
          <xui-card-action-area
            (clicked)="setSelectedCard(index)"
            [class.bg-muted]="selectedCard === index"
            class="h-full"
          >
            <xui-card-content>
              <h5>{{card.title}}</h5>
              <p>{{card.description}}</p>
            </xui-card-content>
          </xui-card-action-area>
        </xui-card>
      ))}
    </div>
  );
}`,
      },
    },
  },
};
