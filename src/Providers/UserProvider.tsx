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
  videosOwnedByUser: number[];
  setVideosOwnedByUser: Dispatch<SetStateAction<number[]>>;
};

const UserContext = createContext<TUserContext>({} as TUserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [JWT, setJWT] = useState<string>("");
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [videosOwnedByUser, setVideosOwnedByUser] = useState<number[]>([]);

  const jwtFromStorage = localStorage.getItem("JWT");
  const pageWasRefreshed = JWT === "" && jwtFromStorage;

  useEffect(() => {
    if (pageWasRefreshed) {
      setJWT(jwtFromStorage);
    }
  });

  return (
    <UserContext.Provider
      value={{
        JWT,
        setJWT,
        subscribed,
        setSubscribed,
        videosOwnedByUser,
        setVideosOwnedByUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
