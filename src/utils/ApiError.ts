export default class ApiError extends Error {
  private readonly statusCode: number
  private readonly isOperational: boolean
  constructor(statusCode: number, message: string, isOperational = true, stack = '') {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
