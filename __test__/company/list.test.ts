describe('Company', () => {
  describe('List', () => {
    it('should list all companies', async () => {
      // GIVEN
      init()

      // WHEN
      const companies = await CompanyList.handler()

      // THEN
      expect(companies).toBeDefined()
    })

    it('should list all companies with pagination', async () => {
      // GIVEN
      init()

      // WHEN
      const companies = await CompanyList.handler({ page: 1, limit: 10 })

      // THEN
      expect(companies).toBeDefined()
    })

    it('should not list all companies with invalid pagination', async () => {
    // GIVEN
      init()

      // WHEN
      const companies = await CompanyList.handler({ page: 'abc', limit: 'abc' })

      // THEN
      expect(companies).toBeUndefined()
      //   expected to contain a errors array of objects with a key of page and a message
      expect(companies.errors).toContainEqual({ page: 'Page is not valid' })
      //   expected to contain a errors array of objects with a key of limit and a message
      expect(companies.errors).toContainEqual({ limit: 'Limit is not valid' })
    })

    it('should list a single company', async () => {
    // GIVEN
      init()

      const companyObject = {
        id: '123456789'
      }

      // WHEN
      const company = await CompanyList.handler(companyObject)

      // THEN
      expect(company).toBeDefined()
    })

    it('should not list a single company with invalid id', async () => {
    // GIVEN
      init()

      const companyObject = {
        id: 'abc'
      }

      // WHEN
      const company = await CompanyList.handler(companyObject)

      // THEN
      expect(company).toBeUndefined()
      //   expected to contain a errors array of objects with a key of id and a message
      expect(company.errors).toContainEqual({ id: 'Id is not valid' })
    })

    it('should not list a single company it does not exist', async () => {
    // GIVEN
      init()

      const companyObject = {
        id: '123456789'
      }

      // WHEN
      const company = await CompanyList.handler(companyObject)

      // THEN
      expect(company).toBeUndefined()
      //   expected to contain a errors array of objects with a key of id and a message
      expect(company.errors).toContainEqual({ id: 'Company does not exist' })
    })
  })
})
