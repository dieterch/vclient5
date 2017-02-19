import { Component, Input, Output, EventEmitter }   from '@angular/core';
import { VdrService }   from '../shared/vdr.service';

@Component({
	selector: 'recording',
    template: `
    <div class="media-left">
      <a [href]="myrecord.streamurl">
        <img class="media-object smallposter" src="{{ myImage }}" alt="...">
      </a>
    </div>
    <div class="media-body">
      <h4 class="media-heading">{{ myrecord.event_title }}</h4>
      {{ toDate(myrecord.event_start_time) | date:'d.M.yyyy' }}, {{ myrecord.event_duration / 60 | number : '1.0-0' }}'<br>
    </div>  
    `
})

export class AufnahmeComponent {
    @Input() myrecord;
    @Input() myImage;

    constructor(
        private _vdrService: VdrService) {           
	  }
    
    toDate(epoch) {
      return new Date( epoch * 1000);
    }
}