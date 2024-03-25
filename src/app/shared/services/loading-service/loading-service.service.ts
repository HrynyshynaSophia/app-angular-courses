import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isLoading!: boolean;
  toggleLoading(loading: boolean) {
    this.isLoading = loading;
  }
}
