import { Component, OnInit } from '@angular/core';

import { AufnahmeService }   from './aufnahme.service';
import { UserService }       from '../users/user.service';

import * as _ from 'underscore'; 

@Component({
    templateUrl: 'app/aufnahmen/aufnahmen.component.html',
    styles: [`
        .posts li { cursor: default; }
        .posts li:hover { background: #ecf0f1; } 
        .aufnahmen li { cursor: default; }
        .aufnahmen li:hover { background: #ecf0f1; } 
        .list-group-item.active, 
        .list-group-item.active:hover, 
        .list-group-item.active:focus { 
            background-color: #ecf0f1;
            border-color: #ecf0f1; 
            color: #2c3e50;
        }
    `]
})
export class AufnahmenComponent implements OnInit {
    aufnahmen = [];
    aufnahmenLoading;
    pagedAufnahmen = [];
    currentAufnahme;

	posts = [];
    postsLoading;
    pagedPosts = [];
    currentPost;
    
    users = [];
    commentsLoading;
    pageSize = 10;
    
    constructor(
        private _postService: AufnahmeService,
        private _aufnahmeService: AufnahmeService,
        private _userService: UserService) {
	}

	ngOnInit() {
        this.loadUsers();
        this.loadPosts();
        this.loadAufnahmen();        
	}
    
    private loadUsers(){
        this._userService.getUsers()
            .subscribe(users => this.users = users);
    }
    
    private loadPosts(filter?){
        this.postsLoading = true; 
		this._postService.getPosts(filter)
			.subscribe(
                posts => {
                    this.posts = posts;
                    this.pagedPosts = _.take(this.posts, this.pageSize);
                    // console.log(this.pagedPosts)
                },
                null,
                () => { this.postsLoading = false; });
    }

    private loadAufnahmen(){
        this.aufnahmenLoading = true;
        this._aufnahmeService.getAufnahmen()
            .subscribe(
                aufnahmen => {
                    this.aufnahmen = aufnahmen.recordings;
                    // console.log(this.aufnahmen)
                    this.pagedAufnahmen = _.take(this.aufnahmen, this.pageSize);
                },
                null,
                () => { this.aufnahmenLoading = false; });
    }
    
    reloadPosts(filter){
        this.currentPost = null;
        
        this.loadPosts(filter);
    }
    
    select(post){
		this.currentPost = post; 
        
        this.commentsLoading = true;
        this._postService.getComments(post.id)
			.subscribe(
                comments => 
                    this.currentPost.comments = comments,
                null,
                () => this.commentsLoading = false); 
    } 

    select2(aufnahme){
		this.currentAufnahme = aufnahme; 
    } 


	onPageChanged(page) {
        var startIndex = (page - 1) * this.pageSize;
        this.pagedPosts = _.take(_.rest(this.posts, startIndex), this.pageSize);
        this.pagedAufnahmen = _.take(_.rest(this.aufnahmen, startIndex), this.pageSize);
	}
}