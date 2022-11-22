
import * as AWS from 'aws-sdk'
import * as bcrypt from 'bcrypt'
import * as dotenv from 'dotenv'
import * as jwt from 'jsonwebtoken'
import User from '../core/entities/User'
import { UserRepository } from './../core/repositories/user.repository'

dotenv.config()

const dynamo = new AWS.DynamoDB.DocumentClient()
class UserDynamo implements UserRepository {
  public async register (user: User): Promise<User> {
    // Register a new user
    const params = {
      TableName: process.env.USERS_TABLE,
      Item: user
    }

    await dynamo.put(params).promise()

    const token = await this.generateToken(user)

    return {
      ...user,
      token
    }
  }

  public async generateToken (user: User): Promise<string> {
    const userInfo = {
      id: user.id,
      email: user.email,
      admin: user.admin
    }

    // Generate a token for the user
    const token = jwt.sign(userInfo, process.env.JWT_SECRET, {
      expiresIn: 86400
    })

    return token
  }

  public hashPassword (password: string): string {
    // Hash password
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    return hash
  }

  public async checkExists (user: User): Promise<boolean> {
    // Search by email if user exists or not
    const params = {
      TableName: process.env.USERS_TABLE,
      Key: {
        email: user.email
      },
      ConditionExpression: 'attribute_exists(email)'
    }

    const result = await dynamo.get(params).promise().then(() => true).catch(() => false)

    return result
  }
}

export default UserDynamo
