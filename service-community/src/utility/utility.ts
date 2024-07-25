import * as dayjs from 'dayjs';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';

export function getTime() {
  const dateTime = new Date(dayjs().utcOffset(7).format('YYYY-MM-DD HH:mm:ss'));
  return dateTime;
}

export function decodeToken(token: string) {
  try {
    const decoded = this.jwtService.decode(token, { json: true });
    return decoded;
  } catch (err) {
    throw new Error('Invalid token');
  }
}

export function generateMd5(value: string) {
  const val = value;
  return crypto.createHash('md5').update(val).digest('hex');
}

export function getOtp() {
  return Math.floor(100000 + Math.random() * 900000);
}
