import statusHelper from '../../../common/helpers/statusCode'
import CompanyDynamo from './../../../datasources/company.datasource'

const Company = new CompanyDynamo()

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const handler = async (event) => {
  try {
    const result = await Company.list()

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
