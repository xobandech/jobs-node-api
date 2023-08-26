import { useState, ChangeEvent, FormEvent, useContext } from "react";
import FormInput from "../components/FormInput";
import { User, UserContext, UserData } from "../contexts/UserContext";
import jwtDecode from "jwt-decode";

const defaultFormFields = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterForm = () => {
  const { setCurrentUser } = useContext(UserContext);
  const localToken = localStorage.getItem("JTWToken");
  if (localToken) {
    const decodeToken = async () => {   
      const user = await jwtDecode(localToken) as User;
      setCurrentUser(user)
    };
    decodeToken()
  }
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, email, password, confirmPassword } = formFields;
  const [responseOk, setResponseOk] = useState<null | boolean>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const response = await fetch(
        "http://localhost:3001/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
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
        onSubmit={(e) => handleRegister(e)}
        className="flex mt-5 max-w-[300px] flex-col [&>.input]:mb-3"
      >
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
        <button
          type="submit"
          className="w-20 mx-auto h-10 rounded-md bg-violet-200"
        >
          Register
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

export default RegisterForm;
