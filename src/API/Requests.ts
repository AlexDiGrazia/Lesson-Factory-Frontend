export const BASE_URL = "http://localhost:3000";

export const Requests = {
  getAllVideos: (JWT: string) =>
    fetch(`${BASE_URL}/videos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + JWT,
        x_meta_function: "getAllVideos",
      },
    }).then((res) => res.json()),

  getFirstVideoInTable: (JWT: string) =>
    fetch(`${BASE_URL}/videos/firstVideo`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + JWT,
        x_meta_function: "getFirstVideoInTable",
      },
    }).then((res) => res.json()),

  getSignedUrl: (url: string, JWT: string) =>
    fetch(`${BASE_URL}/presigned-url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + JWT,
        x_meta_function: "getSignedUrl",
      },
      body: JSON.stringify({ url }),
    }).then((res) => res.json()),

  signup: (email: string, password: string, role: string) =>
    fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        x_meta_function: "signup",
      },
      body: JSON.stringify({ email, password, role }),
    }).then((res) => res.json()),

  login: (email: string, password: string) =>
    fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        x_meta_function: "login",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json()),

  resendVerificationEmail: (email: string, id: number) =>
    fetch(`${BASE_URL}/confirmation/resend_email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        x_meta_function: "resendVerificationEmail",
      },
      body: JSON.stringify({ email, id }),
    }).then((res) => res.json()),

  updateSubscriptionStatus: (id: number) =>
    fetch(`${BASE_URL}/subscription`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        x_meta_function: "updateSubscriptionStatus",
      },
      body: JSON.stringify({ id }),
    }).then((res) => res.json()),
};
