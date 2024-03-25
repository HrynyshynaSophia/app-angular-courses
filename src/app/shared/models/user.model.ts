export interface User{
    id:string;
    name: {first:string; last:string};
    login:string;
    password: string;
}
export class UserModel implements User {
    id: string;
    name:{
        first: string;
        last: string
    };
    login:string;
    password: string;
    constructor( id: string, firstName:string, lastName:string,login:string,password: string){
        this.id=id;
        this.name={
            first: firstName,
            last: lastName,
        };
        this.login=login;
        this.password=password;
    }
}