import { CreateToken } from ".";

const generateTokenFn = (username: string, roles: string[], _id: string) => {
  const data: any = {};
  const expiredIn = new Date(Date.now());
  expiredIn.setHours(expiredIn.getHours() + 1);

  data.roles = roles;
  data.user = username;
  data.token = CreateToken(data);
  data._id = _id;
  data.expiredIn = expiredIn;
  return data;
}

export const AuthService = {
  generateToken: generateTokenFn
}