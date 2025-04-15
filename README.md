# Angular XUI

Angular XUI is a comprehensive UI component library for Angular applications, providing a set of reusable, accessible, and customizable components.

## Features

- 🎨 Modern and customizable UI components
- 📱 Responsive design
- ♿ Accessibility support
- 🧩 Component-based architecture
- 🎭 Storybook integration for component documentation
- 🧪 Comprehensive testing setup

## Available Components

- **Button**: Versatile button component with multiple variants
- **Card**: Flexible card component for content display
- **Grid Layout**: Responsive grid system
- **Navbar**: Navigation bar component
- **Sidemenu**: Side navigation menu
- **Tooltip**: Information tooltip component
- **Typography**: Text styling components

## Getting Started

### Installation

```bash
npm install @base-xui/angular-xui
```

### Usage

Import the components you need in your Angular module:

```typescript
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AngularXuiModule } from "@base-xui/angular-xui";

@NgModule({
  imports: [BrowserModule, AngularXuiModule],
  // ...
})
export class AppModule {}
```

Then use the components in your templates:

```html
<xui-button variant="primary">Click me</xui-button>
<xui-card>
  <xui-card-header>Card Title</xui-card-header>
  <xui-card-content>Card content goes here</xui-card-content>
</xui-card>
```

### Button Examples

Here are some examples of how to use the Button component:

```html
<!-- Primary Button -->
<xui-button variant="primary">Primary Button</xui-button>

<!-- Secondary Button -->
<xui-button variant="secondary">Secondary Button</xui-button>

<!-- Success Button -->
<xui-button variant="success">Success Button</xui-button>

<!-- Danger Button -->
<xui-button variant="danger">Danger Button</xui-button>

<!-- Warning Button -->
<xui-button variant="warning">Warning Button</xui-button>

<!-- Info Button -->
<xui-button variant="info">Info Button</xui-button>

<!-- Light Button -->
<xui-button variant="light">Light Button</xui-button>

<!-- Dark Button -->
<xui-button variant="dark">Dark Button</xui-button>

<!-- Link Button -->
<xui-button variant="link">Link Button</xui-button>

<!-- Disabled Button -->
<xui-button variant="primary" [disabled]="true">Disabled Button</xui-button>

<!-- Button with Icon -->
<xui-button variant="primary"> <i class="fas fa-plus"></i> Add Item </xui-button>

<!-- Button with Loading State -->
<xui-button variant="primary" [loading]="true">Loading...</xui-button>

<!-- Button with Custom Size -->
<xui-button variant="primary" size="small">Small Button</xui-button>
<xui-button variant="primary" size="medium">Medium Button</xui-button>
<xui-button variant="primary" size="large">Large Button</xui-button>
```

## Development

### Prerequisites

- Node.js 18.19.1 or higher
- npm 10.2.4 or higher
- Angular CLI 19.1.6 or higher

### Setup

1. Clone the repository:

```bash
git clone https://github.com/base-XUI/angular-xui.git
cd angular-xui
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. View Storybook documentation:

```bash
npm run storybook
```

## Building

To build the library:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Testing

### Unit Tests

```bash
npm test
```

### E2E Tests

```bash
npm run e2e
```

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Additional Resources

- [Angular Documentation](https://angular.io/docs)
- [Storybook Documentation](https://storybook.js.org/docs/angular/get-started/introduction)
- [Component Documentation](https://base-xui.github.io/angular-xui)
