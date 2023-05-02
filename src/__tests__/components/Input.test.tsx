import { render, screen } from "@testing-library/react";
import Input from "../../components/Input";
import userEvent from "@testing-library/user-event";

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

test("Input value", async () => {
  let target = undefined;
  render(
    <Input
      name="test"
      value=""
      placeholder=""
      setValue={(value) => {
        target = value;
      }}
    ></Input>
  );
  const input = await screen.getByRole("textbox");
  await userEvent.type(input, "hoge");
  expect(target).toBe("hoge");
});
