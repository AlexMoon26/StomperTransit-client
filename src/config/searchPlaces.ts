import { Places } from "@/types";

export const handleSearchPlaces = (search): Promise<Places[]> => {
  let timerId: any | undefined;

  const debouncedSearch = async (): Promise<Places[]> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_PLACES}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Token " + "68e51d3824fee99de122012da8f641faee2e754f",
        },
        body: JSON.stringify({ query: search }),
      });
      const places = await response.json();


      return places.suggestions;
    } catch (err) {
      return [];
    }
  };

  return new Promise((resolve) => {
    clearTimeout(timerId);
    if (search === "") {
      resolve([]);
      return;
    }

    timerId = setTimeout(async () => {
      const fetchedPlaces = await debouncedSearch();
      resolve(fetchedPlaces);
    }, 1000);
  });
};
