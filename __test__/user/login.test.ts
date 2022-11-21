describe('User', () => {
  describe('Login', () => {
    it('should login a user succesfully', async () => {
      // GIVEN
      init()

      const userObject = {
        email: 'juandluna17@gmail.com',
        password: '123456789'
      }

      // WHEN
      const user = await UserLogin.handler(userObject)

      // THEN
      expect(user).toBeDefined()
    })

    it('should not let user login with wrong password', async () => {
      // GIVEN
      init()

      const userObject = {
        email: 'juandluna17@gmail.com',
        password: '321654987'
      }

      // WHEN
      const user = await UserLogin.handler(userObject)

      // THEN
      expect(user).toBeUndefined()
      //   expected to contain a errors array of objects with a key of password and a message
      expect(user.errors).toContainEqual({ password: 'Password is not valid' })
    })
  })
})
