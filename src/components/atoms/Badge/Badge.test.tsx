import { render } from "@testing-library/react";
import { Badge } from "./Badge";

test("renders Badge correctly", () => {
  const tree = render(<Badge />);
  expect(tree).toMatchSnapshot();
});
