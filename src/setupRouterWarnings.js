// This file silences React Router future flag warnings during tests

// Save the original console.warn
const originalWarn = console.warn;

// Override console.warn to filter out React Router future flag warnings
console.warn = (...args) => {
  // Check if this is a React Router future flag warning
  if (
    args[0] &&
    typeof args[0] === "string" &&
    (args[0].includes("React Router Future Flag Warning") ||
      args[0].includes("v7_startTransition") ||
      args[0].includes("v7_relativeSplatPath"))
  ) {
    // Suppress these specific warnings
    return;
  }

  // Pass through any other warnings
  originalWarn(...args);
};
