
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
}

export default CompanyDynamo
