import Company from '../entities/Company'

export interface CompanyRepository {
  list: (company: Company) => Promise<any>
}

export default CompanyRepository
