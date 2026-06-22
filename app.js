const FifaApp = (() => {
  // Caché de elementos del DOM
  const DOM = {
    greetingElement: document.getElementById('greetingMessage'),
    themeToggleBtn: document.getElementById('themeToggle'),
    form: document.getElementById('subscribeForm'),
    inputs: {
      nombre: document.getElementById('nombre'),
      email: document.getElementById('email'),
      edad: document.getElementById('edad'),
      terminos: document.getElementById('terminos')
    },
    submitBtn: document.getElementById('submitBtn'),
    errors: {
      nombre: document.getElementById('err-nombre'),
      email: document.getElementById('err-email'),
      edad: document.getElementById('err-edad')
    }
  };

  /**
   * 1. Manejo del Saludo Dinámico
   */
  const setDynamicGreeting = () => {
    const hour = new Date().getHours();
    let greeting = '¡Buenas noches!';

    if (hour >= 6 && hour < 12) greeting = '¡Buenos días!';
    else if (hour >= 12 && hour < 19) greeting = '¡Buenas tardes!';

    if (DOM.greetingElement) DOM.greetingElement.textContent = greeting;
  };

  /**
   * 2. Manejo del Cambio de Tema
   */
  const toggleTheme = () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    
    DOM.themeToggleBtn.textContent = isDark ? '☀️ Claro' : '🌙 Oscuro';
  };

  /**
   * 3. Validaciones Independientes (Retornan booleanos)
   */
  const isValidName = (name) => name.trim().length > 0;
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidAge = (age) => !isNaN(age) && parseInt(age, 10) >= 18;

  /**
   * 4. Gestión de la interfaz del formulario (Errores y Botón)
   */
  const validateFormUI = () => {
    const valName = DOM.inputs.nombre.value;
    const valEmail = DOM.inputs.email.value;
    const valAge = DOM.inputs.edad.value;
    const isChecked = DOM.inputs.terminos.checked;

    const nameOk = isValidName(valName);
    const emailOk = isValidEmail(valEmail);
    const ageOk = isValidAge(valAge);

    // Muestra u oculta los errores solo si el usuario ha escrito algo
    // pero el valor sigue siendo incorrecto.
    DOM.errors.nombre.style.display = (!nameOk && valName !== '') ? 'block' : 'none';
    DOM.errors.email.style.display = (!emailOk && valEmail !== '') ? 'block' : 'none';
    DOM.errors.edad.style.display = (!ageOk && valAge !== '') ? 'block' : 'none';

    // Habilita el botón de submit SÓLO si todo es correcto
    const isFormValid = nameOk && emailOk && ageOk && isChecked;
    DOM.submitBtn.disabled = !isFormValid;
  };

  const submitForm = (e) => {
    e.preventDefault();
    alert('¡Suscripción realizada con éxito!');
    DOM.form.reset();
    validateFormUI(); // Re-evalúa para volver a bloquear el botón tras el reset
  };

  /**
   * Inicializador: Vincula eventos
   */
  const init = () => {
    // Configurar estado inicial
    setDynamicGreeting();

    // Eventos
    if (DOM.themeToggleBtn) {
      DOM.themeToggleBtn.addEventListener('click', toggleTheme);
    }

    if (DOM.form) {
      // Escuchamos el evento 'input' en todos los campos para validar en tiempo real
      Object.values(DOM.inputs).forEach(input => {
        input.addEventListener('input', validateFormUI);
      });
      DOM.form.addEventListener('submit', submitForm);
    }
  };

  // Exponer solo el método de inicialización
  return { init };
})();

// Levantar la app cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', FifaApp.init);