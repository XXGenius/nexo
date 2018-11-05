import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {HomePage} from './home.page';
import {Inch19} from './19-inch';
import {Inch17} from './17-inch';
import {ModalGalleryModule} from '@ks89/angular-modal-gallery';
import 'hammerjs';
import 'mousetrap';
import {SlidersModule} from '../lib';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SlidersModule,
        ModalGalleryModule.forRoot(),
        RouterModule.forChild([
            {
                path: '',
                component: HomePage
            }
        ])
    ],
    declarations: [HomePage],
    providers: [Inch19, Inch17]
})
export class HomePageModule {
}
