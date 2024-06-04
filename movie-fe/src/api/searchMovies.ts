import { server } from ".";

export interface MoviesResponse {
  totalResults: string;
  Search: Search[];
  Response: string;
}

interface Search {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}
export const searchMovie = async (key: string) => {
  const response = server.get<MoviesResponse>("/movies", {
    params: {
      name: key,
    },
  });

  return response;
};
