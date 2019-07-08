import { Directive, Input, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appCcMarkDown]'
})
export class CcMarkDownDirective {
  private nativeElement: Node;
  boldButton: any;
  boldButtonText: any;

  italicButton: any;
  italicButtonText: any;
  previewDiv: any;
  @Output() valueChange = new EventEmitter<object>();

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.nativeElement = this.element.nativeElement;
    this.element.nativeElement.value = this.element.nativeElement.value.trim();
    const outerDiv = this.renderer.createElement('div');
    const div = this.renderer.createElement('div');
    this.previewDiv = this.renderer.createElement('div');
    this.renderer.setStyle(this.previewDiv, 'width', '500px');
    this.renderer.setStyle(this.previewDiv, 'padding', '5px');
    this.renderer.setStyle(this.previewDiv, 'border', '2px solid gray');

    // Bold Button
    this.boldButton = this.renderer.createElement('Button');
    this.boldButtonText = this.renderer.createText('Bold');
    this.renderer.addClass(this.boldButton, 'classBold');
    this.renderer.appendChild(this.boldButton, this.boldButtonText);

    // Italic Button
    this.italicButton = this.renderer.createElement('Button');
    this.italicButtonText = this.renderer.createText('Italic');
    this.renderer.addClass(this.italicButton, 'classItalic');
    this.renderer.appendChild(this.italicButton, this.italicButtonText);

    this.renderer.appendChild(div, this.boldButton);
    this.renderer.appendChild(div, this.italicButton);

    this.renderer.appendChild(outerDiv, div);
    this.renderer.appendChild(outerDiv, this.previewDiv);

    this.renderer.insertBefore(this.element.nativeElement.parentNode, outerDiv, this.element.nativeElement.nextSibling);

    this.renderer.listen(this.boldButton, 'click', (event) => {
      this.makeContentBold(event);
    });

    this.renderer.listen(this.italicButton, 'click', (event) => {
      this.makeContentItalic(event);
    });

  }

  makeContentBold(event: any) {
    let selectionStart = this.element.nativeElement.selectionStart;
    const selectionEnd = this.element.nativeElement.selectionEnd;
    let selectedStringMarkDown = '';
    let selectedStringHTML = '';
    if (selectionStart === selectionEnd) {
      selectionStart = 0;
    }
    let selectedString = this.element.nativeElement.value.slice(selectionStart, selectionEnd);

    if (!selectedString) {
      selectedString = this.element.nativeElement.value;
    }

    // Undo bold
    if (this.checkContentBold(selectedString)) {
      selectedString = selectedString.replace(/[**]+/g, '');
      selectedStringMarkDown = '' + selectedString + '';
      selectedStringHTML = '' + selectedString + '';
    } else {
      selectedStringMarkDown = '**' + selectedString + '**';
      selectedStringHTML = '<strong>' + selectedString + '</strong>';
    }

    // tslint:disable-next-line:max-line-length
    if (selectionStart === 0 && selectionEnd === 0) {
      this.valueChange.emit({
        // tslint:disable-next-line:max-line-length
        markDown: selectedStringMarkDown,
        // tslint:disable-next-line:max-line-length
        html: selectedStringHTML
      });

      this.element.nativeElement.value = selectedStringMarkDown;

      this.renderer.setProperty(this.previewDiv, 'innerHTML', selectedStringHTML);
    } else {

      this.valueChange.emit({
        // tslint:disable-next-line:max-line-length
        markDown: this.element.nativeElement.value.substring(0, selectionStart) + selectedStringMarkDown + this.element.nativeElement.value.substring(selectionEnd),
        // tslint:disable-next-line:max-line-length
        html: this.element.nativeElement.value.substring(0, selectionStart) + selectedStringHTML + this.element.nativeElement.value.substring(selectionEnd)
      });

      this.renderer.setProperty(this.previewDiv, 'innerHTML', 
      // tslint:disable-next-line:max-line-length
      this.element.nativeElement.value.substring(0, selectionStart) + selectedStringHTML + this.element.nativeElement.value.substring(selectionEnd));
      // tslint:disable-next-line:max-line-length
      this.element.nativeElement.value = this.element.nativeElement.value.substring(0, selectionStart) + selectedStringMarkDown + this.element.nativeElement.value.substring(selectionEnd);
      // tslint:disable-next-line:max-line-length

    }

  }

  makeContentItalic(event: any) {
    let selectionStart = this.element.nativeElement.selectionStart;
    const selectionEnd = this.element.nativeElement.selectionEnd;
    let selectedStringMarkDown = '';
    let selectedStringHTML = '';
    if (selectionStart === selectionEnd) {
      selectionStart = 0;
    }

    let selectedString = this.element.nativeElement.value.slice(selectionStart, selectionEnd);

    if (!selectedString) {
      selectedString = this.element.nativeElement.value;
    }

    // undo Italic tag
    if (this.checkContentItalic(selectedString)) {
      selectedString = selectedString.replace(/[//]+/g, '');
      selectedStringMarkDown = '' + selectedString + '';
      selectedStringHTML = '' + selectedString + '';
    } else if (this.checkContentBold(selectedString)) {
      selectedString = selectedString.replace(/[**]+/g, '');
      selectedStringMarkDown = '**//' + selectedString + '//**';
      selectedStringHTML = '<strong><em>' + selectedString + '</em></strong>';
    }
    // tslint:disable-next-line:one-line
    else {
      selectedStringMarkDown = '//' + selectedString + '//';
      selectedStringHTML = '<em>' + selectedString + '</em>';
    }

    if (selectionStart === 0 && selectionEnd === 0) {

      this.valueChange.emit({
        // tslint:disable-next-line:max-line-length
        markDown: selectedStringMarkDown,
        // tslint:disable-next-line:max-line-length
        html: selectedStringHTML
      });
      this.renderer.setProperty(this.previewDiv, 'innerHTML', selectedStringHTML);

      this.element.nativeElement.value = selectedStringMarkDown;
    } else {
      this.valueChange.emit({
        // tslint:disable-next-line:max-line-length
        markDown: this.element.nativeElement.value.substring(0, selectionStart) + selectedStringMarkDown + this.element.nativeElement.value.substring(selectionEnd),
        // tslint:disable-next-line:max-line-length
        html: this.element.nativeElement.value.substring(0, selectionStart) + selectedStringHTML + this.element.nativeElement.value.substring(selectionEnd)
      });
      // tslint:disable-next-line:max-line-length
      this.renderer.setProperty(this.previewDiv, 'innerHTML', this.element.nativeElement.value.substring(0, selectionStart) + selectedStringHTML + this.element.nativeElement.value.substring(selectionEnd));
      // tslint:disable-next-line:max-line-length
      this.element.nativeElement.value = this.element.nativeElement.value.substring(0, selectionStart) + selectedStringMarkDown + this.element.nativeElement.value.substring(selectionEnd);

    }

  }

  checkContentItalic(selectedString: any) {
    if (selectedString.startsWith('//') && selectedString.endsWith('//')) {
      return true;
    } else if (selectedString.includes('//')) {
      // Check if string starts and with bold
      return true;
    } else {
      return false;
    }
  }

  checkContentBold(selectedString: any) {
    // Check if string starts and with bold
    if (selectedString.startsWith('**') && selectedString.endsWith('**')) {
      return true;
    } else if (selectedString.includes('**')) {
      // Check if string starts and with bold
      return true;
    } else {
      return false;
    }
  }

  renderOtherTagsHTML(otherTag: any, selectedString: any) {
  }

  renderOtherTagsMarkDown(otherTag: any, selectedString: any) {

  }
}
