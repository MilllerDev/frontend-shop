export interface Client {
  id: string;
  name: string;
  phone?: string;
}

export interface User {
  token:    string;
  email:    string;
  password: string;
}
