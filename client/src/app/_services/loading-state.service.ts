import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingStateService {

  

  constructor(private spinnerService: NgxSpinnerService) { }

  loading(){  
    this.spinnerService.show(undefined, {
      type: 'line-scale-party',
      bdColor:'rgba(255,255,255,0)',
      color: '#333333'
    });
  }

  idle(){
    this.spinnerService.hide();
  }
}
