import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  //   HttpCode,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { IdParamDto } from './dto/idParam.dto';
import { ParseIdPipe } from './pipes/parseIdPipe';
import { ZodValidationPipe } from './pipes/zodvalidationPipe';
import {
  createPropertySchema,
  CreatePropertyZodDto,
} from './dto/createPropertyZod.dto';
import { HeadersDto } from './dto/headers.dto';
import { RequestHeader } from './pipes/request-headers';
import { PropertyService } from './property.service';
import { UpdatePropertyDto } from './dto/updateProperty.dto';
import { Time } from './decorators/time.decorator';

@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}

  @Get()
  @Time()
  findAll() {
    return this.propertyService.findAll();
  }

  //   @Post()
  //   @HttpCode(202)
  //   @UsePipes(
  //     new ValidationPipe({
  //       whitelist: true,
  //       forbidNonWhitelisted: true,
  //       groups: ['create'],
  //     }),
  //   )
  // whitelist - If set to true validator will strip validated object of any properties that do not have any decorators.
  // forbidNonWhitelisted - If set to true, instead of stripping non-whitelisted properties validator will throw an error
  //   @UsePipes(new ZodValidationPipe(createPropertySchema))
  //   create(@Body() body: CreatePropertyZodDto) {
  //     return this.propertyService.create();
  //   }

  // same validation can also be used as
  @Post()
  create(@Body() dto: CreatePropertyDto) {
    return this.propertyService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIdPipe) id,
    @Body() dto: UpdatePropertyDto,
    // @RequestHeader(new ValidationPipe({ validateCustomDecorators: true }))
    // header: HeadersDto,
  ) {
    return this.propertyService.update(id, dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id) {
    return this.propertyService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id) {
    return this.propertyService.delete(id);
  }
}
