import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  limit: number;

  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  offset: number;

  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  firstPage: number;

  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  lastPage: number;
}
