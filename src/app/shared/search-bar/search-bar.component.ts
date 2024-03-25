import { Component, Output, EventEmitter, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit, AfterViewInit, OnDestroy{
  searchName='';
  searchNameChanged: Subject<string> = new Subject<string>();
  inputSubscription!: Subscription;
  searchForm!: FormGroup;
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  constructor(
    private fb: FormBuilder
  ){}
  ngOnInit(): void {
    this.searchForm=this.fb.group({
      searchName: ['']
    })
  }
  ngAfterViewInit(): void {
    this.inputSubscription=this.searchNameChanged
    .pipe(debounceTime(500))
    .subscribe(searchName=>{
      if(searchName.length>=3 || searchName.length===0){
        this.search.emit(searchName)
      }
    })
  }
  onSubmit() {
    const searchName = this.searchForm.get('searchName')?.value;
    this.searchNameChanged.next(searchName);
    
  }
  ngOnDestroy(): void {
    this.inputSubscription.unsubscribe()
  }
}
