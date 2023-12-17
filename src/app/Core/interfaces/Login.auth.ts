export interface LoginResponse{
  id: number,
  username: string,
  email: string,
  role: {
      id: number,
      name: string
  },
  enabled: boolean,
  authorities: string,
  jwt: string,
  accountNonExpired: boolean,
  credentialsNonExpired: boolean,
  accountNonLocked: boolean
}