import { server } from ".";

export interface CollectionResponse {
  id: number;
  name: string;
  owner: number;
  movies: Movie[];
  private: boolean;
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
export const getCollection = async (id: string) => {
  const response = server.get<CollectionResponse>("/movieList/" + id);

  return response;
};
