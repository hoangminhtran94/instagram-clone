import { ComponentPropsWithoutRef, FC } from "react";

interface FloatingInputProps {
  label: string;
}

const FloatingInput: FC<
  FloatingInputProps & ComponentPropsWithoutRef<"input">
> = ({ label, ...props }) => {
  return (
    <div className="relative">
      <input
        {...props}
        id="floating_filled"
        className="block rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0  border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
        placeholder=" "
      />
      <label
        htmlFor="floating_filled"
        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingInput;
