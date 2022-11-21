
const init = (): void => {
}

describe('Company', () => {
  describe('Delete', () => {
    it('should delete a company succesfully', async () => {
      // GIVEN
      init()

      const companyObject = {
        id: '123456789'
      }

      // WHEN
      const company = await CompanyDelete.handler(companyObject)

      // THEN
      expect(company).toBeDefined()
    })

    it('should not delete a company with invalid id', async () => {
      // GIVEN
      init()

      const companyObject = {
        id: 'abc'
      }

      // WHEN
      const company = await CompanyDelete.handler(companyObject)

      // THEN
      expect(company).toBeUndefined()
      //   expected to contain a errors array of objects with a key of id and a message
      expect(company.errors).toContainEqual({ id: 'Id is not valid' })
    })

    it('should not delete a company it does not exist', async () => {
      // GIVEN
      init()

      const companyObject = {
        id: '123456789'
      }

      // WHEN
      const company = await CompanyDelete.handler(companyObject)

      // THEN
      expect(company).toBeUndefined()
      //   expected to contain a errors array of objects with a key of id and a message
      expect(company.errors).toContainEqual({ id: 'Company does not exist' })
    })

    it('should not delete a company with an empty id', async () => {
      // GIVEN
      init()

      const companyObject = {
        id: ''
      }

      // WHEN
      const company = await CompanyDelete.handler(companyObject)

      // THEN
      expect(company).toBeUndefined()
      //   expected to contain a errors array of objects with a key of id and a message
      expect(company.errors).toContainEqual({ id: 'Id is required' })
    })

    it('should not delete a company if user is not logged in', async () => {
      // GIVEN
      init()

      const companyObject = {
        id: '123456789'
      }

      // WHEN
      const company = await CompanyDelete.handler(companyObject)

      // THEN
      expect(company).toBeUndefined()
      //   expected to contain a errors array of objects with a key of user and a message
      expect(company.errors).toContainEqual({ user: 'User is not logged in' })
    })

    it('should not delete a company if user is not an admin', async () => {
      // GIVEN
      init()

      const companyObject = {
        id: '123456789'
      }

      // WHEN
      const company = await CompanyDelete.handler(companyObject)

      // THEN
      expect(company).toBeUndefined()
      //   expected to contain a errors array of objects with a key of user and a message
      expect(company.errors).toContainEqual({ user: 'User is not an admin' })
    })

    it('sould not create a company with invalid phone', async () => {
      // GIVEN
      init()

      const companyObject = {
        name: 'Company Name',
        address: 'Company Address',
        nit: '123456789',
        phone: 'abc'
      }

      // WHEN
      const company = await CompanyCreate.handler(companyObject)

      // THEN
      expect(company).toBeUndefined()
      //   expected to contain a errors array of objects with a key of phone and a message
      expect(company.errors).toContainEqual({ phone: 'Phone is not valid' })
    })

    it('should not create a company if user is not logged in', async () => {
      // GIVEN
      init()

      const companyObject = {
        name: 'Company Name',
        address: 'Company Address',
        nit: '123456789',
        phone: '123456789'
      }

      // WHEN
      const company = await CompanyCreate.handler(companyObject)

      // THEN
      expect(company).toBeUndefined()
      //   expected to contain a errors array of objects with a key of user and a message
      expect(company.errors).toContainEqual({ user: 'User is not logged in' })
    })

    it('should not create a company if user is not an admin', async () => {
      // GIVEN
      init()

      const companyObject = {
        name: 'Company Name',
        address: 'Company Address',
        nit: '123456789',
        phone: '123456789'
      }

      // WHEN
      const company = await CompanyCreate.handler(companyObject)

      // THEN
      expect(company).toBeUndefined()
      //   expected to contain a errors array of objects with a key of user and a message
      expect(company.errors).toContainEqual({ user: 'User is not an admin' })
    })
  })
})
