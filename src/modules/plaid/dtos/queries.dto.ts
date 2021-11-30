import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, Matches } from 'class-validator';
export class AccessTokenDto {
  @ApiProperty({
    description: 'Access Token',
    title: 'Access Token',
  })
  @Matches(
    /^(access-sandbox)-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
  )
  access_token: string;
}

export class QueryTransactionsDto extends AccessTokenDto {
  @ApiProperty({
    description: 'Start Date',
    title: 'Start Date',
  })
  @IsDateString()
  @IsOptional()
  start_date: string;

  @ApiProperty({
    description: 'End Date',
    title: 'End Date',
  })
  @IsDateString()
  end_date: string;
}
