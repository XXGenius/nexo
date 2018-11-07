import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {trigger, transition, state, style, animate} from '@angular/animations';
import {Content, ModalController, Slides} from '@ionic/angular';
import {Inch17} from './17-inch';
import {Inch19} from './19-inch';
import {DomSanitizer} from '@angular/platform-browser';
import {isNumber} from 'util';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    animations: [
        trigger('carLeft', [
            state('1', style({
                display: 'none',
                width: '17vw'
            })),
            state('2', style({
                display: 'block',
                width: '80vw'
            })),
            transition('1 => 2', animate('500ms ease-out')),
            transition('2 => 1', animate('500ms ease-in'))
        ]),
        trigger('carRight', [
            state('1', style({
                display: 'none',
                width: '17vw',
                left: '68vw'
            })),
            state('2', style({
                display: 'block',
                width: '80vw',
                left: '5vw'
            })),
            transition('1 => 2', animate('500ms ease-out')),
            transition('2 => 1', animate('500ms ease-in'))
        ]),
        trigger('openClose', [
            // ...
            state('open', style({
                width: '4%'
            })),
            state('closed', style({
                width: '0%'
            })),
            transition('open => closed', [
                animate('0.3s')
            ]),
            transition('closed => open', [
                animate('0.4s')
            ]),
        ]),
        trigger('slider', [
            // ...
            state('open', style({
                'padding-left': '5%'
            })),
            state('closed', style({
                'padding-left': '50%'
            })),
            transition('open => closed', [
                animate('0.5s')
            ]),
            transition('closed => open', [
                animate('0.5s')
            ]),
        ])
    ]
})

export class HomePage {


    name: string;
    car = '1';
    scy = '1';

    select = false;
    wheel = true;
    dimension = false;
    perfomance = false;
    @ViewChild(Content)
    content: Content;
    position = 0;

    carleft = '1';
    carRight = '1';
    url: any;
    currentInch = {
        title: '',
        maxSpeed: '',
        acceleration: '',
        brakingDistance: '',
        frontWheel: '',
        rearWheel: '',
        frontWheels: '',
        rearWheels: '',
        frontTires: '',
        rearTires: ''
    };

    isOpen = true;

    eng = true;
    ar = false;

    home = true;
    heritage = false;
    table = false;
    footer = false;

    lastPos = 0;

    thirdCar = 1;
    slideStart = false;

    fullScreen = 1;

    @ViewChild(Slides) slides: Slides;

    sliderHistory = 20;
    sliderGallery = 20;

    tapSecond = 5;
    nexoTop = 7;
    topCar = 57;
    scyFirst = 5;
    firstHeight = 83;
    sliderCarPadding = 50;
    secondBottom = 0;

    scySecond = 13;
    carBlockTop = 152;
    carBottom = 42;

    thirdBlockBottom = 29;

    @ViewChild('widgetsContent', {read: ElementRef}) public widgetsContent: ElementRef<any>;

    constructor(public el: ElementRef,
                private inch17: Inch17,
                private inch19: Inch19) {
        this.currentInch = inch19;

    }

    tapMouse() {
        this.isOpen = !this.isOpen;
    }


    scrollToTop(pos) {
        pos = pos - this.position;
        this.content.scrollByPoint(0, pos, 500);
    }

    arabian() {
        this.ar = true;
        this.eng = false;
    }

    english() {
        this.ar = false;
        this.eng = true;
    }

    showRight() {
        this.carRight = '2';
    }

    showLeft() {
        this.carleft = '2';
    }

    closeRight() {
        this.carRight = '1';
    }

    closeLeft() {
        this.carleft = '1';
    }


