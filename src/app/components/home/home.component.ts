import { Component } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  currentSlide = 2;
  slides = [0, 1, 2]; // índices de las diapositivas

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.updateSlides();
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.updateSlides();
  }

  updateSlides() {
    const slides = document.querySelectorAll(".slide");
    slides.forEach((slide, index) => {
      slide.classList.remove("active");
      if (index === this.currentSlide) {
        slide.classList.add("active");
      }
    });
  }

  constructor() {
    this.updateSlides(); // inicializa la primera diapositiva
  }
}
