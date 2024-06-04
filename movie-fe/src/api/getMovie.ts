import { server } from ".";

export interface MovieResponse {
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

interface Rating {
  Source: string;
  Value: string;
}
export const getMovie = async (id: string) => {
  const response = server.get<MovieResponse>("movie?ombdId=" + id);

  return response;
};
