import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-unterschrift',
  templateUrl: './unterschrift.component.html',
  styleUrls: ['./unterschrift.component.css']
})
export class UnterschriftComponent {

  @ViewChild('popup') popUp!: ElementRef<HTMLDivElement>;
  @ViewChild('signPad', {static: false}) signPad!: ElementRef<HTMLCanvasElement>;
  @Output() signatureSaved = new EventEmitter();
  public signatureImg?: string;
  private sigPadElement: any;
  private context: any;
  private isDrawing!: boolean;

  //Define the signing pad (canvas) and set pen color after opening the page
  public ngAfterViewInit(): void {
    this.sigPadElement = this.signPad.nativeElement;
    this.context = this.sigPadElement.getContext('2d');
    this.context.strokeStyle = '#000';
  }

  //Show the popup window when a button is clicked using CSS display
  showPopup(): void {
    this.popUp.nativeElement.style.display = 'flex';
  }

  //Hide the popup window when a button is clicked using CSS display
  hidePopup(): void {
    this.popUp.nativeElement.style.display = 'none';
  }

  //The mouse button is clicked, which means the start of drawing the signature
  onMouseDown(e: any): void {
    this.isDrawing = true;
    const coords = this.relativeCoords(e);
    this.context.moveTo(coords.x, coords.y);
  }

  //The mouse button is released, which means the end of drawing the signature
  @HostListener('document:mouseup', ['$event'])
  onMouseUp(e: any): void {
    this.isDrawing = false;
  }

  //Draw on the canvas by moving the mouse, but only if mouse button is pressed
  onMouseMove(e: any): void {
    if (this.isDrawing) { // if we're not drawing we need to ignore the events
      const coords = this.relativeCoords(e);
      this.context.lineTo(coords.x, coords.y);
      this.context.stroke();
    }
  }

  //Clear the canvas
  clearSignature(): void {
    this.signatureImg = undefined;
    this.context.clearRect(0, 0, this.sigPadElement.width, this.sigPadElement.height);
    this.context.beginPath();
  }

  //Save the signature as an URL and display it inside an HTML Element
  saveSignature(): void {
    this.signatureImg = this.sigPadElement.toDataURL('image/png');
    this.signatureSaved.emit(this.signatureImg);
  }

  //Get relative coordinates of the cursor inside the canvas
  private relativeCoords(event: any): { x: number, y: number } {
    const bounds = event.target.getBoundingClientRect();
    const cords = {
      clientX: event.clientX || event.changedTouches[0].clientX,
      clientY: event.clientY || event.changedTouches[0].clientY
    };
    const x = cords.clientX - bounds.left;
    const y = cords.clientY - bounds.top;
    return {x, y};
  }

}
