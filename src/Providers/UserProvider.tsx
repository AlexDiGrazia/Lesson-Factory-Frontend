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
    // consder if (JWT in local storage, setJWET(jwt in local storage)) instead of if (JWT === "")
    if (JWT === "") {
      const storedJWT = localStorage.getItem("JWT");
      if (storedJWT) {
        setJWT(storedJWT);
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
