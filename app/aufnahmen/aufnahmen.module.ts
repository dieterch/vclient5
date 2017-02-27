
import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { FormsModule, 
         ReactiveFormsModule } from '@angular/forms';
import { RouterModule }        from '@angular/router';
import { HttpModule }           from '@angular/http';
import { SharedModule }         from '../shared/shared.module';

import { Aufnahme }             from './aufnahme';
import { AufnahmeFormComponent } from './aufnahme-form.component';
import { AufnahmenComponent }   from './aufnahmen.component';
import { AufnahmeComponent }    from './aufnahme.component';
// import { AufnahmeService }     from './aufnahme.service';
import { VdrService }           from '../shared/vdr.service';
// import { UserService }          from '../users/user.service';
import { PreventUnsavedChangesGuard } from '../prevent-unsaved-changes-guard.service';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        RouterModule,
        HttpModule
    ],
    declarations: [
        AufnahmenComponent,
        AufnahmeComponent, 
        AufnahmeFormComponent 
    ],
    exports: [
        AufnahmeFormComponent, 
        AufnahmenComponent 
    ],
    providers: [
//        AufnahmeService,
        VdrService,
        PreventUnsavedChangesGuard
    ]
})
export class AufnahmenModule { 
}