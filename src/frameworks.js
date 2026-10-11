import Alpine from 'alpinejs';
import { animate, inView, stagger } from 'motion';

window.Alpine = Alpine;
window.ThemeMotion = { animate, inView, stagger };

Alpine.data('disclosure', (initiallyOpen = false) => ({
  open: initiallyOpen,
  toggle() {
    this.open = !this.open;
  },
  close() {
    this.open = false;
  },
}));

Alpine.start();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion) {
  inView('[data-motion="reveal"]', (element) => {
    animate(
      element,
      { opacity: [0, 1], transform: ['translateY(18px)', 'translateY(0)'] },
      { duration: 0.55, easing: [0.22, 1, 0.36, 1] },
    );
  }, { margin: '0px 0px -8% 0px' });

  inView('[data-motion-group]', (group) => {
    const items = group.querySelectorAll('[data-motion-item]');
    if (!items.length) return;
    animate(
      items,
      { opacity: [0, 1], transform: ['translateY(14px)', 'translateY(0)'] },
      { duration: 0.45, delay: stagger(0.07), easing: 'ease-out' },
    );
  }, { margin: '0px 0px -8% 0px' });
}
