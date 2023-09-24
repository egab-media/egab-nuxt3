export const getUnitWithPxAsDefault = (value?: string | number) => {
  if (!value) { return value }

  const _value = isNumber(value) ? String(value) : value

  const num = parseInt(_value, 10)
  const unit = _value.slice(num.toString().length)

  return num + (unit || 'px')
}

export function clamp(val: number, min: number, max: number) {
  if (val < min) { return min }
  if (val > max) { return max }
  return val
}

/**
 * @method isNumber
 * Checks if a value is a number
 * @param value - Value to be checked
 * @returns A boolean indicating whether the value is a number or not.
 */
export const isNumber = (value: unknown): value is number => typeof value === 'number'
/**
 *  @method isString
 *  Checks if a value is a string.
 * @param value - The value to be checked.
 * @returns A boolean indicating whether the value is a string or not.
 */
export const isString = (value: unknown): value is string => typeof value === 'string'
/**
 * @method isBoolean
 * Checks if a value is a boolean.
 * @param value - The value to be checked.
 * @returns A boolean indicating whether the value is a boolean or not.
 */
export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean'
/**
 * @method isFunction
 * Checks if a value is a function.
 * @param value - The value to check.
 * @returns True if the value is a function, false otherwise.
 */
export const isFunction = (value: unknown): value is Function => typeof value === 'function'
