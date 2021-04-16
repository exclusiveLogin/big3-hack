import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {URLS} from 'src/app/models';

@Component({
    selector: 'app-photo',
    templateUrl: './photo.component.html',
    styleUrls: ['./photo.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoComponent implements OnInit {
    public urls: { url: string, id: number }[] = URLS;
    activeURL: string;
    @Input() public set currentPhoto(value){
        console.log('curPhoto ID input', value);
        this.activeURL = this.urls.find(u => u.id === value)?.url || URLS[0].url;
    }
    constructor() {
    }
    ngOnInit(): void {

    }
}
