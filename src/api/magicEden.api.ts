import axios from "axios";
import { ListingResponse } from "../models/Listing.model";

export async function getListings(
  offset = 0,
  limit = 20,
  result: ListingResponse[] = []
): Promise<ListingResponse[]> {
  const { data } = await axios.get<ListingResponse[]>(
    "https://api-mainnet.magiceden.dev/v2/collections/the_infamous_thugbirdz_derivative/listings",
    {
      params: {
        offset,
        limit,
      },
    }
  );

  result.push(...data);

  if (data.length === limit) {
    return await getListings(offset + limit, limit, result);
  }

  return result;
}
