import { 
	Component,
	Input, 
	Output, 
	EventEmitter }   from '@angular/core';
import { OnChanges } from '@angular/core';

@Component({
	selector: 'pagination',
    template: `
    <!-- div *ngIf="items.length > pageSize"-->
	<div class="mypagination">
		<div class="buttonrow">
			<a class="btn btn-default btn-sm" role="button " [class.disabled]="currentPage == 1" (click)="changePage((currentPage - this.pageSize) > 1 ? (currentPage - this.pageSize) : 1) ">
				<span class="fa fa-fast-backward fa-lg " aria-hidden="true"></span>
			</a>
			<a class="btn btn-default btn-sm" role="button " [class.disabled]="currentPage == 1" (click)="previous()" aria-label="Previous">
				<span class="fa fa-step-backward fa-lg " aria-hidden="true"></span>
			</a>		
			<span>
				{{ (currentPage - 1) * this.pageSize + 1 }} - {{ currentPage * this.pageSize }} ({{ this.items.length }})
			</span> 
			<a class="btn btn-default btn-sm" role="button " [class.disabled]="currentPage == pages.length + 1" (click)="next()" aria-label="Next">
				<span class="fa fa-step-forward fa-lg " aria-hidden="true"></span>
			</a>
			<a class="btn btn-default btn-sm" role="button " [class.disabled]="currentPage == pages.length + 1" (click)="changePage((currentPage + this.pageSize) < pages.length ? (currentPage + this.pageSize) : pages.length)">
				<span class="fa fa-fast-forward fa-lg " aria-hidden="true"></span>
			</a>
			<a class="btn btn-default btn-sm" role="button " (click)="resetPage()">
				<span class="fa fa-circle-thin fa-lg " aria-hidden="true"></span>
			</a>
		<div>
    </div>  
	`,
	styles: [`
		.mypagination {
			float: right;
			margin: 8px auto;
			padding-right: 20px;
		}
	`]
})


export class PaginationComponent implements OnChanges {
    @Input() items = [];
	@Input('page-size') pageSize = 5;
	@Output('page-changed') pageChanged = new EventEmitter();
	@Output('page-reset') pageReset = new EventEmitter();
	pages: any[];
	currentPage; 

	ngOnChanges(){
        this.currentPage = 1;
        
		var pagesCount = this.items.length / this.pageSize; 
		this.pages = [];
		for (var i = 1; i <= pagesCount; i++)
			this.pages.push(i);
	}

	changePage(page){
		this.currentPage = page; 
		this.pageChanged.emit(page);
	}

	previous(){
		if (this.currentPage == 1)
			return;

		this.currentPage--;
		this.pageChanged.emit(this.currentPage);
	}

	resetPage(){
		this.pageReset.emit();
	}

	next(){
		if (this.currentPage == (this.pages.length + 1))
			return; 
		
		this.currentPage++;
		this.pageChanged.emit(this.currentPage);
	}
}