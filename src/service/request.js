import axios from "axios";
import { HOSTS, HostUrls } from "helpers/constants";

const constructBaseURLFunction = (controller, method) =>
  `${HostUrls.BASE_URL}/${controller}/${method}`;

const constructUrl = (host) => {
  switch (host) {
    case HOSTS.BASE_URL:
      return constructBaseURLFunction;

    default:
      return null;
  }
};

export const request = async (
  host,
  reqMethod,
  controller,
  method,
  query,
  data = {},
  headers
) => {
  const response = await axios({
    url: constructUrl(host)(controller, method),
    method: reqMethod,
    headers: {
      ...headers,
      "Content-Type": "application/json",
      Accept: "text/plain",
      charset: "UTF-8",
    },
    data,
  });
  return response;
};
