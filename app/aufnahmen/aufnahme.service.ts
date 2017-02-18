import { Injectable, OnInit } from '@angular/core';
import { Http } 	  from '@angular/http';
import { DomSanitizationService } from '@angular/platform-browser';

import 'rxjs/add/operator/map';
import * as _ from 'underscore';

@Injectable()
export class AufnahmeService implements OnInit {
	private _url = "http://192.168.11.8:8002";

	constructor(private _http: Http, private sanitizer: DomSanitizationService) {
	}

	ngOnInit() {
	}

	getCategories() {
		var url = this._url + "/recordings.json?start=0&limit=0";
		return this._http.get(url)
			.map(res => {
				var myres = res.json();
				var _cat = [];
				myres.recordings.forEach(rec => {
					_cat = _.union(_cat, rec.name.split('~').slice(0,-1));
					// console.log(rec.name, _cat)
				});
				return _cat.sort((n1,n2) => {
					if (n1 > n2) {
						return 1;
					}
					if (n1 < n2) {
						return -1;
					}
					return 0;
				});
			}
		);
	}

	getAufnahmen(filter?, category?) {
		var url = this._url + "/recordings.json?start=0&limit=0";
		// console.log(this._http.get(url))
		return this._http.get(url)
			.map(res => {

				// respose im json format lesen
				var myres = res.json();

				// myres nach category filtern
				if (category) {
					myres.recordings = myres.recordings.filter( rec => rec.name.indexOf(category) >=0 );
				}

				// myres filtern
				if (filter) {
					myres.recordings = myres.recordings.filter( rec => rec.event_title.indexOf(filter) >=0 );
				}

				// Sortieren nach titel
				myres.recordings.sort((n1,n2) => {
					if (n1.event_title > n2.event_title) {
						return 1;
					}
					if (n1.event_title < n2.event_title) {
						return -1;
					}
					return 0;
				})

				/*/ Sortieren Absteigend nach Datum
				myres.recordings.sort((n1,n2) => {
					if (n1.event_start_time > n2.event_start_time) {
						return 1;
					}
					if (n1.event_start_time < n2.event_start_time) {
						return -1;
					}
					return 0;
				}) */


				// Felder ändern/ergänzen
				myres.recordings.forEach(aufnahme => {
					aufnahme.imageurl = "http://192.168.11.8:5100/images/" + aufnahme.event_title + ".jpg";
					aufnahme.streamurl = this.sanitizer.bypassSecurityTrustUrl("vlc-x-callback://x-callback-url/stream?url=http://192.168.11.8:3000/" + aufnahme.inode + ".rec");
					aufnahme.openvlc = this.sanitizer.bypassSecurityTrustUrl("http://192.168.11.8:5100/playpc/" + aufnahme.number);
					//aufnahme.startonTv = this.sanitizer.bypassSecurityTrustUrl(this._url + "/recordings/play/" + encodeURIComponent(aufnahme.file_name));
					aufnahme.startonTv = this.sanitizer.bypassSecurityTrustUrl(this._url + "/recordings/play" + aufnahme.file_name);
				});

				return myres
			});
	}

}