export interface Auth {
    name?: string,
    email:string,
    password?:string,
    rePassword?:string,
    phone?: number,
    resetCode?: number,
    newPassword?:string
}
