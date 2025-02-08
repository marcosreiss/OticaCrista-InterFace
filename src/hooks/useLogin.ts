
import { useMutation } from "@tanstack/react-query";
import { LoginPayload, LoginResponse, loginService } from "../services/loginService";
import type { AxiosError } from "axios";



// Hook para login
export const useLogin = () =>
  useMutation<LoginResponse, AxiosError, LoginPayload>({
    mutationFn: loginService, 
  });