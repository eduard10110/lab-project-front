import { toast } from "react-toastify";

export const serializeErrorMessage = (error) => {
  if (error?.response?.data) {
    const { data } = error.response;
    if (data.errors) {
      Object.keys(data.errors).forEach((err) =>
        toast.error(data.errors[err][0])
      );
      return { data: { hasError: true } };
    }
    return {
      data: {
        hasError: true,
        errorMessage: error.response?.data?.message || error?.message,
      },
    };
  }
  return { data: { hasError: true } };
};
