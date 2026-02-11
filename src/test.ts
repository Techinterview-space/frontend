// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import "zone.js/testing";

declare const require: {
  context(
    path: string,
    deep?: boolean,
    filter?: RegExp,
  ): {
    <T>(id: string): T;
    keys(): string[];
  };
};

beforeAll(() => {
  window.onbeforeunload = () => "Oh no!";
});

beforeEach(async () => {
  window.onbeforeunload = () => "Oh no!"; // Prevent page reloads during tests
});

window.onbeforeunload = jasmine.createSpy();

// Then we find all the tests.
const context = require.context("./", true, /\.spec\.ts$/);

// And load the modules.
context.keys().map(context);
