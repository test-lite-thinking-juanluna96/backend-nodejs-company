
const init = (): void => {
}

describe('Company', () => {
  describe('Create', () => {
    it('should create a company', async () => {
    //   GIVEN
      init()

      const companyObject = {
        name: 'Company Name',
        address: 'Company Address',
        nit: '123456789',
        phone: '123456789'
      }

      //   WHEN
      const company = await CompanyCreate.handler(companyObject)

      //   THEN
      expect(company).toBeDefined()
    })

    it('sould not create a company with invalid nit', async () => {
      // GIVEN
      init()

      const companyObject = {
        name: 'Company Name',
        address: 'Company Address',
        nit: 'abc',
        phone: '123456789'
      }

      // WHEN
      const company = await CompanyCreate.handler(companyObject)

      // THEN
      expect(company).toBeUndefined()
      //   expected to contain a errors array of objects with a key of nit and a message
      expect(company.errors).toContainEqual({ nit: 'Nit is not valid' })
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
