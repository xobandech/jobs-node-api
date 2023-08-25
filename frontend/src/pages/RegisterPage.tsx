import { useState, ChangeEvent } from "react";
import FormInput from "../components/FormInput";
const defaultFormFields = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const RegisterPage = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { username, email, password, confirmPassword } = formFields;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
    console.log(formFields);
  };

  return (
    <div>
      <form className="flex max-w-[300px] flex-col [&>.input]:mb-3">
        <FormInput
          onChange={handleChange}
          label="Username"
          type="text"
          name="username"
          value={username}
          required
          shrinkLabel={Boolean(username)}
        />
        <FormInput
          onChange={handleChange}
          label="Email"
          type="email"
          name="email"
          value={email}
          required
          shrinkLabel={Boolean(email)}
        />
        <FormInput
          onChange={handleChange}
          label="Password"
          type="text"
          name="password"
          value={password}
          required
          shrinkLabel={Boolean(password)}
        />
        <FormInput
          onChange={handleChange}
          value={confirmPassword}
          label="Confirm Password"
          type="text"
          name="confirmPassword"
          required
          shrinkLabel={Boolean(confirmPassword)}
        />
        <button className="w-20 mx-auto h-10 rounded-md bg-violet-200">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
