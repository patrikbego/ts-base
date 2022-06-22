import AuthController from './auth.controller'
import * as AuthRepository from '../repositories/auth.repository'
import {IAuthPayload} from '../repositories/auth.repository'
import * as UserRepository from '../repositories/user.repository'
import {generateAuthData, generateUserData} from '../../test/utils/generate'
import faker from "faker";
import {hash} from 'bcrypt'

afterEach(() => {
  jest.resetAllMocks()
})

describe("AuthController", () => {
  describe("handleLogin", () => {

    test("Successful login", async () => {
      const authData = generateAuthData();
      const userData = generateUserData();
      const pwd = faker.internet.password();
      userData.pwd = await hash(pwd, 10);
      const getUserSpy = jest.spyOn(UserRepository, 'getUserByEmail').mockResolvedValueOnce(userData)
      const createAuthSpy = jest.spyOn(AuthRepository, 'createAuth').mockResolvedValueOnce(authData)
      const controller = new AuthController();
      const auth = await controller.handleLogin(<IAuthPayload>{email: authData.email, pwd});
      expect(auth).toEqual(authData)
      expect(getUserSpy).toHaveBeenCalledWith(authData.email)
      expect(getUserSpy).toHaveBeenCalledTimes(1)
      expect(createAuthSpy).toHaveBeenCalledTimes(1)
    })

    test("passwords do not match", async () => {
      const authData = generateAuthData();
      const userData = generateUserData();
      const spy = jest.spyOn(AuthRepository, 'getAuthByUserId').mockResolvedValueOnce(authData)
      const uSpy = jest.spyOn(UserRepository, 'getUserByEmail').mockResolvedValueOnce(userData)
      const controller = new AuthController();
      const auth = await controller.handleLogin(<IAuthPayload>{email: authData.email, pwd: faker.internet.password()});
      expect(auth).toEqual(null)
      expect(uSpy).toHaveBeenCalledWith(authData.email)
      expect(uSpy).toHaveBeenCalledTimes(1)
    })
  })

})