import { render } from "@testing-library/react";
import Input from "../../components/Input";

test("[snapshot]Input", () => {
  const view = render(
    <Input
      name="test"
      value=""
      placeholder=""
      setValue={(value) => {
        console.log(value);
      }}
    ></Input>
  );
  expect(view.container).toMatchSnapshot();
});
