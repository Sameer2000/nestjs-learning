import { IsInt, IsString, Length } from 'class-validator';

export class CreatePropertyDto {
  @IsString({ always: true }) // always - Indicates if validation must be performed always, no matter of validation groups used. Thi san also be used in validation pipe in controller
  @Length(2, 20, { message: 'Error on length of name' }) // to set custom error message
  name: string;

  @IsString()
  @Length(2, 20, { groups: ['create'] }) // groups - Validation groups used for this validation.
  @Length(1, 25, { groups: ['update'] })
  description: string;

  @IsInt()
  price: number;
}
