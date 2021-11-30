import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
export class PayloadDto {
  @ApiProperty({
    description: 'Email',
    title: 'Email',
  })
  @IsEmail()
  readonly email: string;
}
