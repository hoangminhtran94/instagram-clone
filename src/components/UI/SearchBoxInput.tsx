import { ComponentPropsWithoutRef, FC } from "react";
import { useState, useRef } from "react";
import { useEffect } from "react";
const SearchBoxInput: FC<ComponentPropsWithoutRef<"input">> = ({
  className,
  onKeyDown,
  onChange,
  ...props
}) => {
  const [focus, setFocus] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (focus) {
      inputRef.current?.focus();
    }
  }, [focus]);

  return (
    <>
      <div
        onClick={() => {
          setFocus(true);
        }}
        className={`flex gap-2 items-center input-search cursor-text ${
          focus && "hidden"
        }`}
      >
        <span className="">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 16L19.5 19.5"
              stroke="#9D9D9D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z"
              stroke="#9D9D9D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="text-sm  text-[#D2D2D2]">Search</span>
      </div>
      <div className={`relative ${!focus && "hidden"}`}>
        <input
          onChange={onChange}
          ref={inputRef}
          className={`input-search ${className}`}
          onKeyDown={onKeyDown}
          {...props}
        />
        <span
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          onClick={(e) => {
            setFocus(false);
            if (inputRef.current) {
              inputRef.current.value = "";
            }
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              fill="#D2D2D2"
            />
            <path
              d="M12.0005 12.0001L14.8289 14.8285M9.17212 14.8285L12.0005 12.0001L9.17212 14.8285ZM14.8289 9.17163L12.0005 12.0001L14.8289 9.17163ZM12.0005 12.0001L9.17212 9.17163L12.0005 12.0001Z"
              stroke="#E6E6E6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </>
  );
};

export default SearchBoxInput;
