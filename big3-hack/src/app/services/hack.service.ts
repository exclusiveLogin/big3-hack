import {Injectable} from '@angular/core';
import {ApiService, IUserInfo} from 'src/app/services/api.service';
import {BehaviorSubject, merge, Subject} from 'rxjs';
import {debounceTime, delay} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HackService {

    attempTrottler$ = new Subject();
    onAttemp$ = this.attempTrottler$.pipe(debounceTime(1000));
    constructor(private api: ApiService) {
        console.log('HackService:', this);
        this.onAttemp$.subscribe(() => !this.finish && this.attemp());
    }
    selectedUser: string;
    activeGroup: string[] = [];

    repoUsersIds: string[];
    iterrationUsersIds: string[];
    fineGroups: Array<string>[] = [];
    finish = false;

    countAttempsAll$ = new BehaviorSubject<number>(0);
    countAttempsSuccess$ = new BehaviorSubject<number>(0);
    countAttempsDenied$ = new BehaviorSubject<number>(0);
    countGroups$ = new BehaviorSubject<number>(0);
    finishState$ = new BehaviorSubject<boolean>(false);
    ledWSping$ = this.api.onPing$;
    ledWSattempt$ = new Subject();

    onProgressInGroups$ = new  BehaviorSubject(0);
    onProgressInAll$ = new  BehaviorSubject(0);
    onLog$ = new Subject<string>();

    onUsers$ = new BehaviorSubject<{ [key: number]: IUserInfo}>({});

    startHack(): void {
        this.repoUsersIds = Object.keys(this.api.getInitData()).map(i => (+i + 1).toString());
        merge(
            this.api.onResultSuccess$,
            this.api.onUsersGroupDataReceive$,
        ).subscribe(_ => {
            if (_){
                console.log('PNI');
                this.onLog$.next(JSON.stringify(_));
                this.iterationDone();
                this.countGroups$.next(this.countGroups$.value + 1);
                this.onUsers$.next(_);
            } else {
                this.countAttempsSuccess$.next(this.countAttempsSuccess$.value + 1);
                this.activeGroup.push(this.selectedUser);
                this.attempTrottler$.next();
            }
        });
        this.api.onResultDenied$.pipe().subscribe(_ => {
            this.countAttempsDenied$.next(this.countAttempsDenied$.value + 1);
            const idx = this.iterrationUsersIds.indexOf(this.selectedUser);
            // tslint:disable-next-line:no-bitwise
            if (!!~idx) this.iterrationUsersIds.splice(idx, 1);
            this.attempTrottler$.next();
        });

        this.api.onFinish$.subscribe(f => {
            this.finish = true;
            this.finishState$.next(true);
            console.log('FINISHED:', this.fineGroups);
            this.onProgressInGroups$.next(100);
            this.onProgressInAll$.next(100);
            // f.d.t1 = 'Поздравляем, '
            this.onLog$.next(JSON.stringify(f));
        });

        this.iterationDone();
    }


    private attemp(): void {
        if(this.finish) return;
        this.countAttempsAll$.next(this.countAttempsAll$.value + 1);
        this.ledWSattempt$.next(true);
        console.log('attemp:', this.selectedUser, this.iterrationUsersIds, this.activeGroup);
        this.selectedUser = this.selectNewUser();
        if (this.selectedUser){
            const data = {t: 'pc', d: [...this.activeGroup.map(i => +i), +this.selectedUser]};
            this.api.sendData(data);
            // @ts-ignore
            const prc = +this.selectedUser / Math.max(...this.iterrationUsersIds.map(id => +id)) * 100;
            this.onProgressInGroups$.next(prc);
        }

    }

    private iterationDone(): void {
        if (this.activeGroup.length) this.fineGroups.push([].concat(...this.activeGroup));
        this.activeGroup = [];
        // @ts-ignore
        this.iterrationUsersIds = [].concat(...this.repoUsersIds.filter(id => !(this.fineGroups.flat().some(i => i === id))));
        this.attempTrottler$.next();
        const prc = (this.repoUsersIds.length - this.iterrationUsersIds.length) / this.repoUsersIds.length * 100;
        this.onProgressInAll$.next(prc);
        this.onProgressInGroups$.next(0);
    }

    private selectNewUser(): string {
        return this.iterrationUsersIds.splice(0, 1)[0];
    }


}
