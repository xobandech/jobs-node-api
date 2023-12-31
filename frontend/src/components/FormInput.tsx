import { InputHTMLAttributes, FC } from "react";

type FormInputProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps & { shrinkLabel: boolean }> = ({ label, shrinkLabel, ...otherProps }) => {
  return (
    <div className="relative margin-y-10 input">
      <input
        className="bg-white text-xl text-black px-2 py-1 w-full border-none border-b border-gray-500 focus:outline-none focus:border-black focus:ring-0 transition duration-300 ease-in-out"
        {...otherProps}
      />
      {label && (
        <label
          className={`text-gray-500 text-md font-normal absolute pointer-events-none left-2 top-2 transition-transform ${shrinkLabel ? "top-[-0.9rem] ease-in text-[0.8rem] transition-all" : ''}`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
