import { Component, OnInit }                     from '@angular/core';
import { FormBuilder, FormGroup, Validators }    from '@angular/forms';
import { Router, ActivatedRoute }                from '@angular/router';

import { BasicValidators }                       from '../shared/basicValidators';
import { VdrService }                            from '../shared/vdr.service';
import { Aufnahme }                              from './aufnahme';

@Component({
    templateUrl: 'app/aufnahmen/aufnahme-form.component.html'
})
export class AufnahmeFormComponent implements OnInit {
	form: FormGroup;
    title: string;
    aufnahme = new Aufnahme();

	constructor(
        fb: FormBuilder,
        private _router: Router,
        private _route: ActivatedRoute,
        private _vdrService: VdrService
    ) {
		this.form = fb.group({
			name: ['', Validators.required],
			email: ['', BasicValidators.email],
			phone: [],
            number: [],
            file_name: [],
            relative_file_name: [],
            inode: [],
            is_new: [],
            is_edited: [],
            is_pes_recording: [],
            duration: [],
            filesize_mb: [],
            channel_id: [],
            frames_per_second: [],
            event_title: [],
            event_short_text: [],
            event_description: [],
            event_start_time: [],
            event_duration: [],
            aux: []
		});
	}
    
    ngOnInit(){
        var id = this._route.params.subscribe(params => {
            
            var id = +params["id"];

            this.title = id ? "Edit User" : "New User";
            
            if (!id)
                return;
                
            this._vdrService.getRecording(id)
                .subscribe(
                    record => {
                        this.aufnahme = record;
                        console.log(record);    
                    },
                    response => {
                        if (response.status == 404) {
                            this._router.navigate(['NotFound']);
                        }
                    });
        });
    }
    
    save(){
        var result;
        /*
        if (this.user.id) 
            result = this._userService.updateUser(this.user);
        else
            result = this._userService.addUser(this.user)
        */
		// result.subscribe(x => {
            // Ideally, here we'd want:
            // this.form.markAsPristine();
            // this._router.navigate(['aufnahmen']);
        //});
        this._router.navigate(['aufnahmen']);
	}
}