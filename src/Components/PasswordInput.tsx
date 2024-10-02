import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export const PasswordInput = ({ placeholder }: { placeholder: string }) => {
  const [inputType, setInputType] = useState<"text" | "password">("text");
  const [icon, setIcon] = useState<IconProp>(faEye);

  const togglePassword = () => {
    const newType = inputType === "password" ? "text" : "password";
    const newIcon = icon === faEye ? faEyeSlash : faEye;
    setInputType(newType);
    setIcon(newIcon);
  };

  return (
    <>
      <div className="input-default password-input-container">
        <FontAwesomeIcon
          icon={icon}
          className="password-toggle"
          onClick={togglePassword}
        />
        <label htmlFor="password"></label>
        <input type={inputType} name="password" placeholder={placeholder} />
      </div>
    </>
  );
};
