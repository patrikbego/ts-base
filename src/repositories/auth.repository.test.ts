import * as AuthRepository from './auth.repository'
import {getRepository} from 'typeorm'
import { mocked } from 'ts-jest/utils'
import {generateUsersData, generateUserPayload, generateUserData, generateAuthData} from '../../test/utils/generate'

jest.mock('typeorm');

const mockedGetRepo = mocked(getRepository(<jest.Mock>{}))
beforeEach(() => {
  mockedGetRepo.find.mockClear()
  mockedGetRepo.findOne.mockClear()
  mockedGetRepo.save.mockClear()
})

describe("UserRepository", () => {

  describe("create auth", () => {
    test("should store auth in database", async () => {
      const payload = generateAuthData();
      // const userData = generateUserData(payload)
      mockedGetRepo.save.mockResolvedValue(payload)
      const auth = await AuthRepository.createAuth(payload);
      expect(auth).toMatchObject(payload)
      expect(auth).toEqual(payload)
      expect(mockedGetRepo.save).toHaveBeenCalledWith(payload)
      expect(mockedGetRepo.save).toHaveBeenCalledTimes(1)
    })
  })

  // describe("getUser", () => {
  //   test("should return user from the database", async () => {
  //     const id = 1
  //     const userData = generateUserData({id})
  //     mockedGetRepo.findOne.mockResolvedValue(userData)
  //     const user = await UserRepository.getUserById(id)
  //     expect(user).toEqual(userData)
  //     expect(user?.id).toBe(id)
  //     expect(mockedGetRepo.findOne).toHaveBeenCalledWith({id})
  //     expect(mockedGetRepo.findOne).toHaveBeenCalledTimes(1)
  //   })
  //
  //   test("should return null if user not found", async () => {
  //     const id = 1
  //     mockedGetRepo.findOne.mockResolvedValue(null)
  //     const user = await UserRepository.getUserById(id)
  //     expect(user).toBeNull()
  //     expect(mockedGetRepo.findOne).toHaveBeenCalledWith({id})
  //     expect(mockedGetRepo.findOne).toHaveBeenCalledTimes(1)
  //   })
  // })
})