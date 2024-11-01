export type TVideo = {
  id: number;
  filename: string;
  title: string;
};

export type VideoPurchase = {
  id: number;
  userId: number;
  videoId: number;
};

export type JwtPayload = {
  id: number;
  email: string;
  role: "ADMIN" | "USER";
  emailVerified: boolean;
  subscribed: boolean;
  iat: number;
  videosOwnedByUser: number[];
};
