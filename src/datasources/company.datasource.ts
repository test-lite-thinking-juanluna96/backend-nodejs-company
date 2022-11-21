
import * as AWS from 'aws-sdk'
import Company from '../core/entities/Company'
import { CompanyRepository } from './../core/repositories/user.repository'

const dynamo = new AWS.DynamoDB.DocumentClient()
class CompanyDynamo implements CompanyRepository {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public async list () {
    // List all companies
    const params = {
      TableName: process.env.COMPANIES_TABLE
    }

    console.log(params)

    const result = await dynamo.scan(params).promise()

    return result.Items
  }

  public async create (company: Company): Promise<Company> {
    // Create a new company
    const params = {
      TableName: process.env.COMPANIES_TABLE,
      Item: company
    }

    await dynamo.put(params).promise()

    return company
  }

  public async delete (id: string): Promise<Company> {
    const params = {
      TableName: process.env.COMPANIES_TABLE,
      Key: {
        id
      }
    }

    // Get company by id first
    const company = await this.get(id)

    if (company) {
      // Delete company by id
      await dynamo.delete(params).promise()

      return company
    }
  }

  private async get (id: string): Promise<Company> {
    const params = {
      TableName: process.env.COMPANIES_TABLE,
      Key: {
        id
      }
    }

    // Get company by id
    const company = await dynamo.get(params).promise()

    return company.Item
  }
}

export default CompanyDynamo
