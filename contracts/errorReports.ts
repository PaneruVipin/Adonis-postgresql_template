export interface ErrorReporterContract<Messages extends any = any> {
    hasErrors: boolean
  
    report(
      pointer: string,
      rule: string,
      message: string,
      arrayExpressionPointer?: string,
      args?: any
    ): void
  
    toError(): any
  
    toJSON(): Messages
  }
  