
import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';

import { PaginationComponent } from './pagination.component';
import { SpinnerComponent }    from './spinner.component';

import { VdrService }     from './vdr.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        PaginationComponent, 
        SpinnerComponent
    ],
    exports: [
        PaginationComponent, 
        SpinnerComponent
    ],
    providers: [
        VdrService
    ]
})
export class SharedModule { 
}