import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type TUserContext = {
  JWT: string;
  setJWT: Dispatch<SetStateAction<string>>;
  subscribed: boolean;
  setSubscribed: Dispatch<SetStateAction<boolean>>;
};

const UserContext = createContext<TUserContext>({} as TUserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [JWT, setJWT] = useState<string>("");
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const jwtFromStorage = localStorage.getItem("JWT");
  const pageWasRefreshed = JWT === "" && jwtFromStorage;

  useEffect(() => {
    if (pageWasRefreshed) {
      setJWT(jwtFromStorage);
    }
  });

  return (
    <UserContext.Provider value={{ JWT, setJWT, subscribed, setSubscribed }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
