export const BASE_URL = "https://test.uk2eu.com"

export const UseFetch = async (url, Method, data) => {
  switch (Method) {
    case "POST":
      try {
        const res = await fetch(BASE_URL + url, {
          method: Method,
          body: JSON.stringify(data),
        });
        return res.json();
      } catch (error) {
        console.log(error);
      }
      break;
    case "GET":
      try {
        const res2 = await fetch(BASE_URL + url, {
          method: Method,
          headers: { "Content-Type": "application/json" },
        });
        return res2.json();
      } catch (error) {
        console.log(error);
      }
      break;
  }
};
