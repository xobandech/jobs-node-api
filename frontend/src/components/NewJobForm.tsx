import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import FormInput from "./FormInput";
import socket from "../modules/socket";
const defaultFormFields = {
  position: "",
  status: "pending",
  company: "",
};
const NewJobForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { position, status, company } = formFields;
  const handleCreateNewJob = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const response = await fetch("http://localhost:3001/api/v1/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("JWTToken")}`,
        },
        body: JSON.stringify(formFields),
      });
  
      const job = await response.json(); 
  
      socket.emit("newJob", job);
    } catch (e) {
      console.log(e);
    }
  };
  
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  useEffect(() => {
    socket.on("connect", function () {});
  }, []);

  return (
    <div className="w-1/3 max-lg:flex flex-col max-lg:w-full max-lg:items-center">
      <div className="text-xl font-semibold flex justify-center">
        <h1>Create new job</h1>
      </div>
      <form
        id="myForm"
        onSubmit={(e) => handleCreateNewJob(e)}
        className="flex [&>*]:my-2 mt-5 max-w-[300px] flex-col [&>.input]:mb-3"
      >
        <FormInput
          onChange={handleChange}
          label="Position"
          type="text"
          name="position"
          value={position}
          required
          shrinkLabel={Boolean(position)}
        />
        <FormInput
          onChange={handleChange}
          label="Company"
          type="text"
          name="company"
          value={company}
          required
          shrinkLabel={Boolean(company)}
        />
        <select
          className="outline rounded outline-slate-700 outline-2"
          defaultValue={status}
          name="status"
          onChange={handleChange}
        >
          <option value="pending">Pending</option>
          <option value="interview">Interview</option>
          <option value="declined">Declined</option>
        </select>
        <button
          type="submit"
          className="rounded bg-primary p-2 px-4 font-medium uppercase leading-normal text-white bg-blue-500"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default NewJobForm;
