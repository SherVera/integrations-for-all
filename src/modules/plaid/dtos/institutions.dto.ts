import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  ArrayContains,
  IsArray,
  IsBoolean,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class InstitutionsDto {
  @ApiProperty({
    example: 'US',
    required: true,
    type: ['string'],
    description: 'Country Codes',
  })
  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  readonly country_codes: string[];

  @ApiProperty({
    example: 'fj5%ins_129571.',
    required: true,
    type: 'string',
    description: 'Institution ID',
  })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  readonly institution_id: string;

  @ApiProperty({
    example: 'Bank21',
    required: true,
    type: 'string',
    description: 'Bank name',
  })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  readonly name: string;

  @ApiProperty({
    example: false,
    required: true,
    type: 'boolean',
    description: 'Oauth',
  })
  @Exclude()
  @IsBoolean()
  @IsNotEmpty()
  @IsDefined()
  readonly oauth: boolean;

  @ApiProperty({
    example: ['assets'],
    required: true,
    type: [String],
    description: 'Institution ID',
  })
  @IsArray()
  @ArrayContains([String])
  @IsDefined()
  readonly products: string[];

  @ApiProperty({
    required: true,
    type: [String],
    description: 'Routing Numbers',
  })
  @Exclude()
  @IsArray()
  @ArrayContains([String])
  @IsDefined()
  readonly routing_numbers: string[];
}
