export type memberPayload = {
    email:string;
    name:string;
    age:number;
    gender:string
}

export type memberErrorsPayload = {
    email: string;
    name: string;
    age: string;
    gender: string;
  };

export type loginPayload = {
    email:string,
    password:string
}

export type registerPayload = {
    email:string,
    password:string,
    name:string
}

export type registerResponse = {
        message: string
        token: string    
}

export type errorResponse = {
    message:string
}

export type loginResponse = {
    message: string
    token: string 
}

export type forgotPasswordResponse = {
    message:string
}

export type addMemberResponse = {
    message:string
}

export type fetchedMemberData = {
    _id: string;
    name: string;
    email: string;
    gender: string;
    age: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export type fetchedMemberResponse = {
    message:string,
    membersData:fetchedMemberData[]
}

export type generateTokenResponse = {
    message:string,
    newToken:string
}