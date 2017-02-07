
import { NgModule }          from '@angular/core';
import { BrowserModule }     from '@angular/platform-browser';

import { SharedModule }      from './shared/shared.module';
import { UsersModule }       from './users/users.module';
import { PostsModule }       from './posts/posts.module';
import { AufnahmenModule }   from './aufnahmen/aufnahmen.module';

import { AppComponent }      from './app.component';
import { HomeComponent }     from './home.component';
import { NavBarComponent }   from './navbar.component';
import { NotFoundComponent } from './not-found.component';

import { usersRouting }      from './users/users.routing';
import { postsRouting }      from './posts/posts.routing';
import { aufnahmenRouting }  from './aufnahmen/aufnahmen.routing';
import { routing }           from './app.routing';

@NgModule({
    imports: [
        BrowserModule,
        SharedModule,
        UsersModule,
        PostsModule,
        AufnahmenModule,
        usersRouting,
        postsRouting,
        aufnahmenRouting,
        routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        NavBarComponent,
        NotFoundComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { 
}