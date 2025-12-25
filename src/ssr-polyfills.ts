/**
 * SSR Polyfills - Browser API mocks for server-side rendering.
 * Must be imported before any browser-dependent code.
 */

const mockLocation = {
  origin: "http://localhost:4000",
  href: "http://localhost:4000",
  protocol: "https:",
  host: "localhost",
  hostname: "localhost",
  port: "",
  pathname: "/",
  search: "",
  hash: "",
  assign: () => {},
  replace: () => {},
  reload: () => {},
};

const mockNavigator = {
  userAgent: "node",
  language: "en",
  languages: ["en"],
  onLine: true,
  cookieEnabled: true,
};

const mockDocument = {
  createElement: () => ({
    style: {},
    setAttribute: () => {},
    appendChild: () => {},
  }),
  querySelector: () => null,
  querySelectorAll: () => [],
  getElementById: () => null,
  body: { appendChild: () => {}, removeChild: () => {} },
  head: { appendChild: () => {}, removeChild: () => {} },
  cookie: "",
  addEventListener: () => {},
  removeEventListener: () => {},
};

const mockStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
  length: 0,
  key: () => null,
};

const mockWindow = {
  location: mockLocation,
  navigator: mockNavigator,
  document: mockDocument,
  localStorage: mockStorage,
  sessionStorage: mockStorage,
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => true,
  crypto: {
    getRandomValues: (arr: Uint8Array) => {
      for (let i = 0; i < arr.length; i++)
        arr[i] = Math.floor(Math.random() * 256);
      return arr;
    },
    subtle: {},
  },
  setTimeout: globalThis.setTimeout,
  clearTimeout: globalThis.clearTimeout,
  setInterval: globalThis.setInterval,
  clearInterval: globalThis.clearInterval,
};

// Set globals for SSR
if (typeof globalThis.window === "undefined") {
  const defineGlobal = (name: string, value: any) => {
    try {
      Object.defineProperty(globalThis, name, {
        value,
        writable: true,
        configurable: true,
      });
    } catch {
      // Property might not be configurable
    }
  };

  defineGlobal("window", mockWindow);
  defineGlobal("location", mockLocation);
  defineGlobal("document", mockDocument);
  defineGlobal("localStorage", mockStorage);
  defineGlobal("sessionStorage", mockStorage);

  try {
    Object.defineProperty(globalThis, "navigator", {
      value: mockNavigator,
      writable: true,
      configurable: true,
    });
  } catch {
    // Navigator already exists in Node.js 21+
  }
}

export {};
