# CI/CD

## simple CI/CD workflow

```yaml
name: QA
on: pull_request
jobs:
  qa:
    name: QA
    steps:
    - name: Checkout repository
      uses: actions/checkout@v1
    - name: Use node
      uses: actions/setup-node@v1
    - name: Install dependencies
      run: |
        npm install
    - name: Run tests
      run: |
        npm run test
```