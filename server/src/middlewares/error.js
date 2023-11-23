import { AppError } from '../utils/app-error.js'

export async function notfound(req, res) {
  res.status(400).json({
    message: 'Url not found',
  })
}

export async function errorHandler(err, req, res, next) {
  // console.error(err)
  console.error(err.message)

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    })
  }

  res.status(500).json({
    message: 'Internal server error',
  })
}
