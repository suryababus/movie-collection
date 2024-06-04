import { AxiosResponse } from "axios";
import { server } from ".";

interface Response {
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

interface Request {
  collectionId: string;
  name: string;
  year: number;
  type: string;
  imdbID: string;
  poster: string;
}

export const addMovieToCollection = async (request: Request) => {
  const response = server.post<Request, AxiosResponse<Response>>(
    "/movieList/" + request.collectionId + "/addMovie",
    request
  );

  return response;
};
