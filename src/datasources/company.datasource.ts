
import * as AWS from 'aws-sdk'
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
}

export default CompanyDynamo
