import { Dispatch, SetStateAction } from "react";

export type TVideo = {
  id: number;
  filename: string;
  title: string;
};

export type TypeExistingUserLogin = {
  signup: boolean;
  setSignup: Dispatch<SetStateAction<boolean>>;
};
