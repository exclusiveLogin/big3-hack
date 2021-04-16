import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {filter, map, mapTo, shareReplay} from 'rxjs/operators';

export interface IData {
    t: string;
    d: any;
}

export interface IInitDataUserInfo extends IData {
    d: string[];
}

export interface INamedDataUserInfo extends IData {
    d: {
        [key: number]: IUserInfo
    };
}
export interface IFinishInfo extends IData {
    d: {
        t0: string;
        t1: string;
    };
}

export interface IUserInfo {
    n: string;
    i: number;
}

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    ws: WebSocket;
    initData: string[];

    onWSMessage$ = new Subject();
    onDataReceive$: Observable<IData> = this.onWSMessage$.pipe(
        filter((raw: any) => !!raw?.data),
        map(raw => JSON.parse(raw.data)),
    );
    onInitDataReceive$: Observable<string[]> = this.onDataReceive$.pipe(
        filter((data: IInitDataUserInfo) => data?.t === 'pi'),
        map(data => data.d),
        shareReplay(1),
    );
    onAttempResultReceive$: Observable<INamedDataUserInfo> = this.onDataReceive$.pipe(
        filter(data => data?.t === 'pc')
    );
    onResultSuccess$: Observable<null> = this.onAttempResultReceive$.pipe(
        filter(data => !!data?.d),
        mapTo(null),
    );
    onResultDenied$: Observable<null> = this.onAttempResultReceive$.pipe(
        filter(data => !data?.d),
        mapTo(null),
    );
    onUsersGroupDataReceive$: Observable<{ [key: number]: IUserInfo }> = this.onDataReceive$.pipe(
        filter(data => data?.t === 'pni'),
        map((data) => data.d)
    );
    onFinish$: Observable<IFinishInfo> = this.onDataReceive$.pipe(
        filter(data => data?.t === 'f'),
        map((data) => data.d)
    );

    onPing$: Observable<null> = this.onDataReceive$.pipe(
        filter(data => data?.t === 'p'),
        mapTo(null),
    );


    constructor() {
        this.ws = new WebSocket('wss://anjelika-petrova.com/ws-big5-private:3001');


        this.ws.onopen = () => {
            this.ws.onmessage = (ev) => this.onWSMessage$.next(ev);
        };
        this.onInitDataReceive$.subscribe(data => {
            this.initData = data;
            console.log('ws: init data ', this.initData);
        });
    }

    getInitData(): string[] {
        return this.initData;
    }

    sendData(data: any): void {
        this.ws.send(JSON.stringify(data));
    }

}
