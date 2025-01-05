import { Module, ValidationPipe } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { APP_PIPE } from '@nestjs/core';
import { PropertyService } from './property.service';

@Module({
  controllers: [PropertyController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true, // If set to true class-transformer will attempt conversion based on TS reflected type
        },
      }), // applies validation on specific module
    },
    PropertyService,
  ],
})
export class PropertyModule {}
