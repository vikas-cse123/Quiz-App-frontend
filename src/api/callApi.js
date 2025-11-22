export const callApi = async (method, url, body) => {
  console.log(`Running call api fn`);
  try {
    const properties = { method };
    if (body) {
      properties.headers = {
        "Content-Type": "application/json",
      };
      properties.body = JSON.stringify(body);
    }
    console.log(properties);
    const baseUrl = `http://192.168.1.6:2026`;
    const res = await fetch(`${baseUrl}${url}`, properties);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
