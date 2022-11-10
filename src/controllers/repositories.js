import { HOSTS } from "helpers/constants";
import API from "service";
import { Controllers } from "../helpers/constants/index";

const RepositoriesController = {};

RepositoriesController.getRepositories = async () => {
  const response = await API.GET(HOSTS.BASE_URL, Controllers.repository, "");
  return response;
};

RepositoriesController.create = async (body) => {
  const response = await API.POST(
    HOSTS.BASE_URL,
    Controllers.repository,
    "",
    body
  );
  return response;
};

RepositoriesController.update = async (body) => {
  const response = API.PUT(
    HOSTS.BASE_URL,
    Controllers.repository,
    body._id,
    body
  );
  return response;
};

RepositoriesController.delete = async (id) => {
  const response = API.DELETE(HOSTS.BASE_URL, Controllers.repository, id);
  return response;
};

export default RepositoriesController;
