# Basic Workflows with Git

## getting updates from the remote

- `git pull` to get updates from the remote and apply them locally
  - equivalent to `svn update`
  - this step can lead to conflicts that must be resolved

- `git fetch` to fetch updates and display which branches updated on the remote with out actually updating your local files
  - this is again something this is not possible in svn since you don't have local repositories