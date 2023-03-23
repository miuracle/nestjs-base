import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class AppResponse<E> {
  @ApiProperty()
  status: boolean;

  @ApiProperty()
  code: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: E | E[];

  constructor(data: E | E[], status: boolean, code?: string, message?: string) {
    this.status = status;
    this.code = code;
    this.message = message;
    this.data = data;
  }

  static success<E, T>(entity: E | E[], model: new (E: any) => T): AppResponse<T | T[]> {
    const result: T | T[] = new model(entity);

    return new AppResponse(result, true, 'SUCCESS', 'SUCCESS');
  }

  static error(code: string, message?: string) {
    return new AppResponse(null, false, code, message);
  }
}

export const SwaggerApiAppResponse = <DataDto extends Type<unknown>>(dataDto: DataDto) =>
  applyDecorators(
    ApiExtraModels(AppResponse, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          {
            $ref: getSchemaPath(AppResponse),
          },
          {
            properties: {
              data: { $ref: getSchemaPath(dataDto) },
            },
          },
        ],
      },
    }),
  );

export const SwaggerApiListAppResponse = <DataDto extends Type<unknown>>(dataDto: DataDto) =>
  applyDecorators(
    ApiExtraModels(AppResponse, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          {
            $ref: getSchemaPath(AppResponse),
          },
          {
            properties: {
              data: { type: 'array', items: { $ref: getSchemaPath(dataDto) } },
            },
          },
        ],
      },
    }),
  );
