import { useState } from "react";

export default function useFetch<T>(baseUrl: string) {
  const [loading, setLoading] = useState(true);

  function get(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
      fetch(baseUrl + url)
        .then((response) => response.json())
        .then((data) => {
          if (!data) {
            setLoading(false);
            return reject(data);
          }
          setLoading(false);
          resolve(data);
        })
        .catch((error) => {
          setLoading(false);
          reject(error);
        });
    });
  }

  async function post(url: string, body: object): Promise<T> {
    const response = await fetch(baseUrl + url, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  }

  return { get, post, loading };
}
