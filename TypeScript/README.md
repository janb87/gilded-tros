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
- [x] Define architecture / patterns to use
- [x] Refactor + cleanup existing code (improve item model, prevent checks on labels)
- [ ] Implement and enable all tests

Bonus:

- [ ] Enable strictNullChecks TS option again
- [ ] Setup CI to run tests automatically on push

## Architecture

Decided to use following architecture:

- Split quality calculation logic per type, this way it is easy to add new calculations for new types in the future.
  An interface is used to define the contract. For common logic an abstract base class is used. Decorators are used to describe for which type a calculation class should be used.
- Use a factory pattern to get the correct instance for calculating the next Quality and Sell In values

## Ideas to improve the implementation

- Convert GildedTros to a singleton (requires discussion with the QA team as they are depending on the API)
- Write the tests directly on the `[updateQuality](./src/app/index.ts]` function (prevent side effects as the GildedTros app mutates the incoming items array)
- Create unit tests for `getProductType` function, this to ensure that the conversion is done correctly
- Create unit tests for each qualityCalculator implementation,
  the current tests whe have are ok but it might be hard to figur out at some point where it is failing if we add many more implementations of the qualityCalculator
- Add tests to see if exception handling of the [qualityCalculatorFactory](./src/app/quality-calculator/qualityCalculatorFactory.ts] is working as expected
- If we ever face performance issue offload the calculation logic to a worker thread, process the items in chunks (eg per 1000) so we can show progress
- Add logic to dynamically load all implementations from a directory instead of importing one by one
