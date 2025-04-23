# Contributing to Angular-XUI

This document outlines our branching strategy, development workflow, and release process.

## Branching Strategy

We follow a modified GitFlow workflow:

- `main` - Production-ready code. Feature and bug fix branches are merged to the development branch first.
- `development` - Main development branch. All feature branches merge here.
- `feature/*` - New features or enhancements (e.g., `feature/button-component`)
- `fix/*` - Bug fixes (e.g., `fix/button-focus-issue`)
- `hotfix/*` - Emergency fixes for production (e.g., `hotfix/critical-bug`)

## Development Workflow

1. **Start from development**:

   ```bash
   git checkout development
   git pull origin development
   git checkout -b feature/your-feature-name
   # or git checkout -b fix/your-bug-fix
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

4. **Commit your changes** (following conventional commits):

   ```bash
   git add .
   git commit -m "feat: add new button variant"
   # or "fix:", "docs:", "chore:", "refactor:", etc.
   ```

5. **Push your branch and open a PR to development**:
   ```bash
   git push -u origin feature/your-feature-name
   ```
   - Create a PR targeting the `development` branch
   - Ensure CI checks pass
   - Get code review approval

## Release Process

When ready to release:

1. **Create a PR from development to main**:

   ```bash
   # No need to create a separate release branch anymore
   # Simply create a PR from development to main
   ```

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
   git checkout -b hotfix/critical-issue
   ```

2. **Make your fix and create a changeset**

3. **Push your branch and open a PR directly to main**:

   ```bash
   git push -u origin hotfix/critical-issue
   ```

4. **Review and merge the PR**:

   - Once approved, merge to main
   - The GitHub Actions workflow will:
     - Version the package based on the changeset
     - Build and publish the hotfix to npm
     - Create a GitHub release

5. **Sync back to development**:
   ```bash
   git checkout development
   git pull origin development
   git merge origin/main
   git push origin development
   ```

## Pre-release Process

For beta/alpha versions:

1. **Set pre-release status on development**:

   ```bash
   git checkout development
   pnpm changeset pre enter beta
   git add .changeset/
   git commit -m "chore: enter pre-release mode (beta)"
   git push origin development
   ```

2. **Create and commit changesets as normal on feature branches**

3. **When ready to publish a pre-release version**:

   - Merge feature branches to development as usual
   - Create a PR from development to main
   - When merged, the pre-release will be published with the beta tag

4. **When ready to exit pre-release mode**:
   ```bash
   git checkout development
   pnpm changeset pre exit
   git add .changeset/
   git commit -m "chore: exit pre-release mode"
   git push origin development
   ```
   - Create a PR from development to main
   - When merged, the stable version will be published

## Documentation

Please update documentation when:

- Adding new components
- Changing component APIs
- Adding new features
- Fixing bugs that affect user behavior

## Testing

- Write tests for new features and bug fixes
- Run tests locally before submitting a PR:
  ```bash
  pnpm test
  ```
