import * as Validator from 'validatorjs'
import sendResponse from './../../common/helpers/sendResponse'
import statusHelper from './../../common/helpers/statusCode'
import UserDynamo from './../../datasources/user.datasource'

const User = new UserDynamo()

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const handler = async (event) => {
  try {
    const rules = {
      email: 'required|email',
      password: 'required|string'
    }

    const bodyClear = JSON.parse(event.body)

    const validation = new Validator(bodyClear, rules)

    if (validation.fails()) {
      return sendResponse(400, JSON.stringify(validation.errors))
    }

    const userExists = await User.getUser(bodyClear)

    if (!userExists) {
      return sendResponse(400, JSON.stringify({
        message: 'User does not exists'
      }))
    }

    const passwordMatch = await User.comparePassword(bodyClear.password, userExists.password)

    if (!passwordMatch) {
      return sendResponse(400, JSON.stringify({
        message: 'Password does not match'
      }))
    }

    const user = await User.login(userExists)

    return sendResponse(200, JSON.stringify(user))
  } catch (error) {
    console.error(error)

    const [statusCode, message] = await statusHelper.getCode(error)

    return sendResponse(statusCode, JSON.stringify({
      message
    }))
  }
}

module.exports.handler = handler
