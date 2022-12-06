# Implementing Git Workflows using Pull Requests

## Gitflow

- like feature branching, but development centers around a special branch called `dev` or `develop`

- whenever a new release is desired the `develop` branch is merged into the main branch.

- often code in the feature branches will be tested less thoroughly, because it will have a test period in the `develop` branch

- we still try to make every commit in `develop` theoretically deployable

- cannot push to neither `develop` nor main directly