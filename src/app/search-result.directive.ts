import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appSearchResult]'
})
export class SearchResultDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
