import {getRepository} from "typeorm";
import {Auth} from "../models/auth";

export interface IAuthPayload {
  email: string;
  pwd: string;
  rt: string;
  at: string;
}

export const createAuth  = async (payload: Auth) :Promise<Auth> => {
  const authRepository = getRepository(Auth);
  const auth = new Auth()
  return authRepository.save({
    ...auth,
    ...payload
  })
}

export const getAuthByUserId  = async (userId: number) :Promise<Auth | null> => {
  const authRepository = getRepository(Auth);
  const auth = await authRepository.findOne({userId: userId})
  if (!auth) return null
  return auth
}
