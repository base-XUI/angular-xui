# Contributing to Angular-XUI

This document outlines our branching strategy, development workflow, and release process.

## Branching Strategy

We follow a modified GitFlow workflow:

- `main` - Production-ready code. Feature and bug fix branches are merged to the development branch first.
- `development` - Main development branch. All feature branches merge here.
- `XX/feature/*` - New features or enhancements, prefixed with owner's initials (e.g., `JD/feature/button-component` for John Doe)
- `XX/fix/*` - Bug fixes, prefixed with owner's initials (e.g., `JD/fix/button-focus-issue`)
- `XX/hotfix/*` - Emergency fixes for production, prefixed with owner's initials (e.g., `JD/hotfix/critical-bug`)

## Development Workflow

1. **Start from development**:

   ```bash
   git checkout development
   git pull origin development
   git checkout -b XX/feature/your-feature-name
   # or git checkout -b XX/fix/your-bug-fix
   ```

2. **Make your changes**: Write code, tests, and documentation

3. **Create a changeset** (for changes that should trigger a version change):

   ```bash
   pnpm changeset
   ```

   Follow the prompts to:

   - Select the package to be changed
   - Choose the appropriate semver change (patch/minor/major)
   - Write a detailed description of the changes

   Please see [VERSIONING_STRATEGY.md](./.changeset/VERSIONING_STRATEGY.md) for detailed information about our Versioning Strategy.

4. **Commit your changes** (following conventional commits):

   ```bash
   git add .
   git commit -m "feat: add new button variant"
   # or "fix:", "docs:", "chore:", "refactor:", etc.
   ```

5. **Push your branch and open a PR to development**:
   ```bash
   git push -u origin XX/feature/your-feature-name
   ```
   - Create a PR targeting the `development` branch
   - Ensure CI checks pass
   - Get code review approval

## Release Process

When ready to release:

1. **Create a PR from development to main**:

2. **Review and merge the PR**:

   - Once the PR is approved, merge it to main
   - The GitHub Actions workflow will:
     - Automatically version packages based on changesets
     - Update the CHANGELOG.md
     - Build and publish the package to npm
     - Create a GitHub release

3. **After the release**:
   - All versioning is handled automatically
   - The changesets are consumed and removed during the process

## Hotfix Process

For urgent production fixes:

1. **Create a hotfix branch from main**:

   ```bash
   git checkout main
   git pull origin main
   git checkout -b XX/hotfix/critical-issue
   ```

2. **Make your fix and create a changeset**

3. **Push your branch and open a PR directly to main**:

   ```bash
   git push -u origin XX/hotfix/critical-issue
   ```

4. **Review and merge the PR**:

   - Once approved, merge to main
   - The GitHub Actions workflow will:
     - Version the package based on the changeset
     - Build and publish the hotfix to npm
     - Create a GitHub release
