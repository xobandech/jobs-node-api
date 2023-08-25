import { useState, ChangeEvent, FormEvent } from "react";
import FormInput from "../components/FormInput";
const defaultFormFields = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const RegisterPage = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, email, password, confirmPassword } = formFields;
  const [responseOk, setResponseOk] = useState<null | boolean>(null)
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
    console.log(formFields);
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()
    if (password == confirmPassword) {
      await fetch("http://localhost:3001/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name, email, password
        })
      }).then(res => res.ok ? setResponseOk(true) : setResponseOk(false));
    }
    console.log({
        name, email, password
    });
    
  };

  return (
    <div>
      <form id="myForm" onSubmit={(e) => handleRegister(e)} className="flex max-w-[300px] flex-col [&>.input]:mb-3">
        <FormInput
          onChange={handleChange}
          label="Name"
          type="text"
          name="name"
          value={name}
          required
          shrinkLabel={Boolean(name)}
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
        <button type="submit" className="w-20 mx-auto h-10 rounded-md bg-violet-200">
          Register
        </button>
      </form>
      { responseOk == true ? "Successfull register" : responseOk == false ? "Register failed..." : ""}
    </div>
  );
};

export default RegisterPage;
