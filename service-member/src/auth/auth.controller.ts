import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService, // private readonly membersService: MembersService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() request: any) {
    return await this.authService.login(request);
  }

  // @Public()
  // @HttpCode(HttpStatus.OK)
  // @Post('login-social')
  // async loginSocial(@Body() request: any) {
  //   return await this.authService.loginSocial(request);
  // }
}
