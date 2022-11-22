import User from '../entities/User'

export interface UserRepository {
  register: (user: User) => Promise<User>
  login: (user: User) => Promise<User>
  hashPassword: (password: string) => string
  getUser: (user: User) => Promise<User>
}

export default UserRepository
