export const BASE_URL = "http://localhost:3000";

export const Requests = {
  getAllVideos: () => fetch(`${BASE_URL}/videos`).then((res) => res.json()),

  getFirstVideoInTable: () =>
    fetch(`${BASE_URL}/firstVideo`).then((res) => res.json()),
};
