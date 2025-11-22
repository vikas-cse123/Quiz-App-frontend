import { useState } from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import { callApi } from "../api/callApi";
import { handleInputsErros } from "../utils/handleInputsErros";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });
  const [isOtpSend, setIsOtpSend] = useState(false);
  const [errors, setErrors] = useState({});
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      handleInputsErros(formData, result, setErrors);
      return;
    }
    if (!isOtpSend) {
      toast("Click on Send OTP button to get OTP.");
      return;
    }
    const data = await callApi("POST", "/user/signup", formData);
    console.log(data);
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };
  const sendOtp = async () => {
    try {
      const result = emailSchema.safeParse({ email: formData.email });
      if (!result.success) {
        handleInputsErros(formData, result, setErrors);
        return;
      }

      const data = await callApi("POST", "/user/signup-otp", {
        email: formData.email,
        name: formData.name,
      });
      if (data.success) {
        toast.success(data.message);
        setIsOtpSend(true);
      } else {
        toast.error(data.message);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
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
          <button type="button" onClick={sendOtp}>
            Send OTP
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
        <button>Sign up</button>
      </form>
    </div>
  );
};
export default Register;
