describe('Company', () => {
  describe('Send to email', () => {
    it('should send a company list to email succesfully', async () => {
      // GIVEN
      init()

      const companyObject = {
        id: '123456789'
      }

      // WHEN
      const company = await CompanySend.handler(companyObject)

      // THEN
      expect(company).toBeDefined()
    })

    it('should not send a company list to email if user is not logged in', async () => {
      // GIVEN
      init()

      const companyObject = {
        id: '123456789'
      }

      // WHEN
      const company = await CompanySend.handler(companyObject)

      // THEN
      expect(company).toBeUndefined()

      //   expected to contain a errors array of objects with a key of user and a message
      expect(company.errors).toContainEqual({ user: 'User is not logged in' })
    })

    it('should not send a company list to email if user is not an admin', async () => {
      // GIVEN
      init()

      const companyObject = {
        id: '123456789'
      }

      // WHEN
      const company = await CompanySend.handler(companyObject)

      // THEN
      expect(company).toBeUndefined()

      //   expected to contain a errors array of objects with a key of user and a message
      expect(company.errors).toContainEqual({ user: 'User is not an admin' })
    })
  })
})
