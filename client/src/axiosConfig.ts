import axios from "axios";

axios.interceptors.request.use((config) => {
  const backUrl = process.env.REACT_APP_BACK_URL || "";
  const url = config.url || "";
  if (backUrl && url.startsWith(backUrl)) {
    try {
      const stored = localStorage.getItem("userObjGDSC");
      if (stored) {
        const token = JSON.parse(stored)?.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (e) {
      return config;
    }
  }
  return config;
});

export default axios;
