
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

  public async login (user: User): Promise<User> {
    // Login user
    const token = await this.generateToken(user)

    // Dont show password in response
    delete user.password

    return {
      ...user,
      token
    }
  }

  private async generateToken (user: User): Promise<string> {
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

  public async getUser (user: User): Promise<User> {
    // Get user by email
    const params = {
      TableName: process.env.USERS_TABLE,
      Key: {
        email: user.email
      }
    }

    const result = await dynamo.get(params).promise()

    return result.Item
  }

  public async comparePassword (password: string, hash: string): Promise<boolean> {
    // Compare password with hash
    const result = await bcrypt.compare(password, hash)

    return result
  }
}

export default UserDynamo
