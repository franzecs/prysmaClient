import {Directive, ElementRef, HostListener, Renderer} from '@angular/core'

@Directive({
    selector:'[ikUpCase]'
})
export class UpperDirective{

    public valor

    constructor(
        private el: ElementRef,
        private render: Renderer){}

    @HostListener('keyup', ['$event']) onKeyup($event: any) { 
        this.valor = $event.target.value.toUpperCase() 
        this.render.setElementProperty(this.el.nativeElement,'value',this.valor)
    }
}
