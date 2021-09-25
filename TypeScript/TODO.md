# TODO

- Project Setup

  - [x] Ensure that all packages are up to date
  - [x] Add .nvmrc file for node.js version
  - [x] Setup Typescript correctly
  - [x] Setup Editorconfig
  - [x] Setup debugging with VSCode
  - [x] Setup eslint + fix errors and warnings

- [x] Read requirements
- [ ] Write test for all requirements
- [ ] Refactor + cleanup existing code (improve item model, prevent checks on labels)
- [ ] Identify missing features / bugs
- [ ] Define architecture / patterns to use

- Implementation of missing features (TDD)
  - [ ] Feature A
  - [ ] Feature B

Bonus:

- [ ] Enable strictNullChecks TS option again
- [ ] Setup CI to run tests automatically on push

## Architecture ideas

For updating the price an option is to use a common interface. This interface is then implemented by different classes.
A decorator could be used to define when the class should be used, a factory could then use the decorator to pick the right implementation.
