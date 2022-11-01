import axios from "axios";

const getNews = async () => {
  return await axios.get("news");
};

export const NewsService = {
  getNews,
};
