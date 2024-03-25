import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationPipe'
})
export class DurationPipe implements PipeTransform {
  transform(duration: number): string {
    if (duration) {
      if (duration < 60) {
        return `${duration} min`
      }
      else {
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        return `${hours}h ${minutes}min`
      }
    }
    return ''
  }
}
