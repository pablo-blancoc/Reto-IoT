import { EmailValidator } from '@angular/forms';

export interface User{
    uid: string;
    email: string;
    displayName: string;
    emailVerified: boolean;
}