import { render, act } from "@testing-library/react";
import { Icon } from "./Icon";

test("renders Icon with valid params", async () => {
  const tree = await act(async () => {
    render(<Icon src="DashboardIcon" />);
  });
  expect(tree).toMatchSnapshot();
});

test("renders Icon with invalid params", async () => {
  const tree = await act(async () => {
    render(<Icon src="NotExistsIcon" />);
  });
  expect(tree).toMatchSnapshot();
});
