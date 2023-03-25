import { ChangeEvent } from "react";

const Input = ({
  name,
  type = "text",
  value,
  placeholder,
  required = false,
  setValue,
}: {
  name: string;
  type?: string;
  value: string;
  placeholder: string;
  required?: boolean;
  setValue: any;
}) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="input input-bordered w-full my-1"
      placeholder={placeholder}
      required={required}
    ></input>
  );
};

export default Input;
