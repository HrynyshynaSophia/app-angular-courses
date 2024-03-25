import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DurationComponent } from './duration.component';
import { DurationPipe } from 'src/app/shared/pipes/durationpipe/duration.pipe';
describe('DurationComponent', () => {
  let component: DurationComponent;
  let fixture: ComponentFixture<DurationComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DurationComponent, DurationPipe],
      imports: [FormsModule]
    });
    fixture = TestBed.createComponent(DurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
