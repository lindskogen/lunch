const JSONBOX_URL =
  "https://jsonbox.io/box_68bdcc6bbbf9999a7884/5dd42e212e6feb0017073745";

export const cachePut = (data: object) =>
  fetch(JSONBOX_URL, {
    method: "PUT",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ cache: data })
  });

interface CacheObject<T> {
  _id: string;
  cache: T;
  _createdOn: string;
  _updatedOn: string;
}

export const cacheGet = <TValue>(): Promise<CacheObject<TValue> | undefined> =>
  fetch(JSONBOX_URL)
    .then(resp => resp.json())
    .catch(() => undefined);
