import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { ValidationException } from 'src/exception/validation.exception';

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  async transform(
    value: string,
    { metatype }: ArgumentMetadata,
  ): Promise<string> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const obj = plainToClass(metatype, value);
    const errors = await validate(obj, { skipMissingProperties: true });

    if (errors.length) {
      const messages = errors.map(err => {
        return `${err.property} - ${Object.values(err.constraints).join(', ')}`;
      });

      throw new ValidationException(messages);
    }

    return value;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private toValidate(metatype: Function): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const types: Function[] = [String, Boolean, Number, Array, Object];

    return !types.includes(metatype);
  }
}
