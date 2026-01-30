import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Asumiendo que existe o se usa styles.css global
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'FretziaBakery';
  
  // Lista de imágenes con sus extensiones específicas
  images: string[] = [
    'assets/desk/1.png',
    'assets/desk/2.jpg',
    'assets/desk/3.jpg',
    'assets/desk/4.jpg',
    'assets/desk/5.jpg',
    'assets/desk/6.jpg',
    'assets/desk/7.jpg',
    'assets/desk/8.jpg',
    'assets/desk/9.jpg',
    'assets/desk/10.jpg',
    'assets/desk/11.jpg',
    'assets/desk/12.jpg',
    'assets/desk/13.jpg',
    'assets/desk/14.webp'
  ];

  currentIndex = 0;
  intervalId: any;

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  // Reiniciar el timer cuando el usuario interactúa manualmente (opcional)
  resetTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.startAutoSlide();
  }

  onNextClick() {
    this.nextSlide();
    this.resetTimer();
  }

  onPrevClick() {
    this.prevSlide();
    this.resetTimer();
  }
}