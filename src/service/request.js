import axios from "axios";
import { HOSTS, HostUrls } from "helpers/constants";

const constructQueryParams = (query) => {
  if (!query || Object.keys(query).length === 0) return "";
  let queryStr = "?";
  Object.entries(query).forEach(
    ([key, value]) => (queryStr = queryStr + `${key}=${value}&`)
  );
  return queryStr;
};

const constructBaseURLFunction = (controller, method, query) =>
  `${HostUrls.BASE_URL}/${controller}/${method}${constructQueryParams(query)}`;

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
    url: constructUrl(host)(controller, method, query),
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
