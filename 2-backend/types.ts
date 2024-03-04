
export interface FormModel {
  id: number;
  name: string;
  email: string;
  phone_area: string;
  phone_number: string;
}


export interface StorageRepoInterface {
  add : (data: any) => FormModel;
  findAll : () => FormModel[];
  findById : (id: number) => FormModel[];
}

export interface FormRequest {
  name: string;
  email: string;
  phone_area: string;
  phone_number: string;
}



export class AppError extends Error {
  
}
export class FormValidationError extends Error {
  code: any;
  message: string;
  detail : ValidationError[];
  constructor(detail = []){
    super("Invalid Form Data");
    this.code = "FormValidationError"
    this.message = "Invalid Form Data"
    this.detail  = detail
    
    Object.setPrototypeOf(this, FormValidationError.prototype);
  }
}

// export class FormDataDuplicate extends FormSubmitError {
//   code: string;
//   message: string;
//   detail : string;
//   constructor(message="Form Data Duplicate",detail=""){
//     super();
//     this.code = "FormDataDuplicate"
//     this.message = message
//     this.detail  = detail
//   }
// }


/**
 * Need to bind function to class. 
 * So private variable (this.*) can be accessed from async function.
 */
import express from 'express'
import { ValidationError } from 'express-validator';
export abstract class BaseController {
  constructor(childController?: any){
    if(childController !== undefined){
    Object.getOwnPropertyNames(childController.prototype)
      .filter((propertyName) => propertyName !== 'constructor')
      .forEach((method) => {
        (this[method] = this[method].bind(this));
      })
    }
  }


  public static jsonResponse (res: express.Response, code: number, message: string) {
    return res.status(code).json({ message })
  }

  public ok<T> (res: express.Response, dto?: T) {
    if (!!dto) {
      res.type('application/json');
      return res.status(200).json(dto);
    } else {
      return res.status(200).send();
    }
  }

  public created (res: express.Response) {
    return res.sendStatus(201);
  }

  public clientError (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 400, message ? message : 'Unauthorized');
  }

  public unauthorized (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 401, message ? message : 'Unauthorized');
  }

  public forbidden (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 403, message ? message : 'Forbidden');
  }

  public notFound (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 404, message ? message : 'Not found');
  }

  public conflict (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 409, message ? message : 'Conflict');
  }

  public tooMany (res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 429, message ? message : 'Too many requests');
  }

  public todo (res: express.Response) {
    return BaseController.jsonResponse(res, 400, 'TODO');
  }

  public fail (res: express.Response, error: Error | string) {
    console.log(error);
    return res.status(500).json({
      message: error.toString()
    })
  }
}

