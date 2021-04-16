import {Component, OnInit} from '@angular/core';
import {ApiService} from 'src/app/services/api.service';
import {HackService} from 'src/app/services/hack.service';

@Component({
    selector: 'app-person-table',
    templateUrl: './person-table.component.html',
    styleUrls: ['./person-table.component.css']
})
export class PersonTableComponent implements OnInit {

    constructor(private api: ApiService, private hack: HackService) {
    }

    names: string[] = [];
    photos: number[] = [];
    users = this.api.onInitDataReceive$;

    ngOnInit(): void {
        this.hack.onUsers$.subscribe((userData) => {
            Object.keys(userData).forEach((idx) => {
                this.names[+idx] = userData[+idx].n;
                this.photos[+idx] = userData[+idx].i;
            });
        });
    }

    getPhotoByIdx(idx: number): number {
        return this.photos[idx];
    }

    getNameById(idx: number): string {
        return this.names[idx];
    }

}
