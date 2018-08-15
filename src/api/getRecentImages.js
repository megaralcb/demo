import config from "./igAuth";

export const getRecentImages = () => {
  return fetch(
    `https://api.instagram.com/v1/users/self/media/recent/?access_token=${config.access_token}`
  )
    .then(res => res.json())
    .then(data => data);
};
