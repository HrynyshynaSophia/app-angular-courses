/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  forwardRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Author } from 'src/app/shared/models/author.model';
import {
  selectAuthors,
  selectSelectedCourse,
} from 'src/app/store/courses/courses.selectors';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LiveAnnouncer } from '@angular/cdk/a11y';
@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AuthorsComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AuthorsComponent),
      multi: true,
    },
  ],
})
export class AuthorsComponent
  implements OnInit, ControlValueAccessor, Validator
{
  selectedAuthorsNames: string[] = [];
  selectedAuthors: Author[] = [];
  allAuthors: Author[] = [];
  authorsNames: string[] = [];
  onChange: any = () => {};
  onTouched: any = () => {};

  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredAuthors: Observable<string[]>;
  @ViewChild('authorInput') authorInput!: ElementRef<HTMLInputElement>;
  constructor(
    private announcer: LiveAnnouncer,
    private store: Store,
    private cdr: ChangeDetectorRef
  ) {
    this.filteredAuthors = this.authorCtrl.valueChanges.pipe(
      startWith(null),
      map((author: string | null) =>
        author ? this._filter(author) : this.authorsNames.slice()
      )
    );
    this.authorCtrl.valueChanges.subscribe((value) => {
      this.onChange(value);
      this.onTouched();
    });
  }
  authorCtrl = new FormControl('', [this.requiredValidator.bind(this)]);

  writeValue(value: any): void {
    this.authorCtrl.setValue(value);
  }

  ngOnInit(): void {
    this.selectedAuthorsNames = [];
    this.store.select(selectAuthors).subscribe((authors) => {
      this.authorsNames = [...authors.map((author) => author.name)];
      this.filteredAuthors = this.authorCtrl.valueChanges.pipe(
        startWith(null),
        map((author: string | null) =>
          author ? this._filter(author) : this.authorsNames.slice()
        )
      );
      this.allAuthors = authors;
    });
    this.store.select(selectSelectedCourse).subscribe((course) => {
      if (course) {
        course.authors.forEach((author) => {
          this.selectedAuthorsNames.push(author.name);
        });
        this.cdr.detectChanges();
      }
    });
    

  }
  validate(): ValidationErrors | null {
    return this.authorCtrl.errors;
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.selectedAuthorsNames.push(value);
    }
  }

  remove(author: string): void {
    const index = this.selectedAuthorsNames.indexOf(author);

    if (index >= 0) {
      this.selectedAuthorsNames.splice(index, 1);
      this.announcer.announce(`Removed ${author}`);
      this.onTouched();
    }
  }

  selected(): void { }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.authorsNames.filter((author) =>
      !author.toLowerCase().includes(filterValue)
    );
  }
  private requiredValidator(): { [key: string]: any } | null {
    if (this.selectedAuthorsNames.length === 0) {
      return { authorsEmpty: true };
    }
    return null;
  }
}
