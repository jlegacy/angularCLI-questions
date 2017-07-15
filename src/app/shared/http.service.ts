import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class HttpService {
    public headers: Headers;

    constructor(private _http: Http) {
        this.headers = new Headers();  //*******
        this.headers.append('Content-Type', 'application/json') //******
    }
 
    post(url, data) {
        return this._http.post(url, data, { headers: this.headers }).map(res => res.json())
    }
    put(url, data) {
        return this._http.put(url, data, { headers: this.headers }).map(res => res.json())
    }
    delete(url) {
        return this._http.delete(url).map(res => res.json())
    }
    get(url) {
        return this._http.get(url).map(res => res.json())
    }

}