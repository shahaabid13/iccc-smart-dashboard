import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to reduce an array of objects to a sum of a specific property
 * Usage: {{ arrayOfObjects | reduce: 'propertyName':initialValue }}
 * Example: {{ stations | reduce: 'bikesTotal':0 }}
 */
@Pipe({
  name: 'reduce',
  standalone: true,
})
export class ReducePipe implements PipeTransform {
  transform<T>(array: T[], property: keyof T, initialValue: number = 0): number {
    if (!Array.isArray(array)) {
      return initialValue;
    }

    return array.reduce((sum, item) => {
      const value = item[property];
      const numValue = typeof value === 'number' ? value : 0;
      return sum + numValue;
    }, initialValue);
  }
}
