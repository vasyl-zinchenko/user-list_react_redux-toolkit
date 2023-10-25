interface UserData {
  id: number;
  name: string;
  email: string;
  address: string;
}

export interface User extends UserData {
  birthdayDate: string;
  phoneNumber: string;
}

export interface FetchUser extends UserData {
  birthday_date: string;
  phone_number: string;
}

export interface GetUserParams {
  limit: number;
  offset: number;
}
