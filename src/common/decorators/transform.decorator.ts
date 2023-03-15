/* tslint:disable:naming-convention */

import { Transform, TransformFnParams } from 'class-transformer';

export function Trim() {
  return Transform((params: TransformFnParams) => {
    const value = params.value;
    if (Array.isArray(value)) {
      return value.map((v) => v.trim());
    }
    return value.trim();
  });
}
