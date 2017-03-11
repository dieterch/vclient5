import { Component, OnInit } from '@angular/core';
import { VdrService }   from '../shared/vdr.service';
import { AufnahmeComponent}  from './aufnahme.component';
import * as _ from 'underscore'; 

@Component({
    templateUrl: 'app/aufnahmen/aufnahmen.component.html',
    styles: [`
        .debug1 {
            background-color: yellow;
        }

        .debug2 {
            background-color: lightblue;
        }

        .searchbox {
            margin: 2 auto;
            max-width: 250px;        
        }      

        .categorybox {
            margin: 2 auto;
            max-width: 250px;        
        }

    `]
})
export class AufnahmenComponent implements OnInit {
    aufnahmen = [];
    aufnahmenLoading;
    pagedAufnahmen = [];
    currentAufnahme;
    pageSize = 10;
    oldpagesize = 10;
    categories = [];
    
    constructor(
        private _vdrService: VdrService ) { 
	}

	ngOnInit() {
        this.loadAufnahmen();
        this.loadCategories();
	}
    
    private loadAufnahmen(query?, category?){
        this.aufnahmenLoading = true;
        //console.log(filter, category);
        this.pageSize = this.calcPageSize();
        let sort = "date-reverse"
        this._vdrService.getRecordings(query, category, sort)
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
        this.loadAufnahmen(this._vdrService._filter, this._vdrService._category);
    }

    reloadAufnahmenFilter(filter){
        this._vdrService._filter = filter;
        this.reloadAufnahmen();
    }

    reloadAufnahmenCategory(category){
        this._vdrService._category = category;
        this.reloadAufnahmen();
    }

    loadCategories() {
        this._vdrService.getRecordingsCategories()
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

    onReset() {
        this._vdrService._filter = null;
        this._vdrService._category = null;
        this.reloadAufnahmen();
    }

    onResize($event) {
        this.pageSize = this.calcPageSize();
        if (this.oldpagesize != this.pageSize) {
            this.reloadAufnahmen();
            this.oldpagesize = this.pageSize
        }
    }

    calcPageSize() {
        let x=0; 
        let y=0;
        if (window.innerWidth < 768)   { x = 1; } else 
        if (window.innerWidth < 990)   { x = 2; } else
        if (window.innerWidth < 1200 ) { x = 3; } else 
                                       { x = 4;}
        y = Math.floor(window.innerHeight / 150);
        // console.log("Pagesize: ", x*y)
        return x*y
    }
}