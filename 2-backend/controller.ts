import express from 'express'
import { check, validationResult } from 'express-validator';


import { StorageRepoInterface,FormRequest,BaseController, FormModel, FormValidationError } from './types'


export class FormController extends BaseController{
  repo: StorageRepoInterface;

  constructor(repo: StorageRepoInterface){
    super(FormController)
    this.repo = repo
  }
  
  public async add(req: express.Request, res: express.Response){
    let data: FormRequest = req.body as FormRequest;

    let errors = validationResult(req)
    if(!errors.isEmpty()) throw new FormValidationError(errors.array()) 


    let inserted_data = this.repo.add(data)

    return this.ok<FormModel>(res,inserted_data)
  }
  public async find(req: express.Request, res: express.Response){
    let query = req.query as {
      id: number
    };

    let data = []
    if(query.id){
      data = this.repo.findById(query.id)
    }else{
      data = this.repo.findAll()
    }
    data = data.reverse()

    return this.ok<FormModel[]>(res,data)

  }

}

