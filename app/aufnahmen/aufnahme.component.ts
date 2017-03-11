import { Component, Input, Output, EventEmitter }   from '@angular/core';
import { Router, ActivatedRoute }                   from '@angular/router';
import { VdrService }   from '../shared/vdr.service';

@Component({
	selector: 'recording',
  templateUrl: 'app/aufnahmen/aufnahme.component.html',
  styles: [`
    .postercontainer {
        max-width: 90px;
        float: left;
    }

    .poster {
        margin-top: 10px;
        height: 120px;
        width: 90px;
    }

    .postertext {
        float: left;
        margin-left: 5px;
        width: calc(100% - 100px);
        font-size: 80%;
    }

    #titeltext {
        margin-top: 0px;
        font-size: 150%;
    }

    #date_and_length {
        font-size: 70%;
    }

    .icons {
        vertical-align: bottom;
    }

    .record {
        padding: 5px;
        padding-top: 5px;
        padding-bottom: 5px;
        margin: 3px;
        // background-color: #707070;
        border: 1px solid rgba(86, 61, 124, .2);
        height: 150px;
        /* box-shadow: 2px 2px grey; */
    }

    .record:hover {
        background-color: #bfbfbf;
    }

  `]  
})

export class AufnahmeComponent {
    @Input() myrecord;

    toDate(epoch) {
      return new Date( epoch * 1000);
    }

    constructor( private _vdrService: VdrService,  
                 private _router: Router ) {
	}

    myerror($event) {
        $event.srcElement.src=this._vdrService.getAltImageUrl();
    }

    ellipse(text, l) {
      return text.slice(0,l) + '...';
    }

    showdialog(rec) {
      // console.log(rec);
      this._router.navigate(['aufnahmen', rec.number]);
    }

}