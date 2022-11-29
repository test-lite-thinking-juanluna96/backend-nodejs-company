import * as Validator from 'validatorjs'
import statusHelper from '../../../common/helpers/statusCode'
import sendResponse from './../../../common/helpers/sendResponse'
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
      return sendResponse(400, JSON.stringify(validation.errors))
    }

    const result = await Company.update(id, JSON.parse(event.body))

    return sendResponse(200, JSON.stringify(result))
  } catch (error) {
    console.error(error)

    const [statusCode, message] = await statusHelper.getCode(error)

    return sendResponse(statusCode, message)
  }
}

module.exports.handler = handler
