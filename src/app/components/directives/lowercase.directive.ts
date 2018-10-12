import {Directive, ElementRef, HostListener, Renderer} from '@angular/core'

@Directive({
    selector:'[ikLoCase]'
})
export class LowerDirective{
    
    public valor: string

    constructor(
        private el: ElementRef,
        private render: Renderer){}

    @HostListener('keyup', ['$event']) onKeyup($event: any) { 
        this.valor = $event.target.value.toLowerCase() 
        this.render.setElementProperty(this.el.nativeElement,'value',this.valor)
    }
}
