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

  useEffect(() => {
    if (JWT === "") {
      const storedJWT = localStorage.getItem("JWT");
      if (storedJWT) {
        setJWT(storedJWT);
        console.log("user provider" + storedJWT);
      }
    }
  });

  return (
    <UserContext.Provider value={{ JWT, setJWT }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
