import { useState, ChangeEvent, FormEvent } from "react";
import FormInput from "./FormInput";

const defaultFormFields = {
  position: "",
  status: "",
  company: "",
};
const NewJobForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { position, status, company } = formFields;
  const handleCreateNewJob = async (e: FormEvent) => {
    e.preventDefault();
  };
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <>
      <form
        id="myForm"
        onSubmit={(e) => handleCreateNewJob(e)}
        className="flex mt-5 max-w-[300px] flex-col [&>.input]:mb-3"
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
          label="Password"
          type="text"
          name="company"
          value={company}
          required
          shrinkLabel={Boolean(company)}
        />
        <select
          className="outline outline-slate-700 outline-2"
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
          className="w-20 mx-auto h-10 rounded-md bg-violet-200"
        >
          Create
        </button>
      </form>
    </>
  );
};

export default NewJobForm;
