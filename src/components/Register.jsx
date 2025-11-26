import { useState } from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import { callApi } from "../api/callApi";
import { handleInputsErrors } from "../utils/handleInputsErrors.js";

const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Name must have at least 3 charactets")
    .max(30, "Name cannot be longer than 30 characters."),
  email: z.email("Invalid Email"),
  password: z.string().min(6, "Password must have atleast 6 characters."),
  otp: z
    .string()
    .length(5, "OTP must contain exactly 5 digits")
    .regex(/^\d+$/, "OTP must contain only digits"),
});
const emailSchema = registerSchema.pick({ email: true });

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });
  //vikas-update:a function using useCalllback
  const [loading, setLoading] = useState({
    register: false,
    sendOtp: false,
  });
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email" && loading.sendOtp) {
      return;
    } else if (loading.register) {
      return;
    }
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setErrors({});
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const result = registerSchema.safeParse(formData);
      if (!result.success) {
        handleInputsErrors(formData, result, setErrors);
        return;
      }
      if (!isOtpSent) {
        toast("Click on Send OTP button to get OTP.");
        return;
      }
      setLoading((prevState) => ({ ...prevState, register: true }));
      const data = await callApi("POST", "/user/signup", formData);
      toast.success(data.message);

      setLoading((prevState) => ({ ...prevState, register: false }));
    } catch (error) {
      toast.error(error.message);
      setLoading((prevState) => ({ ...prevState, register: false }));
    }
  };

  const sendOtp = async () => {
    try {
      const result = emailSchema.safeParse({ email: formData.email });

      if (!result.success) {
        handleInputsErrors(formData, result, setErrors);

        return;
      }
      setLoading((prevState) => ({ ...prevState, sendOtp: true }));

      const data = await callApi("POST", "/user/signup-otp", {
        email: formData.email,
        name: formData.name,
      });
      setIsOtpSent(true);
      toast.success(data.message);

      setLoading((prevState) => ({ ...prevState, sendOtp: false }));
    } catch (error) {
      toast.error(error.message);
      setLoading((prevState) => ({ ...prevState, sendOtp: false }));
    }
  };
  return (
    <div>
      <h1>Create Account</h1>
      <form
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
      >
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={sendOtp}
            className={`otp-btn ${
              loading.sendOtp || loading.register ? "disabled" : ""
            }`}
            disabled={loading.sendOtp || loading.register}
          >
            {loading.sendOtp ? <div className="spinner"></div> : "Send OTP"}
          </button>
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div>
          <label htmlFor="otp">OTP</label>
          <input
            type="number"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
          />
          {errors.otp && <p>{errors.otp}</p>}
        </div>
        <button
          className={`signup-btn ${
            loading.register || loading.sendOtp ? "disabled" : ""
          }`}
          disabled={loading.register || loading.sendOtp}
        >
          {loading.register ? <div className="spinner"></div> : "Register"}
        </button>
      </form>
      <p>Have an account?</p>
      <a href="/login">Log in</a>
    </div>
  );
};
export default Register;

//node --env-file=.env app.js
//npm run dev
