# Contributing

This is not meant to be some crazy fancy contributing document, but
rather just some high level points to make sure we are on the same page.
If this document warrants more detail, then go nuts.

## Pull Requests (PRs)

This section encompasses all things related to PRs.

### Pull Request Guidelines

Here are a list of things to keep in mind when providing a PR:

- Try to keep the PR within a single feature or chunk of work
- Try to limit the size of the PR to no more than [200 lines](https://twitter.com/iamdevloper/status/397664295875805184)
  of actual code

### Submitting a Pull Request

Upon submitting a PR, make sure the following has been
addressed:

- Provide the motivation for the work being submitted
- Provide a high level understanding of what the code is doing

If applicable:

- If it exists reference any relevant issues(s)
- Provide details of future/remaining work
- Provide any TODOs or thing that weren't completed and the reasons

## Styleguides

Most things here will/should be automated by tooling, but it'll be
listed here for clarity.

### Git commits

To keep things simple, make sure commit messages are meaningful and
provide what was done and the reason for it. So something like:

> create a click event on the zoomed image to close the modal so that
  the user has more options to close the modal

It doesn't have to be that specific or use the imperative style, just
try to avoid commit messages that say "asdf".

### JavaScript

Keep in mind the following:

- Use [Airbnb's JavaScript style guide](https://github.com/airbnb/javascript)
  (will be automated with eslint in the future)
- Make sure all tests pass prior to submitting a PR
- When Adding/Updating JS, make sure to add/update any tests
- When removing JS, make sure to remove any dead unit tests

## Code of Conduct

Do unto others.