import { useState, ChangeEvent, FormEvent, useContext } from "react";
import FormInput from "../components/FormInput";
import { UserContext } from "../contexts/UserContext";
import { UserData } from "../types/types";
const defaultFormFields = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const { setCurrentUser } = useContext(UserContext);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const [responseOk, setResponseOk] = useState<null | boolean>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (password) {
      const response = await fetch(
        "http://localhost:3001/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      if (response.ok) {
        const data = (await response.json()) as UserData;
        localStorage.setItem("JTWToken", data.token);
        setCurrentUser(data.user);
        setResponseOk(true);
        window.location.replace("/jobs");
      } else {
        setResponseOk(false);
      }
    }
  };
  return (
    <>
      <form
        id="myForm"
        onSubmit={(e) => handleLogin(e)}
        className="flex mt-5 max-w-[300px] flex-col [&>.input]:mb-3"
      >

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
        <button
          type="submit"
          className="w-20 mx-auto h-10 rounded-md bg-violet-200"
        >
          Log In
        </button>
      </form>
      <div
        className={`${responseOk != null ? "flex justify-center" : "hidden"}`}
      >
        {responseOk === true
          ? "Successfully registered"
          : responseOk === false
          ? "Registration failed..."
          : ""}
      </div>
    </>
  );
};

export default LoginForm;
