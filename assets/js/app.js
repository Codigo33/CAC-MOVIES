// Ejecutamos las funciones de carga de películas al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Cargamos las películas en la cuadrícula de tendencias
    fetchMoviesGrid();
    // Cargamos las películas en el carrusel de películas aclamadas
    fetchMoviesFlex();
    // Activar o desactivar la vista del menu
    navToggle();
    // Navegacion fija
    fixedNav();
    // 
    smoothScroll();
});

const API_SERVER = 'https://api.themoviedb.org/3';

// Opciones para las peticiones fetch a la API
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json', // Tipo de respuesta esperada (JSON)
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTJjYTAwZDYxZWIzOTEyYjZlNzc4MDA4YWQ3ZmNjOCIsInN1YiI6IjYyODJmNmYwMTQ5NTY1MDA2NmI1NjlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MJSPDJhhpbHHJyNYBtH_uCZh4o0e3xGhZpcBIDy-Y8'

    }
};

// Función para crear elementos HTML
const createElement = (tag, className, attributes = {}) => {
    // Creamos un nuevo elemento HTML del tipo especificado (tag)
    const element = document.createElement(tag);

    // Si se especificó una clase, la añadimos al elemento
    if (className) {
        element.classList.add(className);
    }

    // Iteramos sobre los atributos pasados como argumento y los añadimos al elemento
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));

    // Devolvemos el elemento creado
    return element;
};

// Función para cargar películas en la cuadrícula de tendencias
const fetchMoviesGrid = async (page = 1) => {
    // Realizamos una petición fetch a la API para obtener las películas populares
    const response = await fetch(`${API_SERVER}/movie/popular?page=${page}`, options);

    // Convertimos la respuesta a JSON
    const data = await response.json();

    // Extraemos las películas de la respuesta
    const movies = data.results;

    // Seleccionamos el contenedor de películas de tendencia en el DOM
    const tendenciasContainer = document.querySelector('.tendencias .container__movies');

    // Limpiamos el contenido previo del contenedor
    tendenciasContainer.innerHTML = '';

    // Iteramos sobre cada película obtenida
    movies.forEach(movie => {
        // Creamos los elementos HTML para mostrar la película
        const pelicula = createElement('div', 'movie');
        const anchor = createElement('a', 'link__movie');
        anchor.href = './pages/detalle.html';
        const img = createElement('img', 'img__tendencias', {
            src: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            alt: movie.title,
            loading: 'lazy'
        });
        const tituloPelicula = createElement('div', 'movie__title');
        const titulo = createElement('h4', '');
        titulo.textContent = movie.title;

        // Agregamos los elementos al DOM
        // Creamos un contenedor para la película dentro del enlace
        tituloPelicula.appendChild(titulo); // Agregamos el título de la película al contenedor de título
        pelicula.append(img, tituloPelicula); // Agregamos la imagen y el contenedor de título a la película
        anchor.appendChild(pelicula); // Agregamos la película al enlace
        const peliculaWrapper = createElement('div', 'movies'); // Creamos un contenedor adicional para la película
        peliculaWrapper.appendChild(anchor); // Agregamos el enlace con la película al contenedor adicional
        tendenciasContainer.appendChild(peliculaWrapper); // Agregamos el contenedor adicional al contenedor de tendencias
    });

    // Actualizamos el atributo data-page con el número de página actual
    tendenciasContainer.parentElement.setAttribute('data-page', page);
};

// Función para cargar películas en el carrusel de películas aclamadas
const fetchMoviesFlex = async () => {
    // Realizamos una petición fetch a la API para obtener las películas más aclamadas
    const response = await fetch(`${API_SERVER}/movie/top_rated`, options);

    // Convertimos la respuesta a JSON
    const data = await response.json();

    // Extraemos las películas de la respuesta
    const movies = data.results;

    // Seleccionamos el contenedor de películas aclamadas en el DOM
    const aclamadasContainer = document.querySelector('.container__aclamadas');

    // Iteramos sobre cada película obtenida
    movies.forEach(movie => {
        // Creamos los elementos HTML para mostrar la película
        const peliculaItem = createElement('div', 'movies__aclamadas');
        const img = createElement('img', 'imgAclamada', {
            src: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            alt: movie.title,
            loading: 'lazy'
        });

        // Agregamos los elementos al DOM
        peliculaItem.appendChild(img); // Agregamos la imagen al contenedor de la película
        aclamadasContainer.appendChild(peliculaItem); // Agregamos el contenedor de la película al contenedor de películas aclamadas
    });
};

/* ========== BTN PREV ========== */
document.querySelector('.btn-prev').addEventListener('click', () => {
    // Obtener el número de página actual
    let currentPage = Number(document.querySelector('.tendencias').getAttribute('data-page'));
    // Si es la primera página, no hacemos nada
    if (currentPage <= 1) return;
    // Cargar las películas de la página anterior
    fetchMoviesGrid(currentPage - 1);
});

/* ========== BTN NEXT ========== */
document.querySelector('.btn-next').addEventListener('click', () => {
    // Obtener el número de página actual
    let currentPage = Number(document.querySelector('.tendencias').getAttribute('data-page'));
    // Cargar las películas de la página siguiente
    fetchMoviesGrid(currentPage + 1);
});


/* ========== MENU HAMB ========== */
function navToggle() {
    const navToggle = document.querySelector('.nav-toggle')
    const linksContainer = document.querySelector('.nav-links__container')
    const links = document.querySelector('.nav__links')

    // Escucha si se ejecuta el evento click en el menu hamburguesa
    navToggle.addEventListener('click', () => {
        // Toma el alto de ambos elementos
        const containerHeight = linksContainer.getBoundingClientRect().height
        const linksHeight = links.getBoundingClientRect().height

        if (containerHeight === 0) {
            navToggle.classList.add('activo');
            linksContainer.style.height = `${linksHeight}px`;
        } else {
            navToggle.classList.remove('activo');
            linksContainer.style.height = 0
        }
    })
}


/* ========== FIXED NAVBAR ========== */
function fixedNav() {
    const navbar = document.getElementById('navbar');
    const topLink = document.querySelector('.btn-up');

    window.addEventListener("scroll", () => {
        const scrollHeight = window.scrollY;
        const navHeight = navbar.getBoundingClientRect().height;

        if (scrollHeight > navHeight) {
            navbar.classList.add("fixed-nav");
        } else {
            navbar.classList.remove("fixed-nav");
        }

        if (scrollHeight > navHeight) {
            topLink.classList.add("show-link");
        } else {
            topLink.classList.remove("show-link");
        }
    });
}


/* ========== SCROLL ========== */

function smoothScroll() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const linksContainer = document.querySelector(".nav-links__container");
    const scrollLinks = document.querySelectorAll(".scroll-link");

    scrollLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const id = e.currentTarget.getAttribute("href").slice(1);
            const element = document.getElementById(id);
            /* Calculando heights */
            const navHeight = navbar.getBoundingClientRect().height;
            const containerHeight = linksContainer.getBoundingClientRect().height;
            const fixedNav = navbar.classList.contains("fixed-nav");
            let position = element.offsetTop - navHeight;

            if (!fixedNav) {
                position = position - navHeight;
            }

            if (navHeight > 82) {
                position = position + containerHeight;
            }

            window.scrollTo({
                left: 0,
                top: position,
            });

            // Close navbar when clicks a link
            linksContainer.style.height = 0;
            navToggle.classList.remove('activo');
        });
    });
}
