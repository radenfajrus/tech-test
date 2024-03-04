import express from 'express'
import { AppError, FormValidationError,  } from './types'

export async function exceptionHandler (req: express.Request, res: express.Response, next: any): Promise<void> {
  try {
    await next(req,res)
  } catch (err) {
    console.log(err)

    if( err instanceof AppError){
      res.type('application/json').status(200).json({ status: false, code : "AppError" , message : "Something Wrong, but its okay" })
    }
    else if( err instanceof FormValidationError){
      res.type('application/json').status(422).json({ status: false, code : err.code , message : err.message, detail : err.detail })
    }
    else{
      res.type('application/json').status(500).json({ status: false, code : "InternalServerError" , message : "Something Wrong, please contact administrator" })
    }
  }
}
