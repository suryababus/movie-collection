import { AxiosResponse } from "axios";
import { server, setAuthToken } from ".";

interface Response {}
interface Request {
  email: string;
  password: string;
  fullName: string;
}

export const signup = async (request: Request) => {
  setAuthToken("");
  const response = server.post<Request, AxiosResponse<Response>>(
    "/auth/signup",
    request
  );

  return response;
};
