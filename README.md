# Angular XUI

Angular XUI is a comprehensive UI component library for Angular applications, providing a set of reusable, accessible, and customizable components.

## Getting Started

### Installation

```bash
npm install @base-xui/angular-xui
# or
yarn add @base-xui/angular-xui
# or
pnpm add @base-xui/angular-xui
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
- pnpm 10.2.4 or higher
- Angular CLI 19.1.6 or higher

### Setup

1. Clone the repository:

```bash
git clone https://github.com/base-XUI/angular-xui.git
cd angular-xui
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm start
```

4. View Storybook documentation:

```bash
pnpm run storybook
```

## Building

To build the library:

```bash
pnpm run build
```

The build artifacts will be stored in the `dist/` directory.

### Testing Locally with yalc

For testing the package in another local project without publishing to npm:

1. Install yalc globally (if not already installed):

   ```bash
   npm install -g yalc
   # or
   pnpm install -g yalc
   ```

2. When you make changes to the library:

   ```bash
   # In angular-xui directory
   pnpm build:package
   yalc push
   ```

   Or use watch mode for continuous updates:

   ```bash
   pnpm build:package --watch
   ```

   And in another terminal:

   ```bash
   yalc push --watch
   ```

3. Link package to local angular app:

   ```bash
   # In your test app directory
   yalc add @base-xui/angular-xui
   pnpm install # or npm install
   ```

4. To remove the yalc link:

   ```bash
   # In your test app directory
   yalc remove @base-xui/angular-xui
   npm install # or pnpm install
   ```

### Available Scripts

- `pnpm storybook` - Start Storybook for component development
- `pnpm build:storybook` - Build Storybook for deployment
- `pnpm test:unit` - Run components test (unit test)
- `pnpm test:unit:ui` - Open Visualized components test interface
- `pnpm test:e2e` - Run end to end tests
- `pnpm test:e2e:ui` - Open Visualized e2e test interface
- `pnpm lint` - Lint code
- `pnpm format` - Format code

### Project Structure

- `src/app/` - Component source code
- `src/app/components/` - UI components

## Testing

### Unit Tests

```bash
pnpm test:unit
```

### E2E Tests

```bash
pnpm test:e2e
```

## Contributing

Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed information about our development workflow, branching strategy, and release process.

## License

[MIT License](./LICENSE)

## Additional Resources

- [Angular Documentation](https://angular.io/docs)
- [Storybook Documentation](https://storybook.js.org/docs/angular/get-started/introduction)
- [Component Documentation](https://base-xui.github.io/angular-xui)
