import { Component, Input, Output, EventEmitter }   from '@angular/core';
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
  `]  
})

export class AufnahmeComponent {
    @Input() myrecord;

    toDate(epoch) {
      return new Date( epoch * 1000);
    }

    constructor(
        private _vdrService: VdrService) {           
	  }
    
    getRecordImageUrl(aufnahme) {
       return this._vdrService.getRecordImageUrl(aufnahme);
    }

    ellipse(text, l) {
      return text.slice(0,l) + '...';
    }

    showdialog(rec) {
      console.log(rec);
    }
}