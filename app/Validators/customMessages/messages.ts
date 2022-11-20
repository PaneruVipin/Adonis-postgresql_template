import { CustomMessages } from '@ioc:Adonis/Core/Validator'

const messages:CustomMessages={
    "required":"{{field}} is {{rule}} feild",
    "string":"{{field}} should ba a sting",
    "email":"email should be a valid email",
    "number":" {{field}} should be a number",
    "range":"{{field}} should be this range {{options.start}},{{options.stop}}",
    "unique":"{{field}} should be unique {{field}}",
}

export default messages