import { useState } from "react";
import { number } from "zod";

const Select = ({
  labelHtmlForAndSelectId,
  label,
  options,
  defaultSelectedOption,
  numberStartsWith,
  value,
  setFormData,
}) => {
  console.log({ defaultSelectedOption });
  console.log({ value });
  // const [selectedOption, setSelectedOption] = useState(defaultSelectedOption);
  const [selectedOption, setSelectedOption] = useState(value);
  console.log({ selectedOption });

  if (typeof options === "number") {
    options = new Array(options)
      .fill("")
      .map((e, i) => i + (numberStartsWith || 0));
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setSelectedOption(value);
  };
  return (
    <div>
      <label htmlFor={labelHtmlForAndSelectId}>{label}</label>
      <select
        name={labelHtmlForAndSelectId}
        id={labelHtmlForAndSelectId}
        value={selectedOption}
        onChange={handleChange}
      >
        {options && typeof options === "number"
          ? ""
          : options.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
      </select>
    </div>
  );
};

export default Select;
