import {Component, OnInit} from '@angular/core';
import {URLS} from 'src/app/models';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

    constructor() {
    }

    photosIds = URLS.slice(1).map(i => i.id);

    ngOnInit(): void {
    }

}
