import { ChangeEvent } from "react";

const Input = ({
  name,
  type = "text",
  value,
  placeholder,
  required = false,
  setValue,
  className = "",
}: {
  name: string;
  type?: string;
  value: string;
  placeholder: string;
  required?: boolean;
  setValue: any;
  className?: string;
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
      className={`input input-bordered ${className}`}
      placeholder={placeholder}
      required={required}
    ></input>
  );
};

export default Input;
