# Working in a Team

- `git switch --create` (or just `-c`) to create a new branch to work on
  - like `svn copy` but git only creates a reference the the latest commit instead of actually coping all the files in the repository

- `git switch` to switch to existing branch
  - like `svn switch`

- `git merge` to merge a specified branch into the current one
  - like `svn merge`
  - here conflicts can occur that need to be resolved

- `git rebase` to rebase the current branch to the specified one