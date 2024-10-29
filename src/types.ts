export type TVideo = {
  id: number;
  filename: string;
  title: string;
};

export type JwtPayload = {
  id: number;
  email: string;
  role: "ADMIN" | "USER";
  emailVerified: boolean;
  subscribed: boolean;
  iat: number;
};
