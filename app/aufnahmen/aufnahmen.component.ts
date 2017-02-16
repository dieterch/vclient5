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
    categories = [];
    private _filter = null;
    private _category = null;
    
    constructor(
        private _aufnahmeService: AufnahmeService) { 
          
	}

	ngOnInit() {
        this.loadAufnahmen();
        this.loadCategories();        
	}
    
    private loadAufnahmen(filter?, category?){
        this.aufnahmenLoading = true;
        console.log(filter, category);
        this._aufnahmeService.getAufnahmen(filter, category)
            .subscribe(
                aufnahmen => {
                    this.aufnahmen = aufnahmen.recordings;
                    // console.log(this.aufnahmen)
                    this.pagedAufnahmen = _.take(this.aufnahmen, this.pageSize);
                },
                null,
                () => { this.aufnahmenLoading = false; });
    }

    reloadAufnahmen(){
        this.currentAufnahme = null;
        this.loadAufnahmen(this._filter, this._category);
    }

    reloadAufnahmenFilter(filter){
        this._filter = filter;
        this.reloadAufnahmen();
    }

    reloadAufnahmenCategory(category){
        this._category = category;
        this.reloadAufnahmen();
    }

    loadCategories() {
        this._aufnahmeService.getCategories()
            .subscribe(cats => {
                this.categories = cats;
            });
	}

    select(aufnahme){
		this.currentAufnahme = aufnahme; 
    } 

	onPageChanged(page) {
        var startIndex = (page - 1) * this.pageSize;
        this.pagedAufnahmen = _.take(_.rest(this.aufnahmen, startIndex), this.pageSize);
	}
}