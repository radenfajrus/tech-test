
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';



// INIT APP
const app = express();

// INIT MIDDLEWARE
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(compression())





// INIT CONFIG
// require('dotenv').config()
import * as cfg from "./config"

// INIT REPO
import { StorageFile } from './storage_file'
import { StorageRepoInterface } from './types'
const repos = {
  StorageRepo : new StorageFile(cfg.StorageFileConfig) as StorageRepoInterface,
}

// INIT HANDLER
import { FormController } from './controller';
const controllers = {
  FormController : new FormController(repos.StorageRepo),
}


// INIT ROUTER
/**
 * Decorator Router to bind exception with exceptionHandler
 */
import Router from './routers/v0';
import {exceptionHandler} from './exception'
const apiRouterV0 = new Router(controllers, exceptionHandler)


app.use('/api', apiRouterV0.router)



// START SERVER
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`[App]: Listening on port ${port}`)
})

