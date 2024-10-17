import { Dispatch, SetStateAction } from "react";

export type TVideo = {
  id: number;
  filename: string;
  title: string;
};

export type Type_ExistingUserLogin_and_NewUserSignup = {
  signup: boolean;
  setSignup: Dispatch<SetStateAction<boolean>>;
  login: boolean;
  setLogin: Dispatch<SetStateAction<boolean>>;
};
