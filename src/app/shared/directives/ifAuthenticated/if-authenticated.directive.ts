import { Directive, TemplateRef, Input, ViewContainerRef } from '@angular/core';
@Directive({
  selector: '[appIfAuthenticated]',
})
export class IfAuthenticatedDirective {
  @Input() set appIfAuthenticated(condition: boolean) {
    if (condition) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {}
}
