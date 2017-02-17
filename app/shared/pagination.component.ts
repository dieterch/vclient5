import { 
	Component,
	Input, 
	Output, 
	EventEmitter }   from '@angular/core';
import { OnChanges } from '@angular/core';

@Component({
	selector: 'pagination',
    template: `
    <nav *ngIf="items.length > pageSize">
        <ul class="pagination">
            <li [class.disabled]="currentPage == 1" (click)="changePage((currentPage - this.pageSize) > 1 ? (currentPage - this.pageSize) : 1) ">
                <!--span aria-hidden="true">&laquo;</span-->
				<span class="glyphicon glyphicon-fast-backward" aria-hidden="true"></span>
            </li>
			<li [class.disabled]="currentPage == 1">
                <a (click)="previous()" aria-label="Previous">
				<span class="glyphicon glyphicon-step-backward" aria-hidden="true"></span>
                </a>
            </li>

            <!--li [class.active]="currentPage == page" *ngFor="let page of pages" (click)="changePage(page)">
                <a>{{ page }}</a>
            </li-->

			<li> 
				<a>{{ (currentPage - 1) * this.pageSize + 1 }} - {{ currentPage * this.pageSize }} ({{ this.items.length }})</a> 
			</li>

            <li [class.disabled]="currentPage == pages.length + 1">
                <a (click)="next()" aria-label="Next">
				<span class="glyphicon glyphicon-step-forward" aria-hidden="true"></span>
                </a>
            </li>
            <li [class.disabled]="currentPage == pages.length + 1" (click)="changePage((currentPage + this.pageSize) < pages.length ? (currentPage + this.pageSize) : pages.length)">
				<span class="glyphicon glyphicon-fast-forward" aria-hidden="true"></span>
            </li>
        </ul>
    </nav>  
`
})


export class PaginationComponent implements OnChanges {
    @Input() items = [];
	@Input('page-size') pageSize = 5;
	@Output('page-changed') pageChanged = new EventEmitter();
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

	next(){
		if (this.currentPage == (this.pages.length + 1))
			return; 
		
		this.currentPage++;
		this.pageChanged.emit(this.currentPage);
	}
}