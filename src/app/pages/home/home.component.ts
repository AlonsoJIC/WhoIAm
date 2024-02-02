import { Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit{


  ngOnInit() {
    const sections = document.querySelectorAll<HTMLElement>("section");
    const images = document.querySelectorAll<HTMLElement>(".bg");
    const headings = gsap.utils.toArray<HTMLElement>(".section-heading");
    const outerWrappers = gsap.utils.toArray<HTMLElement>(".outer");
    const innerWrappers = gsap.utils.toArray<HTMLElement>(".inner");
    const hiddenElements = document.querySelectorAll('.hidden');
    let currentIndex = -2;
    let animating: boolean;
    let touchStartY: number | null = null;

    gsap.set(outerWrappers, { yPercent: 100 });
    gsap.set(innerWrappers, { yPercent: -100 });

    hiddenElements.forEach((element, index) => {
      if (index !== 0) {
        element.classList.remove('hidden');
      }
    });

    function gotoSection(index: number, direction: number) {
      if (index < 0 || index >= sections.length || animating) {
        return;
      }
      animating = true;
      const fromTop = direction === -1;
      const dFactor = fromTop ? -1 : 1;
      const tl = gsap.timeline({
        defaults: { duration: 1.25, ease: "power1.inOut" },
        onComplete: () => {
          animating = false;
          handleAnimationComplete();
        },
      });
      if (currentIndex >= 0) {
        gsap.set(sections[currentIndex], { zIndex: 0 });
        tl.to(images[currentIndex], { yPercent: -15 * dFactor }).set(
          sections[currentIndex],
          { autoAlpha: 0 }
        );
      }
      gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
      tl.fromTo(
        [outerWrappers[index], innerWrappers[index]],
        { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
        { yPercent: 0 },
        0
      )
        .fromTo(
          images[index],
          { yPercent: 15 * dFactor },
          { yPercent: 0 },
          0
        )
        .fromTo(
          headings[index],
          { autoAlpha: 0, yPercent: 150 * dFactor },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 1,
            ease: "power2",
            stagger: {
              each: 0.02,
              from: "random",
            },
          },
          0.2
        );
      currentIndex = index;
    }

    function handleAnimationComplete() {
      // lógica adicional después de que la animación se completa
    }

    window.addEventListener("wheel", (e) => {
      if (!animating) {
        if (e.deltaY > 0) {
          gotoSection(currentIndex + 1, 1);
        } else {
          gotoSection(currentIndex - 1, -1);
        }
      }
    });

    window.addEventListener("touchstart", (e) => {
      touchStartY = e.touches[0].clientY;
    });

    window.addEventListener("touchmove", (e) => {
      if (!animating && touchStartY !== null) {
        const touchEndY = e.touches[0].clientY;
        const deltaY = touchEndY - touchStartY;
        if (deltaY > 0) {
          gotoSection(currentIndex - 1, -1);
        } else if (deltaY < 0) {
          gotoSection(currentIndex + 1, 1);
        }
        touchStartY = null;
      }
    });

    gotoSection(0, 1);
  }
}








