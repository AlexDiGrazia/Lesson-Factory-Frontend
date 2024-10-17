import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export const PasswordInput = ({
  placeholder,
  key,
  value,
  onChange,
}: {
  placeholder: string;
  key: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [inputType, setInputType] = useState<"text" | "password">("password");
  const [icon, setIcon] = useState<IconProp>(faEye);

  const togglePassword = () => {
    const newType = inputType === "password" ? "text" : "password";
    const newIcon = icon === faEye ? faEyeSlash : faEye;
    setInputType(newType);
    setIcon(newIcon);
  };

  return (
    <>
      {/* TO DO: fix key component */}
      <div key={key} className="input-default password-input-container">
        <FontAwesomeIcon
          icon={icon}
          className="password-toggle"
          onClick={togglePassword}
        />
        <label htmlFor="password"></label>
        <input
          type={inputType}
          name="password"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
};
