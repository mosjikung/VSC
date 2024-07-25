import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtDecoderService {
  constructor(private readonly jwtService: JwtService) {}

  decodeToken(token: string) {
    try {
      const decoded = this.jwtService.decode(token, { json: true });
      return decoded;
    } catch (err) {
      throw new Error('Invalid token');
    }
  }
}
