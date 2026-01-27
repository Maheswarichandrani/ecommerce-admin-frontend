export type UserStatus = 'active' | 'blocked' | 'pending';

export interface UserAddress {
    label: string;
    line1: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    phone: string;
    addresses: UserAddress[];
    status: UserStatus;
    joiningDate: string; // ISO date
}
