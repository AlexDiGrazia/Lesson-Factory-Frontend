export const BASE_URL = "http://localhost:3000";

export const Requests = {
  getAllVideos: () => fetch(`${BASE_URL}/videos`).then((res) => res.json()),

  getFirstVideoInTable: () =>
    fetch(`${BASE_URL}/firstVideo`).then((res) => res.json()),

  getSignedUrl: (url: string) =>
    fetch(`${BASE_URL}/presigned-url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    }).then((res) => res.json()),
};
