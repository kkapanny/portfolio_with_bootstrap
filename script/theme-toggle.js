(function() {
  'use strict';

  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  function updateNavbarTheme(theme) {
    const navbars = document.querySelectorAll('.navbar');
    navbars.forEach(navbar => {
      if (theme === 'dark') {
        navbar.classList.remove('navbar-light');
        navbar.classList.add('navbar-dark');
      } else {
        navbar.classList.remove('navbar-dark');
        navbar.classList.add('navbar-light');
      }
    });
  }

  const currentTheme = localStorage.getItem('theme') || 'light';
  if (currentTheme === 'dark') {
    html.setAttribute('data-theme', 'dark');
    updateNavbarTheme('dark');
  } else {
    updateNavbarTheme('light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateNavbarTheme(newTheme);
    });
  }

  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
        const theme = html.getAttribute('data-theme');
        updateNavbarTheme(theme);
      }
    });
  });

  observer.observe(html, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
})();

