# gitignore

- file that lists all files that git should not track

## syntax

- one line per pattern
- simplest pattern is just the file name
  - `foo` ignores all files and directories named `foo`
  - `foo/` only ignores all directories named `foo`
- can use wildcards
  - `*.jpg` will ignore all files with the `jpg` extension
  - `bar/foo` will ignore all files/directories called `foo` directly in a `bar` directory, but
  `bar/**/foo` will ignore all files/directory called `foo` somewhere in `bar` directory regardless of depth
- \# are comments and will be ignored
- ! will negate the pattern and re-add ignored files
    - `bar/*` followed by `!bar/foo` will ignore all files/directories inside the `bar` directory expect `foo`
