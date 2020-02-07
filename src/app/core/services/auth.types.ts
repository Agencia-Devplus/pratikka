export enum AuthProvider {
    Email
}

export interface User {
    nome?: string,
    email: string,
    password: string
}

export interface AuthOptions {
    isSignIn: boolean,
    provider: AuthProvider,
    user: User
}