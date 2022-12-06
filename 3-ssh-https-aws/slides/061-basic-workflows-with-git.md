# Basic Workflows with Git

## publish changes to the remote

- `git add` to initially let git now to track the file
  - equivalent to `svn add` in this case

- `git add` to stage changes for a commit
  - per default svn commits all changed files, although something like this can be achieved with `changelists`

- `git commit` for creating a new commit in your local repository
  - `svn commit` does a similar thing, but immediately pushes the changes to the server

- `git push` to publish the changes to the remote
  - is done by `svn commit` automatically