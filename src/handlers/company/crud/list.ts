import statusHelper from '../../../common/helpers/statusCode'
import sendResponse from './../../../common/helpers/sendResponse'
import CompanyDynamo from './../../../datasources/company.datasource'

const Company = new CompanyDynamo()

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const handler = async (event) => {
  try {
    // Conseguir listado  de compañias
    const result = await Company.list()

    return sendResponse(200, JSON.stringify(result))
  } catch (error) {
    console.error(error)

    const [statusCode, message] = await statusHelper.getCode(error)

    return sendResponse(statusCode, JSON.stringify(message))
  }
}

module.exports.handler = handler
