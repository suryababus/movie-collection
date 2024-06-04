import { AxiosResponse } from "axios";
import { server } from ".";

export interface MyCollectionResponse {
  id: number;
  name: string;
  owner: number;
  movies: Movie[];
  private: boolean;
  description: string;
}

interface Movie {
  id: number;
  title: string;
  year: number;
  imdbID: string;
  type: string;
  poster: string;
  collectionId: number;
}
interface Request {}

export const allCollections = async (key: string) => {
  const response = server.get<Request, AxiosResponse<MyCollectionResponse[]>>(
    "/movieList",
    {
      params: {
        name: key,
      },
    }
  );

  return response;
};