    onScroll(event) {
        console.log(event.detail.scrollTop);
        this.position = event.detail.scrollTop;
        const raz = event.detail.scrollTop - this.lastPos;
        const height = raz * 0.030;
        this.lastPos = event.detail.scrollTop;
        this.getActiveItemMenu(event.detail.scrollTop);
        if (event.detail.scrollTop > 0 && event.detail.scrollTop <= 133) {
            this.nexoTop = this.nexoTop + height * 4;
            this.scyFirst = this.scyFirst + height;
            this.secondBottom = this.secondBottom + height * 5;
            this.topCar = this.topCar + height;
        } else if (event.detail.scrollTop >= 133 && event.detail.scrollTop <= 255) {
            if (event.detail.scrollTop >= 133 && event.detail.scrollTop <= 177) {
                this.nexoTop = this.nexoTop + height * 4;
                this.scyFirst = this.scyFirst + height;
            }
            this.secondBottom = this.secondBottom + height * 5;
        } else if (event.detail.scrollTop >= 583 && event.detail.scrollTop <= 1000) {
            if (event.detail.scrollTop <= 703) {
                this.carBlockTop = this.carBlockTop - height * 3.8;
                this.scySecond = this.scySecond + height * 2;
                this.carBottom = this.carBottom + height;
                this.thirdBlockBottom = this.thirdBlockBottom + height * 3;
            } else if (event.detail.scrollTop > 703) {
                this.carBlockTop = 138.662;
                this.carBottom = 45;
                this.scySecond = 19;
                this.thirdBlockBottom = this.thirdBlockBottom + height * 5;
            }
        } else if (event.detail.scrollTop > 1000) {
            this.thirdBlockBottom = 83;
            this.carBlockTop = 138.662;
            this.carBottom = 45;
            this.scySecond = 19;
            if (event.detail.scrollTop >= 1131 && event.detail.scrollTop <= 1750) {
                this.thirdCar = this.thirdCar + raz / 25;
            } else if (event.detail.scrollTop >= 1750 && event.detail.scrollTop < 2500) {
                this.thirdCar = 26;
                this.slideStart = true;
            } else if (event.detail.scrollTop >= 2500) {
                this.thirdCar = 26;
                this.slideStart = false;
            }
        } else if (event.detail.scrollTop > 500) {
            this.postDefault();
        } else if (event.detail.scrollTop < 3) {
            this.defaultValue();
        } else if (event.detail.scrollTop >= 2000) {
            this.thirdCar = 26;
        }
    }


    postDefault() {
        this.sliderCarPadding = 50;
        this.nexoTop = 27.52;
        this.scyFirst = -10;
        this.topCar = 62;
        this.secondBottom = 37;
        this.thirdCar = 1;
    }


    defaultValue() {
        this.slideStart = false;
        this.nexoTop = 7;
        this.scyFirst = -4;
        this.topCar = 57;
        this.secondBottom = 0;
        this.thirdCar = 1;
        this.scySecond = 13;
        this.carBlockTop = 152;
        this.carBottom = 42;
        this.thirdBlockBottom = 29;
    }

    // 1358
    // 62,5 = 1px = 0.016vw;


    getActiveItemMenu(position) {
        if (position >= 0 && position < 1129) {
            this.home = true;
            this.heritage = false;
            this.table = false;
            this.footer = false;
        } else if (position >= 1129 && position < 3150) {
            this.home = false;
            this.heritage = true;
            this.table = false;
            this.footer = false;
        } else if (position >= 3150 && position < 4000) {
            this.home = false;
            this.heritage = false;
            this.table = true;
            this.footer = false;
        } else if (position >= 3900 && position < 7000) {
            this.home = false;
            this.heritage = false;
            this.table = false;
            this.footer = true;
        }
    }

    slideChanged() {
        return this.slides.getActiveIndex().then((data) => {
            this.widgetsContent.nativeElement.scrollTo({left: (data * 224), behavior: 'smooth'});
        });
    }

    @HostListener('scroll', ['$event'])
    onScrollY(event) {
        const sliderPercent = 0.6;
        const progress = (event.target.scrollLeft / 100) * 4.22;
        console.log(progress);
        console.log(event.target.scrollLeft);
        this.sliderHistory = 20 + sliderPercent * progress;
    }

    @HostListener('scroll', ['$event'])
    onScrollGallery(event) {
        const sliderPercent = 0.6;
        const progress = (event.target.scrollLeft / 100) * 1.5;
        console.log(progress);
        console.log(event.target.scrollLeft);
        this.sliderGallery = 20 + sliderPercent * progress;
    }

    getImage(image) {
        this.sliderGallery = 20 + (0.32 * image);
        this.slides.slideTo(image - 1, 500);
    }

    selectInch17() {
        this.currentInch = this.inch17;
        this.select = false;
    }

    selectInch19() {
        this.currentInch = this.inch19;
        this.select = false;
    }


    show() {
        this.select = !this.select;
    }

    showWheel() {
        this.wheel = !this.wheel;
    }

    showDimension() {
        this.dimension = !this.dimension;
    }

    showPerfomace() {
        this.perfomance = !this.perfomance;
        console.log(this.perfomance);
    }
}
