import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UnauthecatedException from 'App/Exceptions/UnauthecatedException'
import UnprocessableException from 'App/Exceptions/UnprocessableException'
import User from 'App/Models/User'
import updateUserValidator from 'App/Validators/updateUserValidator'
//import UserUpdateValidator from 'App/Validators/UserUpdateValidator'

export default class UsersController {
  public async me({request}: HttpContextContract) {
   return request.loggedInUser
  }
   
  public async updateMe({request}: HttpContextContract) {
    const data= await request.validate(updateUserValidator)
    console.log('data',data)
    if(!Object.keys(data).length){
      throw new UnprocessableException('please provide minimium 1 value to update')
    }
    const id= request.loggedInUser?.id
    if(id)await User.query().where('id',id).update(data)
   }

  public async index({}: HttpContextContract) {
   return User.all()
  }

  public async show({request}: HttpContextContract) {
    const id= await request.params().id
    const user=await User.query().where('id',id).first()
    if(!user){
      throw new UnauthecatedException('user are not avilable')
    }
    return user
  }

  public async update({request}: HttpContextContract) {
    const data= await request.validate(updateUserValidator)
   
    // const id= await request.params().id
    // for (let i = 0; i < (await allUser).length; i++) {
    //   const user=(await allUser)[i]
    //   if(user.email===data.email && user.id!==id){
    //     throw new UnauthecatedException('This email is already exist')
    //   }
      
    // }
    // await User.query().where('id',id).update(data)
  }

  public async destroy({request}: HttpContextContract) {
    const id= await request.params().id
    await User.query().where('id',id).delete()
    }
  }