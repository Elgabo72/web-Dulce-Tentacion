btnAbrirCerrarMenu();

function btnAbrirCerrarMenu() {
    btnMenu = document.querySelectorAll("#btnCerrarMenu");
    btnMenu.forEach((boton) => {
      boton.addEventListener("click", abrirCerrarMenu);
    });
  
    // Agregar listener para verificar el ancho de la pantalla
    const mediaQuery = window.matchMedia('(min-width: 1151px)'); // Cambiado a 1151px para incluir ancho mayor a 1150px
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery); // Ejecutar la función inicialmente
  }
  
  function handleMediaQueryChange(mediaQuery) {
    var menuInicioElement = document.querySelector('.menuInicio');
  
    if (mediaQuery.matches) {
      // Pantalla cumple con el ancho requerido (> 1150px)
      if (menuInicioElement) {
        menuInicioElement.style.display = 'flex'; // Mostrar el menú
      }
    } else {
      // Pantalla no cumple con el ancho requerido
      if (menuInicioElement) {
        menuInicioElement.style.display = 'none'; // Ocultar el menú si existe
      }
    }
  }
  
  function abrirCerrarMenu() {
    var menuInicioElement = document.querySelector('.menuInicio');
  
    // Verificar si se encontró el elemento
    if (menuInicioElement) {
      // Si el elemento está visible, ocultarlo
      if (menuInicioElement.style.display !== 'none') {
        menuInicioElement.style.display = 'none';
      } else {
        // Si el elemento está oculto, mostrarlo
        menuInicioElement.style.display = 'flex';
      }
    } else {
      console.error('No se encontró ningún elemento con la clase "menuInicioResponsive".');
    }
  }