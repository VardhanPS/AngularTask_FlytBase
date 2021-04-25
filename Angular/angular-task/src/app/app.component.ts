import { Component, HostListener, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'
  ]
})

export class AppComponent {
  name = 'Sai';
  counter = 1;
  zIndex = 1;
  maxZIndex;
  selectedBox;
  allowKeyBoardControl = true;
  keyBoardControlTxt = 'Disable';
  constructor(private renderer: Renderer2, private elem: ElementRef){
  }
  addBox(): void {
    this.maxZIndex = this.zIndex;
    const element = this.elem.nativeElement.querySelector('#app-box-container');
    const movableBoxString = `<div class="movable-box" id = "movable-box-${this.counter}"><p class = "box-counter" id = "box-counter-${this.counter}">` + this.counter + '</p></div>';
    element.insertAdjacentHTML('beforeend', movableBoxString);
    const newElement = this.elem.nativeElement.querySelector(`#movable-box-${this.counter}`);
    newElement.style.zIndex = this.zIndex;
    newElement.translateX = 0;
    newElement.translateY = 0;
    newElement.translateZ = 0;
    newElement.addEventListener('click', (event: Event) => {
      this.onBoxClick(newElement);
    });
    this.counter++;
    this.zIndex++;
  }

  deleteBox(): void {
    this.selectedBox.remove();
  }

  toggleControl(): void {
    const checkBox = this.elem.nativeElement.querySelector('#app-toggle-checkBox');
    this.allowKeyBoardControl = checkBox.checked;
    if(!this.allowKeyBoardControl) {
      this.keyBoardControlTxt = 'Enable';
    } else {
      this.keyBoardControlTxt = 'Disable';
    }
  }

  onBoxClick(item: any): void {
    // alert('hi');
    if (!item.isClicked) {
      item.classList.add('selected-box');
      this.maxZIndex = this.maxZIndex + 1;
      const elements = this.elem.nativeElement.querySelectorAll('.movable-box');
      elements.forEach(element => {
        if (item.id !== element.id) {
          element.classList.remove('selected-box');
          element.isClicked = false;
        } else {
          element.style.zIndex = this.maxZIndex;
        }
      });
      item.isClicked = true;
      this.selectedBox = item;
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent): void {
    let translatePhrase: string;
    if (this.selectedBox && this.allowKeyBoardControl) {
      let boxBoundingRec = this.selectedBox ? this.selectedBox.getBoundingClientRect() : 0;
      let borderBoundingRec = this.elem.nativeElement.querySelector('#app-box-container').getBoundingClientRect();
      const boundingRecBorder = parseInt(window.getComputedStyle(this.elem.nativeElement.querySelector('#app-box-container')).border);
      if ( event.keyCode === 65 || event.keyCode === 37 ) { //key A or arrow left
        if (Math.abs(parseInt((borderBoundingRec.left - boxBoundingRec.left).toFixed())) != boundingRecBorder) {
          this.selectedBox.translateX -= 10;
        }
      }

      if ( event.keyCode === 68 || event.keyCode === 39 ) { //key D or arrow right
        if (Math.abs(parseInt((borderBoundingRec.right - boxBoundingRec.right).toFixed())) != boundingRecBorder) {
          this.selectedBox.translateX += 10;
        }
      }

      if ( event.keyCode === 83 || event.keyCode === 40 ) { //key S or arrow down
        if (Math.abs(parseInt((borderBoundingRec.bottom - boxBoundingRec.bottom).toFixed())) != boundingRecBorder) {
          this.selectedBox.translateY += 10;
        }
      }

      if ( event.keyCode === 87 || event.keyCode === 38 ) { //key W or arrow up
        if (Math.abs(parseInt((borderBoundingRec.top - boxBoundingRec.top).toFixed())) != boundingRecBorder) {
          this.selectedBox.translateY -= 10;
        }
      }
      translatePhrase = `translate3d(${this.selectedBox.translateX}px, ${this.selectedBox.translateY}px, ${this.selectedBox.translateZ}px)`;
      this.selectedBox.style.transform = translatePhrase;
    }
  }
}
