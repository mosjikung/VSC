import * as dayjs from 'dayjs';
import * as crypto from 'crypto';


export function getTime(){

    const dateTime = new Date(
      dayjs().utcOffset(7)
          .format('YYYY-MM-DD HH:mm:ss'),
    )
    return dateTime;
}

export function getTime10(){

  const dateTime = new Date(
    dayjs().utcOffset(7).add(10, 'minute')
        .format('YYYY-MM-DD HH:mm:ss'),
  )
  return dateTime;
}

export function getOtp() {
  return Math.floor(100000 + Math.random() * 900000);
}

export function generateRefCode(length = 6) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let refCode = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    refCode += characters[randomIndex];
  }
  return refCode;
}

export function generateMd5(value: string) {
  const val = value;
  return crypto.createHash('md5').update(val).digest('hex');
}
