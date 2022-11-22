import * as Validator from 'validatorjs'
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
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(validation.errors)
      }
    }

    const userExists = await User.getUser(bodyClear)

    if (!userExists) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'User does not exists'
        })
      }
    }

    const passwordMatch = await User.comparePassword(bodyClear.password, userExists.password)

    if (!passwordMatch) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Password does not match'
        })
      }
    }

    const user = await User.login(userExists)

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
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
