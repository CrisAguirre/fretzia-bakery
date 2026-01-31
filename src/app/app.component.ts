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
    'assets/desk/2.jpg',
    'assets/desk/3.jpg',
    'assets/desk/4.jpg',
    'assets/desk/5.jpg',
    'assets/desk/6.jpg',
    'assets/desk/7.jpg',
    'assets/desk/8.jpg',
    'assets/desk/10.jpg',
    'assets/desk/13.jpg',
  ];
  images3: string[] = [
    'assets/slide-head/11.png',
    'assets/slide-head/22.png',
    'assets/slide-head/33.png',
    'assets/slide-head/44.png',
    'assets/slide-head/55.png',
  ];

  // Datos de los cheesecakes para la galería
  cheesecakes = [
    { name: 'Cheescake New York', image: 'assets/2x4/1.png', description: 'Deliciosa base crujiente con suave crema de queso y un toque de limon, decorado con frutos rojos y morados.' },
    { name: 'Cheescake Frutos Rojos', image: 'assets/2x4/2.png', description: 'Exquisita combinación de cheescake con decorado glaseado de frutos rojos.' },
    { name: 'Cheescake Oreo', image: 'assets/2x4/3.png', description: 'Sabor intenso a Oreo tanto en su decorado como en su textura cremosa e irresistible.' },
    { name: 'Cheescake Arequipe', image: 'assets/2x4/4.png', description: 'Una exquisitez en cada bocado, con una base de galleta, crema de arequipe, y cubierta de almendras frescas.' },
    { name: 'Cheescake Chocolate', image: 'assets/2x4/5.png', description: 'El favorito de los amantes del chocolate, con base oscura y cubierta de galleta de chocolate.' },
    { name: 'Cheescake Limón', image: 'assets/2x4/6.png', description: 'Tradicional, fresca y cítrica la joya de la casa, horneada y cuajada a la perfección.' }
  ];

  cart: { [name: string]: number } = {};
  showModal = false;
  currentIndex = 0;
  currentIndex3 = 0;
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
    this.currentIndex3 = (this.currentIndex3 + 1) % this.images3.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  goToSlide3(index: number) {
    this.currentIndex3 = index;
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

  addToCart(name: string) {
    if (!this.cart[name]) {
      this.cart[name] = 0;
    }
    this.cart[name]++;
    alert(`¡${name} agregado al pedido!`);
  }

  removeFromCart(name: string) {
    delete this.cart[name];
    if (this.cartItems.length === 0) {
      this.closeModal();
    }
  }

  get cartItems() {
    return Object.keys(this.cart).map(key => ({ name: key, quantity: this.cart[key] }));
  }

  openModal() {
    if (this.cartItems.length > 0) {
      this.showModal = true;
    } else {
      alert('Aún no has agregado productos al pedido.');
    }
  }

  closeModal() {
    this.showModal = false;
  }

  get whatsappLink(): string {
    const baseUrl = 'https://wa.me/573137733408';
    const items = Object.keys(this.cart).map(key => `${this.cart[key]}x ${key}`);
    
    if (items.length === 0) {
      return baseUrl;
    }

    const message = `Hola, quisiera realizar el siguiente pedido: ${items.join(', ')}`;
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  }
}