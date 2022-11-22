export default interface User {
  email: string
  password: string
  id: string
  admin: boolean
  token?: string
}
