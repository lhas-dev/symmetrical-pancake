import { render, act } from "@testing-library/react";
import { Avatar } from "./Avatar";

test("renders Avatar with valid params on mobile devices", async () => {
  Object.defineProperty(window.navigator, "userAgent", {
    value: "Android",
    writable: true,
  });

  const tree = await act(async () => {
    render(
      <Avatar src="https://picsum.photos/200" name="John Doe" hasNotification />
    );
  });
  expect(tree).toMatchSnapshot();
});

test("renders Avatar with valid params on desktop devices", async () => {
  Object.defineProperty(window.navigator, "userAgent", {
    value: "Chrome",
    writable: true,
  });

  const tree = await act(async () => {
    render(
      <Avatar src="https://picsum.photos/200" name="John Doe" hasNotification />
    );
  });
  expect(tree).toMatchSnapshot();
});
