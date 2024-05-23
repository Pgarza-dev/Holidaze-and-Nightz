import { useEffect, useState } from "react";

export default function useFetch(
  url: string,
  limit = 1000,
  page = 1,
  sort = "",
  sortOrder = "desc",
) {
  const [data, setData] = useState({ data: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsError(false);
        setIsLoading(true);
        const response = await fetch(
          `${url}?limit=${limit}&page=${page}&sort=${sort}&sortOrder=${sortOrder}`,
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [url, limit, page, sort, sortOrder]);

  return { data, isLoading, isError };
}
