import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DurationPipe } from 'src/app/shared/pipes/durationpipe/duration.pipe';
import { CourseCardComponent } from './course-card.component';
import { BorderChangeDirective } from 'src/app/shared/directives/border-change/border-change.directive';
import { CourseService } from 'src/app/shared/services/courseService/course-service.service';

describe('CourseCardComponent', () => {
    let component: CourseCardComponent;
    let fixture: ComponentFixture<CourseCardComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CourseCardComponent, BorderChangeDirective, DurationPipe],
            providers: [CourseService],
            imports: [HttpClientTestingModule, RouterTestingModule],
        });
        fixture = TestBed.createComponent(CourseCardComponent);
        component = fixture.debugElement.children[0].componentInstance;
        component.course = {
            id: 8693,
            name: 'duis mollit reprehenderit ad',
            description:
                'Est minim ea aute sunt laborum minim eu excepteur. Culpa sint exercitation mollit enim ad culpa aliquip laborum cillum. Dolor officia culpa labore ex eiusmod ut est ea voluptate ea nostrud.',
            isTopRated: false,
            date: '2017-09-28T04:39:24+00:00',
            authors: [
                {
                    id: 1370,
                    name: 'Polly',
                },
            ],
            length: 157,
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should display course information corectly', () => {
        const element = fixture.nativeElement;
        const courseTitle = element.querySelector('.course__title');
        const courseDuration = element.querySelector('.course__duration');
        const courseDate = element.querySelector('.course__date');
        const courseDescription = element.querySelector('.course__description');
        expect(courseTitle.textContent.toLowerCase()).toContain(
            component.course.name
        );
        expect(courseDuration.textContent).toContain('2h 37min');
        expect(courseDate.textContent).toContain('09/28/2017');
        expect(courseDescription.textContent).toContain(
            component.course.description
        );
    });
    it('should handle course deletion', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        fixture.detectChanges();
        component.onDeleteCourse();
        expect(window.confirm).toHaveBeenCalledWith(
            'Are you really want to delete this course?'
        );
    });
});
