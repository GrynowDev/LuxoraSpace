// Execute scripts inside injected HTML
function executeScripts(container) {
  container.querySelectorAll('script').forEach(oldScript => {
    const newScript = document.createElement('script');
    Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
    newScript.textContent = oldScript.textContent;
    oldScript.parentNode.replaceChild(newScript, oldScript);
  });
}

// Load header component
async function loadHeader() {
  const headerWrapper = document.getElementById('header-wrapper');
  if (headerWrapper) {
    try {
      const response = await fetch('./components/header.html');
      const html = await response.text();
      headerWrapper.innerHTML = html;
      executeScripts(headerWrapper);
    } catch (error) {
      console.error('Error loading header:', error);
    }
  }
}

// Load footer component
async function loadFooter() {
  const footerWrapper = document.getElementById('footer-wrapper');
  if (footerWrapper) {
    try {
      const response = await fetch('./components/footer.html');
      const html = await response.text();
      footerWrapper.innerHTML = html;
      executeScripts(footerWrapper);
    } catch (error) {
      console.error('Error loading footer:', error);
    }
  }
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  loadHeader();
  loadFooter();
});
