import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UnAuthorizedException from 'App/Exceptions/UnAuthorizedException'

export default class AccesController {
  public async handle({request}: HttpContextContract, next:()=>Promise<void>,args:string[]) {
    if(!args.includes(request.loggedInUser!.role)){
      throw new UnAuthorizedException()
    }
    await next()
  }
}
