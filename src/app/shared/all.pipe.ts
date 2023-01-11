import { DomSanitizer } from '@angular/platform-browser'
import { PipeTransform, Pipe } from "@angular/core";

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value : any) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filter: Record<string, any>): any {
    if (!items || !filter) {
      return items;
    }

    const key = Object.keys(filter)[0];
    const value = filter[key];

    return items.filter((e) => e[key].indexOf(value) !== -1);
  }
}