export interface GoogleUser {
    googleId: string;
    email: string;
    emailVerified: boolean;
    name: string;
    givenName?: string;
    familyName?: string;
    picture?: string;
    locale?: string;
    createdAt?: Date;
}
