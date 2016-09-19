import { Component, Renderer, ElementRef, Input } from '@angular/core';

@Component ({
  selector: 'WorkItem',
  styles: [`
    .item {
      position: relative;
      margin-bottom: 20px;
    }

    a {
      background: #fff;
      padding: 100px;
      border: #ccc 1px solid;
      text-align: center;
      display: block;
    }

    .description {
      position: absolute;
      bottom: 0;
      background: #3E3E3E;
      width: 100%;
      height: 60px;
      color: #fff;
      padding-left: 40px;
      display: none;
    }

    .display {
      display: block !important;
    }

    h3 {
      text-transform: none;
      font-size: 1.6em;
      margin: 0;
      line-height: 60px;
    }
  `],
  template: `
    <div class="item" (mouseenter)="onMouseEnter()" (mouseleave)="onMouseLeave()">
      <a [routerLink]="['/work', item._id]">
        <img src="/assets/sequence.png" alt="" />
      </a>
      <div class="description" [ngClass]="{display: isMouseOver}">
        <h3>{{ item.title }}</h3>
      </div>
    </div>
  `
})
export class WorkListItemComponent {
  private isMouseOver: boolean = false;
  @Input() item;

  constructor(private element: ElementRef, private renderer: Renderer) {}

  private onMouseEnter() {
    this.isMouseOver = true;
  }

  private onMouseLeave() {
    this.isMouseOver = false;
  }
}
