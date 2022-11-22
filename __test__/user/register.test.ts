describe('User', () => {
  describe('Register', () => {
    it('should register a user succesfully', async () => {
      // GIVEN
      init()

      const userObject = {
        email: 'juandluna17@gmail.com',
        password: '123456789'
      }

      // WHEN
      const user = await UserRegister.handler(userObject)

      // THEN
      expect(user).toBeDefined()
    })

    it('should not register a user with an invalid email', async () => {
      // GIVEN
      init()

      const userObject = {
        email: 'juandluna17gmail.com',
        password: '123456789'
      }

      // WHEN
      const user = await UserRegister.handler(userObject)

      // THEN
      expect(user).toBeUndefined()
      //   expected to contain a errors array of objects with a key of email and a message
      expect(user.errors).toContainEqual({ email: 'Email is not valid' })
    })

    it('should not register if user already exists', async () => {
      // GIVEN
      init()

      const userObject = {
        email: 'juandluna17@gmail.com',
        password: '123456789'
      }

      // WHEN
      const user = await UserRegister.handler(userObject)

      // THEN
      expect(user).toBeUndefined()
      //   expected to contain a errors array of objects with a key of email and a message
      expect(user.errors).toContainEqual({ email: 'User already exists' })
    })
  })
})
