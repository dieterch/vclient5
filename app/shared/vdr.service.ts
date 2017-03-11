import { Injectable, OnInit } from '@angular/core';
import { HTTP_PROVIDERS, Http, Request, RequestMethod } from '@angular/http';
import { DomSanitizationService } from '@angular/platform-browser';

import 'rxjs/add/operator/map';
import * as _ from 'underscore';

@Injectable()
export class VdrService implements OnInit {
	private _vdrurl = "http://192.168.11.8";
	private _restproxyurl = this._vdrurl + ":8080";
	// private _restproxyurl = "http://localhost:8080";
	private _resturl = this._vdrurl + ":8002";
	private _pyresturl = this._vdrurl + ":5100";
    _filter = null;
    _category = null;	
    private _keys = {
         "Up" : this._resturl + "/remote/Up",
         "Down" : this._resturl + "/remote/Down",
         "Menu" : this._resturl + "/remote/Menu",
         "Ok" : this._resturl + "/remote/Ok",
         "Back" : this._resturl + "/remote/Back",
         "Left" : this._resturl + "/remote/Left",
         "Right" : this._resturl + "/remote/Right",
         "Red" : this._resturl + "/remote/Red",
         "Green" : this._resturl + "/remote/Green",
         "Yellow" : this._resturl + "/remote/Yellow",
         "Blue" : this._resturl + "/remote/Blue",
         "0" : this._resturl + "/remote/0",
         "1" : this._resturl + "/remote/1",
         "2" : this._resturl + "/remote/2",
         "3" : this._resturl + "/remote/3",
         "4" : this._resturl + "/remote/4",
         "5" : this._resturl + "/remote/5",
         "6" : this._resturl + "/remote/6",
         "7" : this._resturl + "/remote/7",
         "8" : this._resturl + "/remote/8",
         "9" : this._resturl + "/remote/9",
         "Info" : this._resturl + "/remote/Info",
         "Play" : this._resturl + "/remote/Play",
         "Pause" : this._resturl + "/remote/Pause",
         "Stop" : this._resturl + "/remote/Stop",
         "Record" : this._resturl + "/remote/Record",
         "FastFwd" : this._resturl + "/remote/FastFwd",
         "FastRew" : this._resturl + "/remote/FastRew",
         "Next" : this._resturl + "/remote/Next",
         "Prev" : this._resturl + "/remote/Prev",
         "ChanUp" : this._resturl + "/remote/ChanUp",
         "ChanDn" : this._resturl + "/remote/ChanDn",
         "ChanPrev" : this._resturl + "/remote/ChanPrev",
         "VolUp" : this._resturl + "/remote/VolUp",
         "VolDn" : this._resturl + "/remote/VolDn",
         "Mute" : this._resturl + "/remote/Mute",
         "Audio" : this._resturl + "/remote/Audio",
         "Recordings" : this._resturl + "/remote/Recordings"
         /*Subtitles, Schedule, Channels, Timers, Setup, Commands, User0, User1, User2, User3, User4, User5, User6, User7, User8, User9, None, Kbd */
    }


	constructor(private _http: Http, private sanitizer: DomSanitizationService) {
	}

	ngOnInit() {
	}

    isMobile(): boolean {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile/i.test(navigator.userAgent);
    }

// --------- Recordings Start -------------

	getRecordingsCategories() {
		let url = this._restproxyurl+ "/categories";	
		return this._http.get(url)
			.map(res => {
				return res.json().categories;
			});	
	}

	getRecordings(query?, category?, sort?) {
		let url = this._restproxyurl+ "/aufnahmen";
		let myquery = "";
		if (query) 		{ myquery = myquery + "&query=" + query;}
		if (category) 	{ myquery = myquery + "&category=" + category;}
		if (sort) 		{ myquery = myquery + "&sort=" + sort;}
		if (myquery != "") { url = url + "?" + myquery.slice(1);}
		// console.log(url);
		return this._http.get(url)
			.map(res => res.json());
	}

	getRecording(Id){
		return this._http.get(this.getAufnahmeUrl(Id))
			.map(res => {
				// respose im json format lesen
				var myres = res.json();
				return myres.recordings[0];
			});
	}

	private getAufnahmeUrl(Id?) {
		return this._restproxyurl + '/aufnahmen/' + Id;
	}
// --------- Recordings End -------------

// ---------- Record Start --------------	

	getRecordImageUrl(rec?) {
		if (rec) {
			return this._pyresturl + "/images/" + rec.event_title + ".jpg";
		}
	}

	getAltImageUrl() {
		return this._pyresturl + "/images/404-page-not-found-image.jpg";
		// return this._pyresturl + "/images/no%20poster.jpg";
	}

	pressKey(key?) {
        if (key) {
			var _lurl = this._keys[key];
			this._http.request(new Request({
                method: RequestMethod.Post,
                url: _lurl})).subscribe();
        }	
    }

	playRecordonTV(rec?) {
		if (rec) {
			var _lurl = this._resturl + "/recordings/play" + rec.file_name;
			this._http.request(new Request({
                method: RequestMethod.Post,
                url: _lurl})).subscribe();	
		}
    }

	playRecordonTVCont(rec?) {
		if (rec) {
			var _lurl = this._resturl + "/recordings/play" + rec.file_name;
			this._http.request(new Request({
                method: RequestMethod.Get,
                url: _lurl})).subscribe();	
		}
    }

	streamRecordUrl(rec?) {
		if (rec) {
            var _lurl;
			if (this.isMobile()) {
                _lurl = "vlc-x-callback://x-callback-url/stream?url=" + this._vdrurl + ":3000/" + rec.inode + ".rec";
            }  else {
                _lurl = this._pyresturl + "/playpc/" + rec.number;
            }
            return this.sanitizer.bypassSecurityTrustUrl(_lurl);
		}
	}

// ---------- Record End --------------	



}