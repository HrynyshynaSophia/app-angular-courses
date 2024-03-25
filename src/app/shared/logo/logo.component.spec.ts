import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoComponent } from './logo.component';

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogoComponent],
    });
    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display logo correctly', () => {
    const logoElement = fixture.nativeElement.querySelector('.logo');
    const logoImgElement = fixture.nativeElement.querySelector('.logo img');
    const textContent = logoElement.textContent.trim();
    expect(logoImgElement.alt).toBe('logo');
    expect(textContent).toBe('VIDEO COURSE');
  });
});
