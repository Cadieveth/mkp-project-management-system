const ApiService = async (apiUrl, onSuccess, onError) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await fetch(apiUrl, {
      method: "GET", // Sesuaikan dengan method yang Anda butuhkan
      headers: headers,
    });

    const data = await response.json();

    if (response.ok) {
      onSuccess(data);
    } else {
      onError(data);
    }
  } catch (error) {
    console.error(error);
    onError(error.message);
  }
};

export default ApiService;
