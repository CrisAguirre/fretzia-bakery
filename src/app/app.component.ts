import { Component, OnInit, OnDestroy } from '@angular/core';

interface ProductOption {
  label: string;
  price: number;
}

interface Product {
  name: string;
  image: string;
  description: string;
  options?: ProductOption[];
}

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
  cheesecakes: Product[] = [
    { 
      name: 'Cheescake Limón', 
      image: 'assets/2x4/1.png', 
      description: 'Deliciosa textura con suave sabor a Limon y crema de queso y leche.',
      options: [
        { label: 'Familiar (12 porciones)', price: 45000 },
        { label: 'Grande (10 porciones)', price: 38000 },
        { label: 'Mediano (8 porciones)', price: 30000 }
      ]
    },
    { 
      name: 'Cheescake New York', 
      image: 'assets/2x4/2.png', 
      description: 'Exquisita combinación de cheescake con decorado glaseado de frutos rojos y arándanos.',
      options: [
        { label: 'Familiar (12 porciones)', price: 55000 },
        { label: 'Grande (10 porciones)', price: 48000 },
        { label: 'Mediano (8 porciones)', price: 40000 }
      ]
    },
    { name: 'Cheescake Arequipe', image: 'assets/2x4/3.png', description: 'Una exquisitez en cada bocado, con una base de galleta, crema de arequipe, y cubierta de almendras frescas.' },
    { name: 'Cheescake Oreo', image: 'assets/2x4/4.png', description: 'Sabor intenso a Oreo tanto en su decorado como en su textura cremosa e irresistible.' },
    { name: 'Cheescake Chocolate', image: 'assets/2x4/5.png', description: 'El favorito de los amantes del chocolate, con base oscura y cubierta de galleta de chocolate.' },
  ];

  pies: Product[] = [
    { 
      name: 'Pie de Cereza', 
      image: 'assets/2x4/6.png', 
      description: 'Un clásico pie con un relleno jugoso de cerezas y una base crujiente.',
      options: [
        { label: 'Grande', price: 40000 },
        { label: 'Mediano', price: 25000 }
      ]
    },
    { 
      name: 'Pie de Manzana', 
      image: 'assets/2x4/7.png', 
      description: 'Tradicional pie de manzana con canela y una cubierta de masa perfecta.',
      options: [
        { label: 'Grande', price: 35000 },
        { label: 'Mediano', price: 20000 }
      ]
    }
  ];

  cookies: Product[] = [
    { 
      name: 'Galletas Red Velvet', 
      image: 'assets/2x4/8.png', 
      description: 'Suaves y deliciosas galletas Red Velvet con chispas de chocolate blanco.',
      options: [
        { label: '3 Unidades', price: 27000 },
        { label: '6 Unidades', price: 45000 },
        { label: '12 Unidades', price: 80000 }
      ]
    }
  ];

  // Carrito y Modales
  cart: { product: Product, option: ProductOption, quantity: number }[] = [];
  
  showProductModal = false;
  showCartModal = false;
  
  selectedProduct: Product | null = null;
  selectedOption: ProductOption | null = null;

  currentIndex = 0;
  currentIndex3 = 0;
  intervalId: any;
  isPaused = false;
  
  // Variables para touch
  touchStartX = 0;
  touchEndX = 0;

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
    if (!this.isPaused) {
      this.startAutoSlide();
    }
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    } else {
      this.startAutoSlide();
    }
  }

  onNextClick() {
    this.nextSlide();
    this.resetTimer();
  }

  onPrevClick() {
    this.prevSlide();
    this.resetTimer();
  }

  getMiddleIndex(count: number): number {
    return Math.floor(count / 2);
  }

  onDotClick(index: number) {
    if (this.currentIndex === index) {
      this.togglePause();
    } else {
      this.goToSlide(index);
      this.resetTimer();
    }
  }

  onDotClick3(index: number) {
    if (this.currentIndex3 === index) {
      this.togglePause();
    } else {
      this.goToSlide3(index);
      this.resetTimer();
    }
  }

  // --- Lógica del Carrito y Modales ---

  addToCart(name: string) {
    // Buscar el producto en todas las categorías
    const product = [...this.cheesecakes, ...this.pies, ...this.cookies].find(p => p.name === name);
    
    if (product) {
      if (product.options && product.options.length > 0) {
        // Si tiene opciones, abrir modal de selección
        this.selectedProduct = product;
        this.selectedOption = null; // Resetear selección
        this.showProductModal = true;
      } else {
        // Si no tiene opciones configuradas (ej. Oreo, Pies), agregar directamente con precio 0 o estándar
        // O mostrar alerta si la regla es estricta para todos
        alert('Este producto requiere consultar precio. Contáctanos por WhatsApp.');
      }
    }
  }

  selectOption(option: ProductOption) {
    this.selectedOption = option;
  }

  confirmAddToOrder() {
    if (this.selectedProduct && this.selectedOption) {
      const existingItem = this.cart.find(item => 
        item.product.name === this.selectedProduct!.name && 
        item.option.label === this.selectedOption!.label
      );

      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cart.push({
          product: this.selectedProduct,
          option: this.selectedOption,
          quantity: 1
        });
      }

      this.closeModals();
      // Opcional: Abrir el carrito automáticamente o mostrar mensaje flotante
      this.openCartModal(); 
    } else {
      alert('Por favor selecciona un tamaño.');
    }
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
  }

  openCartModal() {
    this.showCartModal = true;
  }

  closeModals() {
    this.showProductModal = false;
    this.showCartModal = false;
    this.selectedProduct = null;
    this.selectedOption = null;
  }

  get cartTotal(): number {
    return this.cart.reduce((total, item) => total + (item.option.price * item.quantity), 0);
  }

  // Touch events
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent, slider: 'main' | 'secondary') {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe(slider);
  }

  handleSwipe(slider: 'main' | 'secondary') {
    const threshold = 50; // Mínima distancia para considerar un swipe
    if (this.touchEndX < this.touchStartX - threshold) {
      // Swipe Left (Siguiente)
      if (slider === 'main') {
        this.currentIndex3 = (this.currentIndex3 + 1) % this.images3.length;
      } else {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      }
      this.resetTimer();
    }
    if (this.touchEndX > this.touchStartX + threshold) {
      // Swipe Right (Anterior)
      if (slider === 'main') {
        this.currentIndex3 = (this.currentIndex3 - 1 + this.images3.length) % this.images3.length;
      } else {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      }
      this.resetTimer();
    }
  }

  get whatsappLink(): string {
    const baseUrl = 'https://wa.me/573128033742';
    
    if (this.cart.length === 0) {
      return baseUrl;
    }

    const items = this.cart.map(item => 
      `${item.quantity}x ${item.product.name} (${item.option.label}) - $${item.option.price * item.quantity}`
    );
    
    const message = `Hola, quisiera realizar el siguiente pedido:\n${items.join('\n')}\n\nTotal: $${this.cartTotal}`;
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  }
}