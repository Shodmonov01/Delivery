import { useEffect, useState } from "react";

export function useFetch() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (url, options = { method: "GET" }) => {
    try {
      setLoading(true);

      const response = await fetch(url, {
        method: options.method,
        body: options.body ? JSON.stringify(options.body) : undefined,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      setData(responseData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // You can add any cleanup logic here if needed.
    return () => {
      // Cleanup code here, if necessary.
    };
  }, []);

  return { data, loading, fetchData };
}

// function MyComponent() {
//     const { data, error, loading, fetchData } = useFetch<YourDataType>();

//     useEffect(() => {
//       // Fetch data when the component mounts
//       fetchData('https://api.example.com/data');
//     }, []);

//     if (loading) {
//       return <div>Loading...</div>;
//     }

//     if (error) {
//       return <div>Error: {error.message}</div>;
//     }

//     return (
//       <div>
//         {/* Render your data here */}
//         {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
//       </div>
//     );
//   }

//   export default MyComponent;
//   In this example, the useFetch hook provides a fetchData function that you can use to make GET, POST, PUT, or DELETE requests by specifying the HTTP method in the options object. The hook also manages loading and error states, making it easier to handle asynchronous data fetching in your TypeScript components.
