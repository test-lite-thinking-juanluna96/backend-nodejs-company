
const init = (): void => {
}

describe('Company', () => {
  describe('Update', () => {
    it('should update a company succesfully', async () => {
      // GIVEN
      init()

      const companyObject = {
        id: '123456789',
        name: 'Company Name',
        address: 'Company Address',
        nit: '123456789',
        phone: '123456789'
      }

      // WHEN
      const company = await CompanyUpdate.handler(companyObject)

      // THEN
      expect(company).toBeDefined()
    })

    it('should not update a company if user is not logged in', async () => {
      // GIVEN
      init()

      const companyObject = {
        id: '123456789',
        name: 'Company Name',
        address: 'Company Address',
        nit: '123456789',
        phone: '123456789'
      }

      // WHEN
      const company = await CompanyUpdate.handler(companyObject)

      // THEN
      expect(company).toBeUndefined()

      //   expected to contain a errors array of objects with a key of user and a message
      expect(company.errors).toContainEqual({ user: 'User is not logged in' })
    })

    it('should not update a company if user is not an admin', async () => {
      // GIVEN
      init()

      const companyObject = {
        id: '123456789',
        name: 'Company Name',
        address: 'Company Address',
        nit: '123456789',
        phone: '123456789'
      }

      // WHEN
      const company = await CompanyUpdate.handler(companyObject)

      // THEN
      expect(company).toBeUndefined()
      expect(company.errors).toContainEqual({ user: 'User is not an admin' })
    })
  })
})
