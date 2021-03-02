import { Directive, EventEmitter, HostListener, Output, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
@Directive({
	selector: '[uppercase]'
})
export class UpperCaseDirective {
	constructor(private el: ElementRef, private control: NgControl) {
    }

    @HostListener('input', ['$event']) onEvent($event) {
        const str: string = this.control.value;
        this.control.control.setValue(str.toUpperCase());
    }
}
