# Gilded Tros

## TODO list

- Project Setup

  - [x] Ensure that all packages are up to date
  - [x] Add .nvmrc file for node.js version
  - [x] Setup Typescript correctly
  - [x] Setup Editorconfig
  - [x] Setup debugging with VSCode
  - [x] Setup eslint + fix errors and warnings

- [x] Read requirements
- [x] Write test for all requirements
- [ ] Refactor + cleanup existing code (improve item model, prevent checks on labels)
- [ ] Identify missing features / bugs
- [ ] Define architecture / patterns to use

- Implementation of missing features (TDD)
  - [ ] Feature A
  - [ ] Feature B

Bonus:

- [ ] Enable strictNullChecks TS option again
- [ ] Setup CI to run tests automatically on push

## Architecture

Decided to use following architecture:

- Split quality calculation logic per type, this way it is easy to add new calculations for new types in the future.
  An interface is used to define the contract. For common logic an abstract base class is used. Decorators are used to describe for which type a calculation class should be used.
- Use a factory pattern to get the right instance for calculating the next Qaulity and Sell In values

## Ideas to improve the implementation

- Write the tests directly on the `[updateQuality](./src/app/index.ts]` function (prevent side effects as the GildedTros app mutates the incoming items array).
- Create unit tests for `getProductType` function, this to ensure that the conversion is done correctly
- Create unit tests for each qualityCalculator implementation
