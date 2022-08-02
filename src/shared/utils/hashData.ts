import 'dotenv/config';
import * as bcrypt from 'bcrypt';

export const hashData = async (plainData: string): Promise<string> => {
  //
  const rounds = Number(process.env.CRYPT_SALT);

  return bcrypt.hash(plainData, rounds);
};
