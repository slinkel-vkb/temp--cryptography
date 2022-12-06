# Branch Protection

- prevents developers from directly pushing into certain branches

- changes to a branch can only be archived by pull requests
  - this can be further restricted to:
    - require reviews
    - require successful CI/CD workflows
    - only be merged by an admin
    - ...

- combines really nicely with feature branching and the Gitflow
  - enforces them to a certain extend
  - discipline of the developers is still needed