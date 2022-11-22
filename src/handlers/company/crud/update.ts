import * as Validator from 'validatorjs'
import statusHelper from '../../../common/helpers/statusCode'
import CompanyDynamo from './../../../datasources/company.datasource'

const Company = new CompanyDynamo()

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const handler = async (event) => {
  try {
    const { id } = event.pathParameters

    const rules = {
      name: 'required|string',
      address: 'required|string',
      nit: 'required|numeric',
      phone: 'required|numeric'
    }

    const bodyClear = JSON.parse(event.body)

    const validation = new Validator(bodyClear, rules)

    if (validation.fails()) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(validation.errors)
      }
    }

    const result = await Company.update(id, JSON.parse(event.body))

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(result)
    }
  } catch (error) {
    console.error(error)

    const [statusCode, message] = await statusHelper.getCode(error)

    return {
      statusCode,
      headers: {
        'Content-Type': 'application/json'
      },
      body: message
    }
  }
}

module.exports.handler = handler
