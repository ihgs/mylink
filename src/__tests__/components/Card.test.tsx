import { render } from "@testing-library/react";
import Card from "../../components/Card";
test("[snapshot]Card", () => {
  const view = render(
    <Card title="test">
      <>
        <ul>
          <li>one</li>
          <li>two</li>
        </ul>
      </>
    </Card>
  );
  expect(view.container).toMatchSnapshot();
});
