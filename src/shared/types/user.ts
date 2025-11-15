export interface User {
  id: string;
  email: string;
  password: string;
  fullname: string;
  profileImgUrl: null;
  isActive: boolean;
  roles: string[];
  token: string;
}
