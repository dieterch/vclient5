import { Component, Input, Output, EventEmitter }   from '@angular/core';
import { VdrService }   from '../shared/vdr.service';

@Component({
	selector: 'recording',
      template: `
    <div class="col-sm-3 col-md-2">
      <div class="thumbnail">
        <img class="poster" src="{{ this._vdrService.getRecordImageUrl(myrecord) }}" alt="{{ this._vdrService.getAltImageUrl()}}">
        <div class="caption">
            <small><b>{{ myrecord.event_title }}</b></small><br>
            <small>{{ toDate(myrecord.event_start_time) | date:'d.M.yyyy' }}, {{ myrecord.event_duration / 60 | number : '1.0-0' }}'</small>
        </div>
      </div>
    </div>  
    `
/*    template: `
    <div class="media-left">
      <a [href]="myrecord.streamurl">
        <img class="media-object smallposter" src="{{ getRecordImageUrl(myrecord) }}" alt="...">
      </a>
    </div>
    <div class="media-body">
      <h4 class="media-heading">{{ myrecord.event_title }}</h4>
      {{ toDate(myrecord.event_start_time) | date:'d.M.yyyy' }}, {{ myrecord.event_duration / 60 | number : '1.0-0' }}'
      <!--br>
      <a class="btn btn-primary" role="button" [href]="streamRecordUrl(myrecord)">Stream</a>
      <button type=" button " class="btn btn-primary " (click)="playRecordonTV(myrecord)">Start on TV</button -->
    </div>  
    ` */
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


}