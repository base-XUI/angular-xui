# Branch Protection Settings

This document outlines the recommended branch protection rules for this repository to ensure code quality and maintain a proper GitFlow process.

## Required Branch Protection Rules

### `main` branch

- ✅ Require a pull request before merging
  - ✅ Require approvals (at least 1)
  - ✅ Dismiss stale pull request approvals when new commits are pushed
  - ✅ Require review from Code Owners
- ✅ Require status checks to pass before merging

  - ✅ Require branches to be up to date before merging
  - Required status checks:
    - `validate` (lint and type checking)
    - `test` (unit and integration tests)
    - `build` (package build verification)

- ✅ Require conversation resolution before merging

- ✅ Do not allow bypassing the above settings

- ✅ Restrict who can push to matching branches
  - Only allow repository administrators to push directly to `main`

### `development` branch

- ✅ Require a pull request before merging
  - ✅ Require approvals (at least 1)
- ✅ Require status checks to pass before merging

  - ✅ Require branches to be up to date before merging
  - Required status checks:
    - `validate` (lint and type checking)
    - `test` (unit and integration tests)

- ✅ Require conversation resolution before merging

## Setting Up Branch Protection in GitHub

1. Go to your repository on GitHub
2. Navigate to Settings > Branches
3. Click "Add rule" under "Branch protection rules"
4. Enter the branch name pattern (`main` or `development`)
5. Configure the settings as outlined above
6. Click "Create" or "Save changes"

## Additional Settings

### CodeOwners File

Create a `.github/CODEOWNERS` file to automatically request reviews from the right team members:

```
# These owners will be the default owners for everything in the repo
* @org/core-team

# UI Component owners
/lib/src/components/ @org/ui-team

# Documentation owners
/lib/docs/ @org/docs-team
```

### Required Status Checks

Ensure that your CI workflow includes these specific job names that match the required status checks:

- `validate`
- `test`
- `build`

These are already configured in the CI workflow file.
