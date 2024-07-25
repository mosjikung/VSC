import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { MembersModule } from './members/members.module';
import { MemberAddressesModule } from './member-addresses/member-addresses.module';
import { MemberObjectivesModule } from './member_objectives/member_objectives.module';

import { LanguagesModule } from './languages/languages.module';

import { MailerModule } from '@nestjs-modules/mailer';
import { OtpMailModule } from './otp-mail/otp-mail.module';
import { OtpMailHistoryModule } from './otp-mail-history/otp-mail-history.module';
import { ProvincesModule } from './provinces/provinces.module';
import { DistrictsModule } from './districts/districts.module';
import { SubdistrictsModule } from './subdistricts/subdistricts.module';
import { minioClientOptions } from './config/minio.config';
import * as Minio from 'minio';
import { MinioModule } from './minio/minio.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: process.env.SERVICE_API_JWT_SECRET,
        signOptions: {
          expiresIn: process.env.SERVICE_API_JWT_EXPIRATION_TIME,
        },
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.SERVICE_API_POSTGRES_HOST,
      port: parseInt(<string>process.env.SERVICE_API_POSTGRES_PORT),
      username: process.env.SERVICE_API_POSTGRES_USER,
      password: process.env.SERVICE_API_POSTGRES_PASSWORD,
      database: process.env.SERVICE_API_POSTGRES_DATABASE,
      // entities: [User],
      entities: ['dist/**/*.entity.js'],
      autoLoadEntities: true,
      synchronize: false,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'app.cloud.service@gmail.com',
          pass: 'xgeanlvcsgrmphbu',
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
      defaults: {
        from: 'Mail Service',
      },
    }),
    AuthModule,
    MembersModule,
    MemberAddressesModule,
    MemberObjectivesModule,
    LanguagesModule,

    OtpMailModule,

    OtpMailHistoryModule,

    ProvincesModule,
    DistrictsModule,
    SubdistrictsModule,
    MinioModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: 'MINIO_CLIENT',
      useFactory: () => new Minio.Client(minioClientOptions),
    },
    AppService,
  ],
})
export class AppModule {}
