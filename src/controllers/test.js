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

TestController.makeTest = async (test) => {
  const response = await API.POST(
    HOSTS.BASE_URL,
    Controllers.test,
    Controllers.makeTest,
    test
  );
  return response;
};

TestController.getMakedTests = async () => {
  const response = await API.POST(
    HOSTS.BASE_URL,
    Controllers.test,
    Controllers.make,
    {}
  );
  return response;
};

TestController.exportMakedTests = () => async () => {
  const response = await API.POST(
    HOSTS.BASE_URL,
    Controllers.test,
    `${Controllers.export}/${Controllers.maked}`
  );
  return response;
};

TestController.deleteTest = async (id) => {
  const response = await API.DELETE(HOSTS.BASE_URL, Controllers.test, id);
  return response;
};

TestController.getTestPrice = async (testId, data) => {
  const response = await API.POST(
    HOSTS.BASE_URL,
    Controllers.test,
    `${testId}/check`,
    { productData: data }
  );
  return response;
};

export default TestController;
