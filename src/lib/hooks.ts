import { useEffect, useState } from "react";

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<string | null>();
  const [more, setMore] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(false);
  const moreItems = async () => {
    if (hasMore) {
      const res = await fetch(more);
      const moreData = await res.json();
      if (moreData.next) {
        setHasMore(true);
        setMore(moreData.next);
      } else {
        setHasMore(false);
      }
      setData([...data, ...moreData.results]);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_URL + url);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        if (data.next) {
          setHasMore(true);
          setMore(data.next);
        }
        setData(data.results);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Failed to fetch menu items");
        }
      }
    })();
  }, []);

  return [data, error, hasMore, moreItems] as const;
}
