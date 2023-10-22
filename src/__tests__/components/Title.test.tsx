import { render, screen } from "@testing-library/react";
import Title from "../../components/Title";

test("[snapshot]Title", () => {
  const view = render(<Title title="testtittle" />);
  expect(view.container).toMatchSnapshot();
});
