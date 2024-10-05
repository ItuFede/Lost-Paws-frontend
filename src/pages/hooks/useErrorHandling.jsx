import { toast } from "react-toastify";

const useErrorHandling = () => {
  const handleError = (error) => {
    if (
      error.response &&
      error.response?.status >= 400 &&
      error.response?.status < 500
    ) {
      toast.error(
        `Error ${error.response.status}: ${
          error.response.data?.message || "Error en la solicitud."
        }`
      );
    } else {
      console.error("Error on server:", error);
    }

    if (error.errorMessage) {
      console.error("Error - errorMessage");
      toast.error(`Error: ${error.errorMessage}`);
    }
  };

  return { handleError };
};

export default useErrorHandling;
