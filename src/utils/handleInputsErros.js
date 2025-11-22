import z from "zod";

export const handleInputsErros = (formData, result, setErrors) => {
  const formatted = z.treeifyError(result.error);
  const errorsData = {};

  for (const key in formatted.properties) {
    const errors = formatted.properties[key].errors;
    if (key === "email") {
      errorsData[key] =
        formData.email.length === 0 ? "Please enter email." : errors[0];
    } else {
      errorsData[key] = errors[0];
    }
  }
  console.log(errorsData);

  setErrors(errorsData);
};
