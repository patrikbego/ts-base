import {getRepository} from "typeorm";
import {User} from '../models'
import {hash} from 'bcrypt'

export interface IUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  pwd: string;
}

export const getUsers  = async () :Promise<Array<User>> => {
  const userRepository = getRepository(User);
  return userRepository.find()
}

export const createUser  = async (payload: IUserPayload) :Promise<User> => {
  const userRepository = getRepository(User);
  const user = new User()
  user.pwd = await hash(payload.pwd, 10);
  return userRepository.save({
    ...user,
    ...payload
  })
}

export const getUserById  = async (id: number) :Promise<User | null> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({id: id})
  if (!user) return null
  return user
}

export const getUserByEmail  = async (email: string) :Promise<User | null> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({email: email})
  if (!user) return null
  return user
}
