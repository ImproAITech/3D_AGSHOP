// script.js
const WHASTAPP_NUMBER = "524491070164";

const dbProductos = [
    {
        id: 1,
        name: "Super Mario 3D - Figura Color",
        img: "assets/mario.png",
        desc: "Increíble figura de Super Mario impresa en 3D a todo color. Perfecta para coleccionistas."
    },
    {
        id: 2,
        name: "Letras y Nombres Personalizados",
        img: "assets/nombres.png",
        desc: "Nombres y letras personalizadas en 3D. Ideales para decorar cuartos, eventos o como regalos únicos."
    },
    {
        id: 3,
        name: "Búhos Minimalistas Decorativos",
        img: "assets/buhos.png",
        desc: "Set de búhos con un diseño limpio y nórdico. El toque perfecto de elegancia y estilo para tu estante."
    },
    {
        id: 4,
        name: "Auténtico Logo Fórmula 1",
        img: "assets/f1.png",
        desc: "Logo oficial de la Fórmula 1 en relieve. El accesorio decorativo definitivo para los fanáticos del automovilismo."
    },
    {
        id: 5,
        name: "Trío de Lagartijas Divertidas",
        img: "assets/lagartijas.png",
        desc: "Reptiles súper simpáticos en poses divertidas y expresivas. Excelente adorno anti-estrés para la oficina."
    },
    {
        id: 6,
        name: "Pokébolas Coleccionables",
        img: "assets/pokebolas.png",
        desc: "Colección de Pokébolas precisas y detalladas impresas en 3D. ¡Atrápalas a todas en tamaño real!"
    },
    {
        id: 7,
        name: "Soporte Celular Diseño Orgánico",
        img: "assets/soporte-cel.png",
        desc: "Soporte de escritorio elegante con un diseño moderno inspirado en crecimiento orgánico y celular."
    },
    {
        id: 8,
        name: "Pulpito Texturizado Kawaii",
        img: "assets/pulpito.png",
        desc: "Pulpo adorable impreso con un diseño especial texturizado similar a tejido. ¡Imposible no quererlo!"
    },
    {
        id: 9,
        name: "Soportes de Celular Fórmula 1",
        img: "assets/f1-soporte.png",
        desc: "Bases de celular premium con temática de F1. Mantén tu celular visible mientras trabajas."
    },
    {
        id: 10,
        name: "Varita Mágica de Colección",
        img: "assets/varita.png",
        desc: "Réplica en tamaño real de varita mágica, con texturas de madera y un acabo súper detallado."
    },
    {
        id: 11,
        name: "Gran Búho Blanco Detallado",
        img: "assets/buho-blanco.png",
        desc: "Magnífica figura de búho con una cantidad asombrosa de detalles en el plumaje. Una pieza de colección."
    },
    {
        id: 12,
        name: "Figura Spider-Man Miles Morales",
        img: "assets/spiderman.png",
        desc: "Espectacular figura cabezona de Spider-Man con su icónica sudadera. ¡Ideal para exhibir!"
    },
    {
        id: 13,
        name: "Organizador Cactus para Escritorio",
        img: "assets/cactus-organizer.png",
        desc: "Porta audífonos y accesorios en forma de cactus. Funcional, minimalista y con un estilo increíble."
    },
    {
        id: 14,
        name: "Maqueta Mercedes-AMG GT Escala",
        img: "assets/mercedes.png",
        desc: "Réplica a escala del icónico Mercedes-AMG GT. Impresión ultradetallada para coleccionistas del automovilismo."
    },
    {
        id: 15,
        name: "Placa de Escritorio Personalizada",
        img: "assets/nameplate.png",
        desc: "Placa elegante con tu nombre y título personalizado. El detalle perfecto para tu escritorio de oficina."
    }
];

// Algoritmo de Rotación Diaria Extrema
function getDailySelection() {
    const today = new Date();
    const seedString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    
    let hash = 0;
    for (let i = 0; i < seedString.length; i++) {
        hash = seedString.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const startIndex = Math.abs(hash) % dbProductos.length;
    
    const dailyItems = [];
    for(let i = 0; i < 4; i++) {
        const index = (startIndex + i) % dbProductos.length;
        dailyItems.push(dbProductos[index]);
    }
    
    return dailyItems;
}

// URL hacia WhatsApp (Catálogo Propio)
function getWhatsAppUrl(productName) {
    const message = `¡Hola 3D AGSHOP! Vi este producto en tu página web y me encantó:\n\n*${productName}*\n\n¿Me podrías dar más información sobre precio, disponibilidad o personalización?`;
    return `https://wa.me/${WHASTAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Renderizar Tarjetas Animadas (AOS Integration)
function renderCard(product, isDaily = false, index) {
    const badge = isDaily ? `<div class="card-badge">🔥 TOP HOY 🔥</div>` : '';
    // Variar los delays y animaciones basados en el índice
    const delay = isDaily ? index * 150 : index * 100;
    const animType = isDaily ? 'zoom-in' : 'fade-up';
    
    return `
        <div class="product-card" data-aos="${animType}" data-aos-delay="${delay}">
            <div class="card-img-wrapper">
                ${badge}
                <img src="${product.img}" alt="${product.name}" loading="lazy">
            </div>
            <div class="card-info">
                <h3>${product.name}</h3>
                <p>${product.desc}</p>
                <a href="${getWhatsAppUrl(product.name)}" target="_blank" class="buy-btn">
                    ¡Quiero este Modelo! 🚀
                </a>
            </div>
        </div>
    `;
}

// Inicialización de efectos excesivos
function init() {
    const dailyGrid = document.getElementById('daily-grid');
    const catalogGrid = document.getElementById('catalog-grid');

    const dailyItems = getDailySelection();
    dailyGrid.innerHTML = dailyItems.map((item, index) => renderCard(item, true, index)).join('');
    catalogGrid.innerHTML = dbProductos.map((item, index) => renderCard(item, false, index)).join('');

    // Inicializar Partículas (Efecto Cosmos de fondo)
    if(window.particlesJS) {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 150, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": ["#00ffcc", "#ff007b", "#7b2cbf", "#ffffff"] },
                "shape": { "type": ["circle", "triangle", "edge"], "stroke": { "width": 0, "color": "#000000" } },
                "opacity": { "value": 0.8, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
                "size": { "value": 4, "random": true, "anim": { "enable": true, "speed": 10, "size_min": 0.1, "sync": false } },
                "line_linked": { "enable": true, "distance": 100, "color": "#00ffcc", "opacity": 0.3, "width": 1 },
                "move": { "enable": true, "speed": 4, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": true, "rotateX": 600, "rotateY": 1200 } }
            },
            "interactivity": {
                "detect_on": "window",
                "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                "modes": { "repulse": { "distance": 150, "duration": 0.4 }, "push": { "particles_nb": 4 } }
            },
            "retina_detect": true
        });
    }

    // Inicializar AOS para Animar en el Scroll
    if(window.AOS) {
        AOS.init({
            once: false,      // Permite que la animación ocurra cada vez que scrolleas arriba y abajo
            mirror: true,     // Anima elementos cuando te desplazas hacia atrás pasándolos
            duration: 800,    // Duración default de animaciones
            easing: 'ease-in-out-back' // Efecto de rebote default
        });
    }
}

// Disparar la locura
document.addEventListener('DOMContentLoaded', init);
