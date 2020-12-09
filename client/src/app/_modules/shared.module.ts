import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {NgxGalleryModule} from '@kolkov/ngx-gallery';
import { NgxSpinnerModule  } from 'ngx-spinner';
import { FileUploadModule } from 'ng2-file-upload';
import {PaginationModule } from 'ngx-bootstrap/pagination';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import { TimeagoModule } from 'ngx-timeago'



@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    BsDropdownModule.forRoot(),
    TabsModule,
    NgxGalleryModule,
    NgxSpinnerModule,
    FileUploadModule,
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    TimeagoModule.forRoot() 
    
  ],
  exports:[
    ToastrModule,
    BsDropdownModule,
    TabsModule,
    NgxGalleryModule,
    NgxSpinnerModule,
    FileUploadModule,
    PaginationModule,
    ButtonsModule,
    TimeagoModule
    
  ]
})
export class SharedModule { }
