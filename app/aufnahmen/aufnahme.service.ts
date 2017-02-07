import { Injectable } from '@angular/core';
import { Http } 	  from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AufnahmeService {
	private _url = "http://jsonplaceholder.typicode.com/posts";
	private _url1 = "http://192.168.11.8:8002/recordings.json?start=0&limit=10";

	constructor(private _http: Http) {
	}

	getAufnahmen() {
		var url = this._url1;
		// console.log(this._http.get(url))
		return this._http.get(url)
			.map(res => res.json());
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