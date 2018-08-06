import { Component, OnInit,Input, ElementRef, Renderer, Output,EventEmitter } from '@angular/core';
 
@Component({
  selector: 'expandable-header',
  templateUrl: 'expandable-header.html'
})

export class ExpandableHeader implements OnInit {
 
  @Input('scrollArea') scrollArea: any;
  @Input('headerHeight') headerHeight: number;
  @Output() dyClass = new EventEmitter<string>();
  newHeaderHeight: any;
 
  constructor(public element: ElementRef, public renderer: Renderer) {
 
  }
 
  ngOnInit(){
 
    this.renderer.setElementStyle(this.element.nativeElement, 'height', this.headerHeight + 'px');
    this.scrollArea.ionScroll.subscribe((ev) => {
      this.resizeHeader(ev);
    });
 
  }
 
  resizeHeader(ev){
    ev.domWrite(() => {
 
      this.newHeaderHeight = this.headerHeight - ev.scrollTop;
      if(this.newHeaderHeight < 0){
        this.newHeaderHeight = 0;
      }
      if(ev.directionY === 'up'){
        this.newHeaderHeight = 60;
      }
      this.renderer.setElementStyle(this.element.nativeElement, 'height', this.newHeaderHeight + 'px');
 
      for(let headerElement of this.element.nativeElement.children){
 
        let totalHeight = headerElement.offsetTop + headerElement.clientHeight;
 
        if(totalHeight > this.newHeaderHeight && !headerElement.isHidden){
          headerElement.isHidden = true;
          this.renderer.setElementStyle(headerElement, 'opacity', '0');
        } else if (totalHeight <= this.newHeaderHeight && headerElement.isHidden) {
          headerElement.isHidden = false;
          this.renderer.setElementStyle(headerElement, 'opacity', '1');
        }
 
      }
 
    });
 
  }
 
}