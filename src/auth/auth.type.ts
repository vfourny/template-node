export interface LoginResponse {
  access_token: string
}

export enum AUTH_ERROR {
  WRONG_PASSWORD = 'Wrong password',
}
