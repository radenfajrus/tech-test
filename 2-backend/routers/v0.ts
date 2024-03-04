
import express from 'express'
import { check } from 'express-validator';
import { FormController } from '../controller';


export default class Routes {
    router: any;
    c: any;

    // Add Decorator to Catch All Exception
    execute = async (req: express.Request, res: express.Response, next: any) => {
        try {
            await next(req,res)
        } catch (err) {
            console.log(err);
            res.status(500).json({
                status: false,
                code: "InternalServerError",
                message: "Internal Server Error"
            })
        }
    }

    constructor (controller: any, execute?: any ) {
        if(execute!==undefined){
            this.execute = execute
        }
        this.c = controller;
        this.router = express.Router();

        // HealthCheck
        this.router.get('/', (req, res) => { return res.json({ version: "v0", status: "Healthy" }); })

        // Form
        let formController: FormController = this.c.FormController;
        this.router.get('/forms', (req,res) => this.execute(req,res,formController.find))
        this.router.post('/forms', [
          check('name').notEmpty().withMessage('Name should not be empty'),
          check('email').notEmpty().withMessage('Email should not be empty'),
          check('phone_area').notEmpty().withMessage('Phone Area should not be empty'),
          check('phone_number').notEmpty().isNumeric().withMessage('Phone Number should not be empty'),

          check('email').isEmail().withMessage('Email should be in email format'),
          check('phone_number').isNumeric().withMessage('Phone Number should be in email format'),
          
          check('name').isLength({ max: 30 }).withMessage('Phone Number should less than 30 digit !'),
          check('email').isLength({ max: 30 }).withMessage('Phone Number should less than 30 digit !'),
          check('phone_number').isLength({ max: 15 }).withMessage('Phone Number should less than 15 digit !'),
        ], (req,res) => this.execute(req,res,formController.add))

    }
}
