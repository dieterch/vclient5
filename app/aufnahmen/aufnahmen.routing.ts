
import { RouterModule  }     from '@angular/router';

import { AufnahmeFormComponent } from './aufnahme-form.component';
import { AufnahmenComponent }    from './aufnahmen.component';
import { PreventUnsavedChangesGuard } from '../prevent-unsaved-changes-guard.service';

export const aufnahmenRouting = RouterModule.forChild([
	{ 
		path: 'aufnahmen/:id', 
		component: AufnahmeFormComponent,
		canDeactivate: [ PreventUnsavedChangesGuard ]  
	},
    { path: 'aufnahmen', component: AufnahmenComponent }
]);