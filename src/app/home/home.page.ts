import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {trigger, transition, state, style, animate} from '@angular/animations';
import {Content, ModalController, Slides} from '@ionic/angular';
import {Inch17} from './17-inch';
import {Inch19} from './19-inch';
import {DomSanitizer} from '@angular/platform-browser';


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
        trigger('car', [
            state('1', style({})),
            state('2', style({
                bottom: '70vw'
            })),
            state('3', style({
                bottom: '80vw'
            })),
            transition('1 => 2', animate('700ms ease-out')),
            transition('2 => 3', animate('700ms ease-out')),
            transition('3 => 2', animate('700ms ease-in')),
            transition('2 => 1', animate('700ms ease-in'))
        ]),
        trigger('secondBlock', [
            state('1', style({
                height: '80%'
            })),
            state('2', style({
                height: '70%'
            })),
            state('3', style({
                height: '62%'
            })),
            state('4', style({
                height: '45%'
            })),
            transition('1 => 2', animate('900ms ease-out')),
            transition('2 => 3', animate('900ms ease-out')),
            transition('3 => 4', animate('900ms ease-out')),
            transition('4 => 3', animate('900ms ease-in')),
            transition('3 => 2', animate('900ms ease-in')),
            transition('2 => 1', animate('900ms ease-in'))
        ]),
        trigger('scy', [
            state('1', style({})),
            state('2', style({
                left: '-55px'
            })),
            state('3', style({
                left: '-100px'
            })),
            transition('1 => 2', animate('700ms ease-out')),
            transition('2 => 3', animate('700ms ease-out')),
            transition('3 => 2', animate('700ms ease-in')),
            transition('2 => 1', animate('700ms ease-in'))
        ])
    ]
})

export class HomePage {


    name: string;
    car = '1';
    scy = '1';

    select = false;
    wheel = false;
    dimension = false;
    perfomance = false;
    @ViewChild(Content)
    content: Content;
    position = 0;
    topCar = 57;
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
    currentImage = '1.png';

    fullScreen = false;
    eng = true;
    ar = false;

    home = true;
    heritage = false;
    table = false;
    footer = false;

    @ViewChild(Slides) slides: Slides;

    public basicSliderVal: number;
    sliderHistory = 20;
    sliderGallery = 20;


    constructor(public el: ElementRef,
                private inch17: Inch17,
                private inch19: Inch19,
                private sanitizer: DomSanitizer,
                private modalCtrl: ModalController) {
        this.currentInch = inch19;
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

    full() {
        this.fullScreen = true;
    }

    closeFull() {
        this.fullScreen = false;
    }

    closeRight() {
        this.carRight = '1';
    }

    closeLeft() {
        this.carleft = '1';
    }

    expendAll() {
        this.wheel = true;
        this.dimension = true;
        this.perfomance = true;
    }

    onScroll(event) {
        console.log(event.detail.scrollTop);
        this.getActiveItemMenu(event.detail.scrollTop);
        if (this.position > event.detail.scrollTop) {
            let height = event.detail.scrollTop;
            this.position = height;
            height = height / 1000;
            this.topCar = this.topCar - height;
        } else if (this.position < event.detail.scrollTop) {
            if (event.detail.scrollTop >= 0) {
                let height = event.detail.scrollTop;
                this.position = height;
                height = height / 1000;
                this.topCar = 57 + height;
            }
        }
    }

    getActiveItemMenu(position) {
        if (position >= 0 && position < 1600) {
            this.home = true;
            this.heritage = false;
            this.table = false;
            this.footer = false;
        } else if (position >= 1600 && position < 3400) {
            this.home = false;
            this.heritage = true;
            this.table = false;
            this.footer = false;
        } else if (position >= 3400 && position < 4400) {
            this.home = false;
            this.heritage = false;
            this.table = true;
            this.footer = false;
        } else if (position >= 4400 && position < 7000) {
            this.home = false;
            this.heritage = false;
            this.table = false;
            this.footer = true;
        }
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
        this.slides.slideTo(image, 500);
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

    scrollTo(className: string): void {
        const elementList = document.querySelectorAll('.' + className);
        const element = elementList[0] as HTMLElement;
        element.scrollIntoView({behavior: 'smooth'});
    }
}
