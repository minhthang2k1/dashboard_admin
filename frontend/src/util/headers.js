const accessToken = localStorage.getItem("accessToken");

export const headers = {
  token: `Bearer ${accessToken}`,
};
