
import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { HttpModule }          from '@angular/http';

import { SharedModule }        from '../shared/shared.module';

import { AufnahmenComponent }     from './aufnahmen.component';
import { AufnahmeComponent }     from './aufnahme.component';
import { AufnahmeService }     from './aufnahme.service';
import { UserService }         from '../users/user.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        HttpModule
    ],
    declarations: [
        AufnahmenComponent,
        AufnahmeComponent 
    ],
    exports: [
        AufnahmenComponent 
    ],
    providers: [
        AufnahmeService,
        UserService
    ]
})
export class AufnahmenModule { 
}