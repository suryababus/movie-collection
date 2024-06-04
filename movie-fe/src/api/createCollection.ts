import { AxiosResponse } from "axios";
import { server } from ".";

interface Response {
  id: number;
  title: string;
  year: number;
  imdbID: string;
  type: string;
  poster: string;
  collectionId: number;
}
interface Request {
  name: string;
  privateCollection: boolean;
  description: string;
}

export const createCollection = async (request: Request) => {
  const response = server.post<Request, AxiosResponse<Response[]>>(
    "/movieList",
    request
  );

  return response;
};
