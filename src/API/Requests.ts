export const BASE_URL = "http://localhost:3000";

export const Requests = {
  getIndex: () => fetch(BASE_URL).then((res) => res.json()),

  getAllVideos: () => fetch(`${BASE_URL}/videos`).then((res) => res.json()),

  getFirstVideo: () =>
    fetch(`${BASE_URL}/firstVideo`).then((res) => res.json()),

  getCurrentVideo: (filename: string) =>
    fetch(`${BASE_URL}/singleVideo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filename }),
    }).then((res) => res.json()),

  getVideoById: (id: number) =>
    fetch(`${BASE_URL}/videos/${id}`).then((res) => res.json()),
};
