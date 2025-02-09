import { User } from '@prisma/client'

export type UserWithoutPassword = Omit<User, 'password'>
export interface UerIdPayload {
  userId: string
}

export enum USERS_ERROR {
  NOT_FOUND_BY_ID = 'User ID not found',
  NOT_FOUND_BY_EMAIL = 'User email not found',
}
