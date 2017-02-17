import { 
	Component,
	Input, 
	Output, 
	EventEmitter }   from '@angular/core';

@Component({
	selector: 'recording',
    template: `
    <div class="media-left">
      <a href="#">
        <img class="media-object smallposter" src="{{ myrecord.imageurl }}" alt="...">
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

    toDate(epoch) {
      return new Date( epoch * 1000);
    }
}