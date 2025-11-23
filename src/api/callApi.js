export const callApi = async (method, url, body) => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL;
    const properties = { method };
    if (body) {
      properties.headers = {
        "Content-Type": "application/json",
      };
      properties.body = JSON.stringify(body);
    }

    const res = await fetch(`${baseUrl}${url}`, properties);
    const data = await res.json();
    if (!data.success) {
      throw data;
    }

    return data;
  } catch (error) {

        if (!navigator.onLine) {
      throw {
        success: false,
        message: "You are offline. Connect to the internet.",
      };
    }

    throw {
      success: false,
      message:
        error.message === "Failed to fetch" ? 
        "Unexpected error occurred. Try again later." : error.message
    };
  }
  //   console.log("eeee", error);
  //   if ("success" in error && "message" in error) {
  //     throw error;
  //   } else if (error.message === "Failed to fetch") {
  //     throw {
  //       success: false,
  //       message: navigator.onLine
  //         ? "Network error. Please try again."
  //         : "You are offline. Connect to the internet.",
  //     };
  //   } else {
  //     throw {
  //       success: false,
  //       message: "Unexpected error",
  //     };
  //   }
  // }
};
