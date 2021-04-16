import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { PersonTableComponent } from './components/person-table/person-table.component';
import { PhotoComponent } from './components/photo/photo.component';
import { BfBlockComponent } from './components/bf-block/bf-block.component';
import { StatisticComponent } from './components/bf-block/components/statistic/statistic.component';
import { GroupsComponent } from './components/bf-block/components/groups/groups.component';
import { AttempTableComponent } from './components/bf-block/components/attemp-table/attemp-table.component';
import { AnonumCardComponent } from './components/anonum-card/anonum-card.component';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    PersonTableComponent,
    PhotoComponent,
    BfBlockComponent,
    StatisticComponent,
    GroupsComponent,
    AttempTableComponent,
    AnonumCardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
