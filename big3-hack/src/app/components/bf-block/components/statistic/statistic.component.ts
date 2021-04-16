import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HackService} from 'src/app/services/hack.service';

@Component({
    selector: 'app-statistic',
    templateUrl: './statistic.component.html',
    styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

    constructor(public hack: HackService) {
    }

    ledWS = false;
    ledAttemp = false;
    progressAll = 0;
    progressGroup = 0;

    @ViewChild('log') log: ElementRef;

    ngOnInit(): void {
        this.hack.ledWSping$.subscribe(() => {
            this.ledWS = true;
            setTimeout(() => this.ledWS = false, 90);
        });

        this.hack.ledWSattempt$.subscribe(() => {
            this.ledAttemp = true;
            setTimeout(() => this.ledAttemp = false, 90);
        });

        this.hack.onProgressInGroups$.subscribe((val) => {
            this.progressGroup = val;
        });

        this.hack.onProgressInAll$.subscribe((val) => {
            this.progressAll = val;
        });

        this.hack.onLog$.subscribe(logStr => {
            const el = document.createElement('p');
            el.innerHTML = logStr;
            this.log.nativeElement.insertBefore(el, null);
            el.scrollIntoView({behavior: 'smooth'});
        });
    }

}
