import { render, act } from "@testing-library/react";
import { Header } from "./Header";

test("renders Header with valid params on mobile devices", async () => {
  Object.defineProperty(window.navigator, "userAgent", {
    value: "Android",
    writable: true,
  });

  const tree = await act(async () => {
    render(<Header />);
  });
  expect(tree).toMatchSnapshot();
});

test("renders Header with valid params on desktop devices", async () => {
  Object.defineProperty(window.navigator, "userAgent", {
    value: "Chrome",
    writable: true,
  });

  const tree = await act(async () => {
    render(<Header />);
  });
  expect(tree).toMatchSnapshot();
});
