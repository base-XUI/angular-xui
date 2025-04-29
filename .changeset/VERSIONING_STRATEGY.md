# Versioning Strategy for Angular XUI Library

This document outlines our versioning strategy following [Semantic Versioning](https://semver.org/) (SemVer) principles. The version format we follow is `MAJOR.MINOR.PATCH`.

## Version Types

### PATCH (0.0.x)

Patch versions include backward-compatible bug fixes or small improvements.

**Examples:**

- Fixing bugs
- Improving performance
- Updating documentation
- Refactoring internal code (with no API changes)
- Fixing accessibility issues
- Adjusting styles that don't impact component behavior

**When to use a patch changeset:**

```
---
"@base-xui/angular-xui": patch
---

Fixed Button focus state not showing in Firefox browsers
```

### MINOR (0.x.0)

Minor versions add new functionality in a backward-compatible manner.

**Examples:**

- Adding new components
- Adding new props to existing components
- Adding new variants to existing components
- Adding new helper functions/utilities
- Expanding component functionality without breaking changes
- Deprecating features (but not removing them yet)

**When to use a minor changeset:**

```
---
"@base-xui/angular-xui": minor
---

Added new `ghost` variant to Button component
```

### MAJOR (x.0.0)

Major versions contain **breaking changes** that require users to modify their existing code when upgrading.

**Examples:**

- Renaming component props or removing public props
- Changing the default behavior of a component
- Removing or renaming components/APIs
- Changing the return type/structure of component functions
- Major UI redesigns that affect component behavior
- Changes to the minimum supported Angular version

**When to use a major changeset:**

```
---
"@base-xui/angular-xui": major
---

Renamed the `variant` prop to `appearance` in Button component
```

## Decision Guidelines

When deciding which version to increment, ask yourself:

1. **Am I fixing a bug or making a small improvement?** → **PATCH**
2. **Am I adding new features/functionality?** Is everything backward compatible? → **MINOR**
3. **Is this a breaking change?** Will users need to update their code? → **MAJOR**

## Examples in Practice

### Patch Version Changes

- Fixing a styling issue where buttons had incorrect padding in Safari
- Improving the performance of a component
- Fixing keyboard navigation in a component

### Minor Version Changes

- Adding a new `<Dialog />` component
- Adding a `size="xl"` option to buttons that previously only had `sm`, `md`, and `lg`
- Adding a new helper function `useComponentState()`

### Major Version Changes

- Changing `<Button variant="primary" />` to require `<Button appearance="primary" />`
- Removing support for a deprecated component
- Changing the structure of component props to use a new pattern

Always aim to minimize breaking changes and communicate them clearly in changelogs and migration guides.
