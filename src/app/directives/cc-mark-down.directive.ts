import { Directive, Input, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appCcMarkDown]'
})
export class CcMarkDownDirective {
  private nativeElement: Node;
  boldButton: any;
  @Output() valueChange = new EventEmitter<object>();

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.nativeElement = this.element.nativeElement;
    const div = this.renderer.createElement('div');
    this.boldButton = this.renderer.createElement('Button');
    const text = this.renderer.createText('Bold');

    this.renderer.addClass(this.boldButton, 'classBold');
    this.renderer.appendChild(this.boldButton, text);
    this.renderer.appendChild(div, this.boldButton);
    this.renderer.insertBefore(this.element.nativeElement.parentNode, div, this.element.nativeElement.nextSibling);

    this.renderer.listen(this.boldButton, 'click', (event) => {
      this.makeContentBold(event);
    })
  }

  makeContentBold(event: any) {

    let selectionStart = this.element.nativeElement.selectionStart;
    let selectionEnd = this.element.nativeElement.selectionEnd;

    // get string 

    let selectedString = this.element.nativeElement.value.slice(selectionStart, selectionEnd);
    let selectedStringMarkDown = "**" + selectedString + "**";
    let selectedStringHTML = "<strong>" + selectedString + "</strong>";

    this.valueChange.emit({
      markDown: this.element.nativeElement.value.substring(0, selectionStart) + selectedStringMarkDown + this.element.nativeElement.value.substring(selectionEnd),
      html: this.element.nativeElement.value.substring(0, selectionStart) + selectedStringHTML + this.element.nativeElement.value.substring(selectionEnd)
    });
  }
}
