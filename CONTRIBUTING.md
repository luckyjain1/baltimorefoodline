## Branches
- main: production, protected
- dev: staging, protected
- Work on short-lived branches: feat/*, fix/*, chore/*

## How to contribute
1) Branch from `dev`: git checkout dev && git pull && git checkout -b feat/<name>
2) Write code + tests; run `make test` (or `npm test`) and `make lint`.
3) Open a PR into `dev`. Fill the PR template. Link an issue.
4) After merge to `dev`, verify staging. Releases are cut via PR from `dev`→`main`.

## Reviews
- At least 1 approval.
- No self-merges. Address all comments or mark “resolved” with a note.
