import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new UnAuthorizedException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class UnAuthorizedException extends Exception {
    constructor (){
        super('you are not authorized for this action')
    }
    
    public handle(error:this, ctx:HttpContextContract){
        ctx.response.status(403).json({
           errors:[
               {message:error.message}
           ]
        })
       }
}
