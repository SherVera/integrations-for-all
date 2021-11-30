import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDefined,
  ValidateNested,
} from 'class-validator';

class DataAddress {
  @ApiProperty({
    title: 'City',
    description: 'The full city name.',
    type: String,
  })
  @IsDefined()
  readonly city: string;

  @ApiProperty({
    title: 'Street',
    description: 'The full street address.',
    type: String,
  })
  @IsDefined()
  readonly street: string;

  @ApiProperty({
    title: 'Country',
    description: 'The ISO 3166-1 alpha-2 country code.',
    type: String,
  })
  @IsDefined()
  readonly country: string;

  @ApiProperty({
    title: 'Postal Code',
    description: 'The postal code. In API versions 2018-05-22 and earlier.',
    type: String,
  })
  @IsDefined()
  readonly postal_code: string;

  @ApiProperty({
    title: 'Region',
    description: 'The region or state. In API versions 2018-05-22 and earlier.',
    type: String,
  })
  @IsDefined()
  readonly region: string;
}

class Address {
  @ApiProperty({
    required: true,
    type: DataAddress,
    title: 'Data',
    description: 'Data about the components comprising an address.',
  })
  @IsDefined()
  readonly data: DataAddress;

  @ApiProperty({
    title: 'Primary',
    description:
      'When true, identifies the address as the primary address on an account.',
    type: Boolean,
  })
  @IsBoolean()
  @IsDefined()
  readonly primary: boolean;
}
class PhoneNumber {
  @ApiProperty({
    title: 'Data',
    description: 'The phone number.',
    type: String,
  })
  @IsDefined()
  readonly data: string;

  @ApiProperty({
    title: 'Primary',
    description:
      'When true, identifies the phone number as the primary number on an account.',
    type: Boolean,
  })
  @IsBoolean()
  @IsDefined()
  readonly primary: boolean;

  @ApiProperty({
    title: 'Type',
    description: 'The type of phone number.',
    type: String,
  })
  @IsDefined()
  readonly type: string;
}
class Email {
  @ApiProperty({
    title: 'Data',
    description: 'The email address.',
    type: String,
  })
  @IsDefined()
  readonly data: string;

  @ApiProperty({
    title: 'Primary',
    description:
      'When true, identifies the email address as the primary email on an account.',
    type: Boolean,
  })
  @IsBoolean()
  @IsDefined()
  readonly primary: boolean;

  @ApiProperty({
    title: 'Type',
    description:
      'The type of email account as described by the financial institution.',
    type: String,
  })
  @IsDefined()
  readonly type: string;
}

export class OwnerDto {
  @ApiProperty({
    title: 'Address',
    description:
      'Data about the various addresses associated with the account by the financial institution.',
    type: [Address],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => Address)
  readonly addresses: Address[];

  @ApiProperty({
    title: 'Names',
    description:
      'A list of names associated with the account by the financial institution.',
    type: [String],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @IsDefined()
  readonly names: string[];

  @ApiProperty({
    title: 'PhoneNumbers',
    description:
      'A list of phone numbers associated with the account by the financial institution.',
    type: [PhoneNumber],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => PhoneNumber)
  readonly phone_numbers: PhoneNumber[];

  @ApiProperty({
    title: 'Emails',
    description:
      'A list of email addresses associated with the account by the financial institution. ',
    type: [Email],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => Email)
  readonly emails: Email[];
}
