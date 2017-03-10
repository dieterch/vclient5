import { Component, OnInit } from '@angular/core';
import { VdrService }   from '../shared/vdr.service';
import { AufnahmeComponent}  from './aufnahme.component';
import * as _ from 'underscore'; 

@Component({
    templateUrl: 'app/aufnahmen/aufnahmen.component.html',
    styles: [`
        .searchline {
            padding 10px;
        }

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
    oldpagesize = 10;
    categories = [];
    private _filter = null;
    private _category = null;
    
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

    onResize($event) {
        // console.log(window.innerWidth, window.innerHeight);
        this.pageSize = this.calcPageSize();
        if (this.oldpagesize != this.pageSize) {
            this.reloadAufnahmen();
            this.oldpagesize = this.pageSize
        }
    }

    calcPageSize() {
        let x=0; 
        let y=0;
        if (window.innerWidth < 768) {
            // console.log(" 1 ");
            x = 1;
        } else 
        if (window.innerWidth < 990) {
            // console.log(" 2 ")
            x = 2;
        } else
        if (window.innerWidth < 1200 ) {
            // console.log(" 3 ")
            x = 3;
        } else {
            // console.log(" 4 ")
            x = 4;
        }
        y = Math.floor(window.innerHeight / 150) -1 ;
        console.log("Pagesize: ", x*y)
        return x*y
    }
}