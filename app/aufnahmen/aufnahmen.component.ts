import { Component, OnInit } from '@angular/core';

import { AufnahmeService }   from './aufnahme.service';

import * as _ from 'underscore'; 

@Component({
    templateUrl: 'app/aufnahmen/aufnahmen.component.html',
    styles: [`
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
    pageSize = 10;
    
    constructor(
        private _aufnahmeService: AufnahmeService) {
	}

	ngOnInit() {
        this.loadAufnahmen();        
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
    
    select2(aufnahme){
		this.currentAufnahme = aufnahme; 
    } 

	onPageChanged(page) {
        var startIndex = (page - 1) * this.pageSize;
        this.pagedAufnahmen = _.take(_.rest(this.aufnahmen, startIndex), this.pageSize);
	}
}