import {Component, OnInit} from '@angular/core';
import {URLS} from 'src/app/models';
import {HackService} from 'src/app/services/hack.service';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

    constructor(private hack: HackService) {
    }

    photosIds = URLS.slice(1).map(i => i.id);
    usedPhotos = [];

    isUsed(idx: number): boolean {
        return !!~this.usedPhotos.indexOf(idx);
    }

    ngOnInit(): void {
        this.hack.onUsers$.subscribe(usersInfo => {
            this.usedPhotos.push(...Object.values(usersInfo).map(data => data.i));
        });
    }

}
