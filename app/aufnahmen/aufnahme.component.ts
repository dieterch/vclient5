import { Component, Input, Output, EventEmitter }   from '@angular/core';
import { VdrService }   from '../shared/vdr.service';

@Component({
	selector: 'recording',
      template: `
    <div class="col-sm-3 col-md-2">
      <div class="thumbnail">
        <div class="crop">
          <img class="poster" src="{{ this._vdrService.getRecordImageUrl(myrecord) }}" alt="kein Bild">
        </div>
        <div class="caption">
            <p>
              <a role="button" *ngIf="!myrecord.is_pes_recording" [href]="this._vdrService.streamRecordUrl(myrecord)"><span class="fa fa-caret-square-o-right fa-lg"></span></a>
              <a role="button" (click)="this._vdrService.playRecordonTV(myrecord)"><span class="fa fa-play-circle-o fa-lg"></span></a>
              <a role="button" (click)="this._vdrService.playRecordonTVCont(myrecord)"><span class="fa fa-play-circle fa-lg"></span></a>
              <a role="button" (click)="this._vdrService.pressKey('Stop')"><span class="fa fa-stop-circle-o fa-lg"></span></a>
            </p>
            <span class="title">{{ myrecord.event_title }}</span><br>
            <span class="text">{{ toDate(myrecord.event_start_time) | date:'d.M.yyyy' }}, {{ myrecord.event_duration / 60 | number : '1.0-0' }}'</span>
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