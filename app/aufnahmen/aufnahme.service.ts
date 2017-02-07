import { Injectable } from '@angular/core';
import { Http } 	  from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AufnahmeService {
	private _url = "http://jsonplaceholder.typicode.com/posts";
	private _url1 = "http://192.168.11.8:8002/recordings.json?start=0&limit=100";

	constructor(private _http: Http) {
	}

	getAufnahmen() {
		var url = this._url1;
		// console.log(this._http.get(url))
		return this._http.get(url)
			.map(res => {
				var myres = res.json();

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

				// Ein Feld ergänzen
				myres.recordings.forEach(aufnahme => {
					aufnahme.imageurl = "http://192.168.11.8:5100/images/" + aufnahme.name + ".jpg";
					aufnahme.streamurl = "vlc-x-callback://x-callback-url/stream?url=http://192.168.11.8:3000/" + aufnahme.inode + ".rec";
				});

				return myres
			});
	}

	getPosts(filter?) {
        var url = this._url;
        
        if (filter && filter.userId)
            url += "?userId=" + filter.userId;
        
		return this._http.get(url)
			.map(res => res.json());
	}
    
	getComments(postId){
		return this._http.get(this._url + "/" + postId + "/comments")
			.map(res => res.json());
	}
}