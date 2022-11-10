import { HOSTS } from "helpers/constants";
import API from "service";
import { Controllers } from "../helpers/constants/index";

const TestController = {};

TestController.getTestsData = async () => {
  const response = API.GET(HOSTS.BASE_URL, Controllers.test, "");
  return response;
};

TestController.creteTest = async (body) => {
  const response = await API.POST(HOSTS.BASE_URL, Controllers.test, "", body);
  return response;
};

TestController.getPossibleTests = async (body, testId) => {
  const response = await API.POST(
    HOSTS.BASE_URL,
    Controllers.test,
    `${testId}/possible-count`,
    body
  );

  return response;
};

export default TestController;
