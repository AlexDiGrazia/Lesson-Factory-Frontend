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
};

const UserContext = createContext<TUserContext>({} as TUserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [JWT, setJWT] = useState<string>("");

  const jwtFromStorage = localStorage.getItem("JWT");
  const pageWasRefreshed = JWT === "" && jwtFromStorage;

  useEffect(() => {
    if (pageWasRefreshed) {
      setJWT(jwtFromStorage);
    }
  });

  return (
    <UserContext.Provider value={{ JWT, setJWT }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
