 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/LoginValidator'
import SignupValidator from 'App/Validators/SignupValidator'
import  Hash from '@ioc:Adonis/Core/Hash'
import { appKey } from 'Config/app'
import jwt from 'jsonwebtoken'
import UnauthecatedException from 'App/Exceptions/UnauthecatedException'
import Database from '@ioc:Adonis/Lucid/Database'
import CreateNewPasswordValidator from 'App/Validators/CreateNewPasswordValidator'

export default class AuthController {
    /**
     * signup
     */
     public async signup({request}:HttpContextContract) {
        const data= await request.validate(SignupValidator)
         const user= await User.create(data)
         return await User.query().where('email',user.email).first()
    }

    /**
     * login
     */
    public async login({request}:HttpContextContract) {
        const data= await request.validate(LoginValidator)
        const user=await User.query().where('email',data.email).first()
        
        if(!user){
            new UnauthecatedException('login credentals are not valid')
        }
        const isVerified=user && await Hash.verify(user?.password,data.password)
       if(!isVerified){
            throw new UnauthecatedException('login details are not valid')
         }
       const token=jwt.sign({sub:user!.id},appKey,{expiresIn:24*60*60,jwtid:'hello',})
       return {token,user}
    }
    /**
     * logout
     */
    public async logout({request}:HttpContextContract) {
        const token=request.headers().authorization
         await Database
         .table('blocked_tokens')
        .insert({token})
        }

         /**
         * name
         */
        public async creatNewPassword({request}:HttpContextContract) {
            const data=await request.validate(CreateNewPasswordValidator)
            const user=await User.query().where('email',data.email).first()
            if(!user){
               throw new UnauthecatedException('email and password are not valid')
            }
            const isVerified= await Hash.verify(user?.password,data.password)
            console.log(isVerified,isVerified)
            if(!isVerified){
               throw new UnauthecatedException('email and password are not valid')
            }
           const hashedPassword=await Hash.make(data.new_password)
           if(user ) await User.query().where('email',user.email).update({password:hashedPassword})
        }
}
