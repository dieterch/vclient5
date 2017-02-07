
import { RouterModule  }     from '@angular/router';

import { AufnahmenComponent }    from './aufnahmen.component';

export const aufnahmenRouting = RouterModule.forChild([
    { path: 'aufnahmen', component: AufnahmenComponent }
]);