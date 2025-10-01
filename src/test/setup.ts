import "@testing-library/jest-dom";

// Configuration globale des tests

import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Nettoyer le DOM après chaque test
afterEach(() => {
  cleanup();
});
