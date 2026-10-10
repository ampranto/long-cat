document.documentElement.classList.remove('no-js');

document.addEventListener('click', (event) => {
  const toggle = event.target.closest('[data-menu-toggle]');
  if (toggle) {
    const menu = document.getElementById(toggle.getAttribute('aria-controls'));
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu.hidden = expanded;
  }
});

document.addEventListener('change', (event) => {
  const select = event.target.closest('[data-variant-select]');
  if (!select) return;
  const form = select.closest('form');
  const option = select.options[select.selectedIndex];
  const button = form.querySelector('[type="submit"]');
  if (button) button.disabled = option.dataset.available !== 'true';
});
