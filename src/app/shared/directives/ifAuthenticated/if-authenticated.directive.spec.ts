import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { IfAuthenticatedDirective } from './if-authenticated.directive';

@Component({
    template: `
    <ng-template [appIfAuthenticated]="condition">
        <p>Authenticated content</p>
    </ng-template>
`,
})
class TestComponent {
    condition!: boolean;
}

describe('IfAuthenticatedDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [IfAuthenticatedDirective, TestComponent],
        }).compileComponents();
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
    });

    it('should render content when condition is true', () => {
        testComponent.condition = true;
        fixture.detectChanges();
        const paragraphElement = fixture.nativeElement.querySelector('p');
        expect(paragraphElement).toBeTruthy();
        expect(paragraphElement.textContent).toContain('Authenticated content');
    });

    it('should not render content when condition is false', () => {
        testComponent.condition = false;
        fixture.detectChanges();
        const paragraphElement = fixture.nativeElement.querySelector('p');
        expect(paragraphElement).toBeFalsy();
    });
});
