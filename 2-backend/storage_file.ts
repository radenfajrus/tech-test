
import { FormModel } from './types'
import fs from 'fs'
import tail from 'tail'

interface Config {
  FILE: string
}

export class StorageFile {
  file: string
  
  constructor(cfg: Config){
    this.file = cfg.FILE
  }

  createFileIfNotExist(){
    if(!fs.existsSync(this.file)){
      fs.writeFileSync(this.file,"")
    }
  }
  add(data: any): FormModel{
    this.createFileIfNotExist()

    let storedData = fs.readFileSync(this.file).toString().split("\n");
    storedData = storedData.filter(d=>d!="")

    let lastId = 0

    if(storedData.length){
      let lastData = JSON.parse(storedData[storedData.length-1])
      lastId = lastData.id
    }

    let newId = lastId + 1

    let newData = {
      id: newId,
      ...data
    }
    
    fs.appendFileSync(this.file, JSON.stringify(newData) + '\n');

    return newData;
  }
  findAll(): FormModel[]{
    this.createFileIfNotExist()

    let storedData = fs.readFileSync(this.file).toString().split("\n");
    storedData = storedData.filter(d=>d!="")

    let data = storedData.map(d => {
      return JSON.parse(d)
    })

    return data
  }
  findById(id: number): FormModel[]{
    this.createFileIfNotExist()


    let storedData = fs.readFileSync(this.file).toString().split("\n");
    storedData = storedData.filter(d=>d!="")

    let data = storedData.map(d => {
      return JSON.parse(d)
    }).filter(d=>d.id==id)

    return data
  }
}
