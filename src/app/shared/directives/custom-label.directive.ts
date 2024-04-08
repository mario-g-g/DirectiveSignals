import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>
  private _color: string = 'red'
  private _errors?: ValidationErrors | null

  @Input() set color( value: string ) {
    this._color = value
    this.setStyle()
  }

  @Input() set errors( value: ValidationErrors | null | undefined ) {
    this._errors = value
    this.setErrorMessage()
  }

  constructor( private el: ElementRef<HTMLElement> ) {
    console.log(el)
    this.htmlElement = el

   }

  ngOnInit(): void {
    this.setStyle()
  }

  setStyle():void {
    if (!this.htmlElement) return
    this.htmlElement!.nativeElement.style.color = this._color
  }

  setErrorMessage(): void {
    if (!this.htmlElement) return
    if ( !this._errors ){
      this.htmlElement.nativeElement.innerHTML = "to ta bien"
      return
    }

    const errors = Object.keys(this._errors)

    if (errors.includes('required')){
      this.htmlElement.nativeElement.innerHTML = "es requerido "
      return
    } else if (errors.includes('minlength')){
      const min = this._errors!['minlength']['requiredLength']
      const current = this._errors!['minlength']['actualLength']

      this.htmlElement.nativeElement.innerHTML = `Mínimo ${current}/${min} `;
      return
    } else if (errors.includes('email')){
      this.htmlElement.nativeElement.innerHTML = "tiene que ser un  correo"
      return
    }

  }




}
