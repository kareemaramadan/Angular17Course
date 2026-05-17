export interface IAuthResponse {
  username: string;
  token: string;
  roles: string[];
  isAuthenticated: boolean;
  createdOn: Date;
  refreshtokenexpiration: Date;
}
