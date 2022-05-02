import { useState, useEffect } from "react";
import { ITraitUpdate } from "../models/ITraitUpdate";
import { fetchAvailableUpdates } from "../api/availableUpdates";

export function useAvailableUpdates(token: string) {
  const [isFetching, setIsFetching] = useState(false);
  const [availableUpdates, setAvailableUpdates] = useState<ITraitUpdate[]>([]);

  useEffect(() => {
    const run = async () => {
      try {
        setIsFetching(true);
        const data = (await fetchAvailableUpdates(token)) || [];
        setAvailableUpdates(data);
      } catch (e) {
        console.log("could not fetch available updates", e);
      } finally {
        setIsFetching(false);
      }
    };
    run();
  }, []);

  return { availableUpdates, isFetching };
}
