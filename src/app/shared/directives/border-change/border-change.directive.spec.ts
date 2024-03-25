// import { BorderChangeDirective } from './border-change.directive';
// import { ElementRef, Component } from '@angular/core';
// import { TestBed, ComponentFixture } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// @Component({
//     template: `<div [appBorderChange]="date"></div>`
// })
// class TestComponent {
//     date!: string;
// }

// describe('BorderChangeDirective', () => {
//     let fixture: ComponentFixture<TestComponent>;
//     let testElement: DebugElement;
//     let directive: BorderChangeDirective;
//     let component: TestComponent;
//     let elementRefMock: ElementRef;

//     beforeEach(async () => {
//         elementRefMock   = {
//             nativeElement: {
//               style: {
//                 border: ''
//               }
//             }
//         };
//         fixture = TestBed.configureTestingModule({
//             declarations: [BorderChangeDirective, TestComponent],
//             providers: [
//                 { provide: ElementRef, useValue: elementRefMock }
//             ]
//         })
//             .createComponent(TestComponent);
//         fixture.detectChanges();
//         testElement = fixture.debugElement.query(By.directive(BorderChangeDirective));
//         directive = testElement.injector.get(BorderChangeDirective);
//         component = fixture.componentInstance;
        
//     });

//     it('should create an instance', () => {
//         expect(directive).toBeTruthy();
//     });
//     it('should change border to green if creation date is within the last 14 days', () => {
//         const currentDate = new Date();
//         const creationDate = new Date(currentDate.getDate() - 7);
//         directive.date = creationDate.toISOString();
    
//         directive.ngAfterViewInit();
    
//         expect(elementRefMock.nativeElement.style.border).toBe('2px solid rgb(155, 200, 55)');
//     });

// });
// import { ElementRef, Component } from '@angular/core';

// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { BorderChangeDirective } from './border-change.directive';
// @Component({
//     template: `<div [appBorderChange]="date"></div>`
//   })
//   class TestComponent {
//     date!: string;
//   }
// describe('BorderChangeDirective', () => {
//   let directive: BorderChangeDirective;
//   let fixture: ComponentFixture<TestComponent>;
//   let elementRefMock: ElementRef;

//   beforeEach(() => {
//     elementRefMock = {
//       nativeElement: {
//         style: {
//           border: ''
//         }
//       }
//     };

//     TestBed.configureTestingModule({
//       declarations: [BorderChangeDirective, TestComponent],
//       providers: [
//         { provide: ElementRef, useValue: elementRefMock }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(TestComponent);
//     directive = fixture.debugElement.injector.get(BorderChangeDirective);
//   });

//   it('should set border color to green if creation date is within the last 14 days', () => {
//     const currentDate = new Date();
//     const creationDate = new Date(currentDate.getDate() - 7);
//     directive.date = creationDate.toISOString();

//     directive.ngAfterViewInit();

//     expect(elementRefMock.nativeElement.style.border).toBe('2px solid rgb(155, 200, 55)');
//   });

//   it('should set border color to blue if creation date is in the future', () => {
//     const currentDate = new Date();
//     const creationDate = new Date(currentDate.getDate() + 7);
//     directive.date = creationDate.toISOString();

//     directive.ngAfterViewInit();

//     expect(elementRefMock.nativeElement.style.border).toBe('2px solid rgb(48, 182, 221)');
//   });

//   it('should not change border color if creation date is older than 14 days', () => {
//     const currentDate = new Date();
//     const creationDate = new Date(currentDate.getDate() - 21);
//     directive.date = creationDate.toISOString();

//     directive.ngAfterViewInit();

//     expect(elementRefMock.nativeElement.style.border).toBe('');
//   });
// });


