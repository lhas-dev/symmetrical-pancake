import { render, act } from "@testing-library/react";
import { useDevice } from "./useDevice";

test("return SSR device", async () => {
  Object.defineProperty(window, "navigator", {
    value: undefined,
    writable: true,
  });

  const device = useDevice();
  expect(device.isSSR()).toBeTruthy();
});

test("return desktop device", async () => {
  Object.defineProperty(window, "navigator", {
    value: {
      userAgent: "Chrome",
    },
    writable: true,
  });

  const device = useDevice();
  expect(device.isDesktop()).toBeTruthy();
});
