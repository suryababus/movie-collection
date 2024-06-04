import { AxiosResponse } from "axios";
import { server, setAuthToken } from ".";

interface Response {
  token: string;
  expiresIn: number;
}
interface Request {
  email: string;
  password: string;
}

export const login = async (request: Request) => {
  setAuthToken("");
  const response = server.post<Request, AxiosResponse<Response>>(
    "/auth/login",
    request
  );

  return response;
};
