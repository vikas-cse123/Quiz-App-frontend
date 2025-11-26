import { useState } from "react";
import { z } from "zod";
import { handleInputsErrors } from "../utils/handleInputsErrors";
import { callApi } from "../api/callApi";
import toast from "react-hot-toast";

const loginSchema = z.object({
  email: z.email("Invalid Email"),
  password: z.string().min(1, "Please enter password"),
});
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isloading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    try {
      // setIsLoading(true);
      e.preventDefault();
      const result = loginSchema.safeParse(formData);
      console.log({ result });
      if (!result.success) {
        handleInputsErrors(formData, result, setErrors);
        return;
      }
      setIsLoading(true);

      const data = await callApi("POST", "/user/login", formData);
      console.log({ data });
      toast.success(data.message);
      setIsLoading(false);
    } catch (error) {
      console.log({ error });
      toast.error(error.message);

      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isloading) return;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setErrors({});
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
      >
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <button
          className={`btn ${isloading ? "disabled" : ""}`}
          disabled={isloading}
        >
          {isloading ? <div className="spinner"></div> : "Login"}
        </button>
      </form>
      <a href="">Forgot Password?</a>
      <p>
        Don't have an account? <a href="">Sign up</a>
      </p>
    </div>
  );
};

export default Login;
