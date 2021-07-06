import { render, act } from "@testing-library/react";
import { Breadcrumb } from "./Breadcrumb";

test("renders Breadcrumb with valid params on mobile devices", async () => {
  Object.defineProperty(window.navigator, "userAgent", {
    value: "Android",
    writable: true,
  });

  const items = [
    {
      label: "Página",
    },
  ];

  const tree = await act(async () => {
    render(<Breadcrumb items={items} />);
  });
  expect(tree).toMatchSnapshot();
});

test("renders Breadcrumb with valid params on desktop devices", async () => {
  Object.defineProperty(window.navigator, "userAgent", {
    value: "Chrome",
    writable: true,
  });

  const items = [
    {
      label: "Página",
    },
  ];

  const tree = await act(async () => {
    render(<Breadcrumb items={items} />);
  });
  expect(tree).toMatchSnapshot();
});
