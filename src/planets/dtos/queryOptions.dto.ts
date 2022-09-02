import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { PaginationQueryDto } from './paginationQuery.dto';

export class QueryOptionsDto extends PaginationQueryDto {
  @Type(() => String)
  @IsOptional()
  name?: string;

  @Type(() => String)
  @IsOptional()
  rotation_period?: string;

  @Type(() => String)
  @IsOptional()
  orbital_period?: string;

  @Type(() => String)
  @IsOptional()
  diameter?: string;

  @Type(() => String)
  @IsOptional()
  climate?: string;

  @Type(() => String)
  @IsOptional()
  gravity?: string;

  @Type(() => String)
  @IsOptional()
  terrain?: string;

  @Type(() => String)
  @IsOptional()
  surface_water?: string;

  @Type(() => String)
  @IsOptional()
  population?: string;

  @Type(() => String)
  @IsOptional()
  residents?: Array<string>;

  @Type(() => String)
  @IsOptional()
  films?: Array<string>;

  @Type(() => String)
  @IsOptional()
  created?: string;

  @Type(() => String)
  @IsOptional()
  edited?: string;

  @Type(() => String)
  @IsOptional()
  url?: string;
}

export interface IQueryOptions {
  planet: {
    name?: string;
    rotation_period?: string;
    orbital_period?: string;
    diameter?: string;
    climate?: string;
    gravity?: string;
    terrain?: string;
    surface_water?: string;
    population?: string;
    residents?: Array<string>;
    films?: Array<string>;
    created?: string;
    edited?: string;
    url?: string;
  };
  pagination: {
    limit?: number;
    offset?: number;
  };
}
