import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class HeadersDto {
  @IsString()
  @Expose({ name: 'access-token' }) // Marks the given class or property as included.
  accessToken: string;
}
