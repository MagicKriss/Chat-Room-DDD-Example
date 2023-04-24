import { ZodTypeAny, input, output, z } from 'nestjs-zod/z';
import { Err, Ok, Result } from 'src/api-utils/result.type';

export function parseQueryParam<
  T extends ZodTypeAny,
  Output = output<T>,
  Input = input<T>,
>(
  parser: z.ZodEffects<T, Output, Input> | z.ZodType<Output>,
  param: unknown,
): Result<Output, string> {
  const result = parser.safeParse(param);
  if (result.success) {
    return Ok(result.data);
  }
  return Err(result.error.errors?.[0].message ?? result.error.message);
}
