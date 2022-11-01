import axios from "axios";

const getDashboardItems = async () => {
  return await axios.get("dashboard");
};

export const DashboardService = {
  getDashboardItems,
};
