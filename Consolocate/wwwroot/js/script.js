// ==========================
// CONSOLOCATE Campus Navigation Script
// ==========================

// Global Variables
let locations = [];
let currentFilter = 'all';
let campusMap;

// ==========================
// Initialize Application
// ==========================
document.addEventListener('DOMContentLoaded', async function () {
    console.log('🎓 CONSOLOCATE System Initialized');

    // 1. KUNIN ANG DATA SA DATABASE GAMIT ANG API
    await fetchLocationsFromDB();

    // 2. Setup Sidebar at Events
    setupSidebarEvents();
    setupKeyboardShortcuts();
    setupScrollBehavior();
});

// ==========================
// API / Data Fetching
// ==========================
async function fetchLocationsFromDB() {
    try {
        console.log("⏳ Fetching data from database...");
        const response = await fetch('/api/Locations');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        locations = await response.json();
        console.log(`✅ Success! Loaded ${locations.length} locations from Database.`);
    } catch (error) {
        console.error('❌ Error loading locations:', error);
        // Fallback alert para alam mong may error
        console.warn("Using empty data due to API error.");
    }
}

// ==========================
// Screen Navigation System
// ==========================
function showScreen(screenName) {
    // 1. Close sidebar if open
    closeMenu();

    // 2. Hide all screens
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));

    // 3. Define Screen Map
    const screens = {
        'welcome': 'welcomeScreen',
        'dashboard': 'dashboardScreen',
        'search': 'searchScreen',
        'directory': 'directoryScreen',
        'faqs': 'faqsScreen',
        'map': 'mapScreen'
    };

    // 4. Activate Target Screen
    const targetId = screens[screenName];
    const targetScreen = document.getElementById(targetId);

    if (targetScreen) {
        targetScreen.classList.add('active');
        window.scrollTo(0, 0);
    } else {
        console.error(`Screen "${screenName}" not found.`);
        return;
    }

    // 5. Manage FAB Visibility
    const fab = document.getElementById('fabButton');
    if (fab) fab.classList.toggle('visible', screenName !== 'welcome');

    // 6. Screen-specific logic
    if (screenName === 'search') {
        renderLocations();
        setTimeout(() => {
            const searchBox = document.getElementById('locationSearch');
            if (searchBox) searchBox.focus();
        }, 100);
    }

    if (screenName === 'map') {
        initCampusMap();
        setTimeout(() => campusMap?.resize(), 200);
    }
}

// ==========================
// Sidebar & Menu System
// ==========================
function toggleMenu() {
    const menu = document.getElementById('sideMenu');
    const overlay = document.getElementById('menuOverlay');
    if (menu && overlay) {
        menu.classList.toggle('open');
        overlay.classList.toggle('open');
    }
}

function closeMenu() {
    const menu = document.getElementById('sideMenu');
    const overlay = document.getElementById('menuOverlay');
    if (menu) menu.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
}

function setupSidebarEvents() {
    const overlay = document.getElementById('menuOverlay');
    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }
}

// ==========================
// Search & Rendering
// ==========================
function renderLocations() {
    const container = document.getElementById('locationsList');
    if (!container) return;

    const searchInput = document.getElementById('locationSearch');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

    const filtered = locations.filter(loc => {
        // Safe check for null values
        const cat = loc.category ? loc.category.toLowerCase() : '';
        const name = loc.name ? loc.name.toLowerCase() : '';
        const desc = loc.description ? loc.description.toLowerCase() : '';
        const flr = loc.floor ? loc.floor.toLowerCase() : '';

        const matchesCategory = currentFilter === 'all' || cat === currentFilter.toLowerCase();
        const matchesSearch = name.includes(searchTerm) || desc.includes(searchTerm) || flr.includes(searchTerm);

        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="text-align:center;padding:60px 20px;">
                <div style="font-size:64px;margin-bottom:20px;">🔍</div>
                <h3 style="font-size:24px;color:#1e293b;margin-bottom:10px;">No Results Found</h3>
                <p style="font-size:16px;color:#64748b;">Try adjusting your search or filter criteria</p>
            </div>`;
        return;
    }

    container.innerHTML = filtered.map(loc => `
        <div class="result-card" onclick="selectLocation(${loc.id})">
            <div class="result-badge">${loc.id}</div>
            <div class="result-info">
                <h4>${loc.name}</h4>
                <p>📍 ${loc.floor} • ${loc.description}</p>
            </div>
        </div>
    `).join('');
}

function filterByTab(category, event) {
    currentFilter = category;
    document.querySelectorAll('.filter-chip').forEach(chip => chip.classList.remove('active'));
    if (event) event.currentTarget.classList.add('active');
    renderLocations();
}

function filterLocations() { renderLocations(); }

function clearSearch() {
    const input = document.getElementById('locationSearch');
    if (input) {
        input.value = '';
        input.focus();
        renderLocations();
    }
}

function selectLocation(id) {
    const loc = locations.find(l => l.id === id);
    if (!loc) return;

    if (confirm(`📍 ${loc.name}\n\nShow this on the map?`)) {
        showScreen('map');
        // Future: Add logic here to fly to the location on the map
    }
}

// ==========================
// UI Helpers (Directory, FAQ, About)
// ==========================
function toggleCollege(element) {
    const item = element.closest('.college-item');
    document.querySelectorAll('.college-item').forEach(c => c !== item && c.classList.remove('expanded'));
    item.classList.toggle('expanded');
}

function toggleFaq(element) {
    const card = element.closest('.faq-card');
    document.querySelectorAll('.faq-card').forEach(f => f !== card && f.classList.remove('active'));
    card.classList.toggle('active');
}

function showAbout() {
    closeMenu();
    alert("🎓 La Consolacion University Philippines\n\nCONSOLOCATE v1.0\nYour Campus Navigation Assistant.");
}

// ==========================
// Mapbox Initialization
// ==========================
function initCampusMap() {
    if (campusMap) return;

    mapboxgl.accessToken = 'pk.eyJ1IjoiYXlvd21paCIsImEiOiJjbWo1eW5yMm4wOWozM2ZwdWp5bGJvbmJ5In0.P2OctDtdjbLsVMVMcVLjrw';

    // 1. DEFINISYON NG KULUNGAN (BOUNDS) - Base sa GeoJSON mo
    // Dinagdagan ko ng konting space (+/- 0.0005) para may allowance
    const lcupBounds = [
        [120.81100, 14.85100], // South-West (Baba-Kaliwa)
        [120.81550, 14.85500]  // North-East (Taas-Kanan)
    ];

    campusMap = new mapboxgl.Map({
        container: 'campusMap',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [120.8129, 14.8532], // Gitna ng LCUP
        zoom: 18,
        pitch: 0,
        antialias: true,

        // 👇 DITO NATIN I-LOCK ANG MAP 👇
        maxBounds: lcupBounds, // Bawal lumabas dito
        minZoom: 17            // Bawal mag-zoom out nang sobra
    });

    campusMap.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    // 👇 DITO TAYO MAGDADAGDAG NG LAYERS PAGKA-LOAD NG MAP 👇
    campusMap.on('load', () => {

        // 1. ADD SOURCE: MAIN BUILDING
        campusMap.addSource('main-building-source', {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'geometry': {
                    'type': 'Polygon',
                    'coordinates': [
                        [
                            // COPY-PASTED COORDINATES FROM YOU
                            [120.8127945241639, 14.85391026664972],
                            [120.81275693338233, 14.853572244530937],
                            [120.81279908062339, 14.853565638230634],
                            [120.8127865503622, 14.853445623731488],
                            [120.81274819424101, 14.853449190420477],
                            [120.81273691238607, 14.853356994699837],
                            [120.81262306821594, 14.85336789957229],
                            [120.81264460630206, 14.853568152581943],
                            [120.8126128119847, 14.853574100687922],
                            [120.8126281963315, 14.853728751395948],
                            [120.81265999065062, 14.853726768694813],
                            [120.81268255435884, 14.853925038673324],
                            [120.81269486183766, 14.853926030022578],
                            [120.81269588745965, 14.853939908914683],
                            [120.812759476096, 14.853935943517143],
                            [120.81275742485013, 14.853915125179114],
                            [120.81279434728299, 14.85391115978112]
                        ]
                    ]
                }
            }
        });

        // 2. LAYER A: BLUE OUTLINE (BORDER)
        campusMap.addLayer({
            'id': 'main-building-outline',
            'type': 'line',
            'source': 'main-building-source',
            'layout': {},
            'paint': {
                'line-color': '#0080ff', // Neon Blue
                'line-width': 3,
                'line-opacity': 0
            }
        });

        // 3. LAYER B: TRANSPARENT BLUE FILL (CLICKABLE AREA)
        campusMap.addLayer({
            'id': 'main-building-fill',
            'type': 'fill',
            'source': 'main-building-source',
            'layout': {},
            'paint': {
                'fill-color': '#0080ff',
                'fill-opacity': 0.2 // 20% visible
            }
        });

        // 4. CLICK EVENT (OPEN INFO PANEL)
        campusMap.on('click', 'main-building-fill', (e) => {

            // A. Tawagin ang function para buksan ang panel
            openInfoPanel({
                title: "Main Administration Building",
                description: "This is the heart of the university. It houses the key administrative offices including the President's Office.",
                image: "/images/main_bldg.jpg", // Siguraduhin may image ka dito, or use placeholder
                offices: [
                    "Office of the President",
                    "Registrar's Office (Ground Floor)",
                    "Finance / Cashier",
                    "Human Resources (HR)",
                    "Board Room"
                ]
            });
            campusMap.setPaintProperty('main-building-outline', 'line-opacity', 1);
        });

        // UPDATE SA MOUSELEAVE (Para hindi mawala kung na-click na)
        campusMap.on('mouseleave', 'main-building-fill', () => {
            campusMap.getCanvas().style.cursor = '';

            // Check muna kung bukas ang panel. Kung sarado, saka lang itago ang outline.
            const panel = document.getElementById('buildingInfoPanel');
            if (!panel.classList.contains('active')) {
                campusMap.setPaintProperty('main-building-outline', 'line-opacity', 0);
            }
        });
        // 5. MOUSE POINTER EFFECTS
        campusMap.on('mouseenter', 'main-building-fill', () => {
            campusMap.getCanvas().style.cursor = 'pointer';
        });
        campusMap.on('mouseleave', 'main-building-fill', () => {
            campusMap.getCanvas().style.cursor = '';
        });
        campusMap.on('mouseenter', 'main-building-fill', () => {
            // Gawing "Kamay" ang cursor
            campusMap.getCanvas().style.cursor = 'pointer';

            // 👇 PALITAWIN ANG OUTLINE (Gawing 1 ang Opacity)
            campusMap.setPaintProperty('main-building-outline', 'line-opacity', 1);
        });
        // 6. MOUSE LEAVE (Hover Out)
        campusMap.on('mouseleave', 'main-building-fill', () => {
            // Ibalik sa normal ang cursor
            campusMap.getCanvas().style.cursor = '';

            // 👇 ITAGO ULIT ANG OUTLINE (Gawing 0 ang Opacity)
            campusMap.setPaintProperty('main-building-outline', 'line-opacity', 0);
        });

    });
}

// ==========================
// Utilities
// ==========================
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            const menu = document.getElementById('sideMenu');
            if (menu && menu.classList.contains('open')) closeMenu();
        }
    });
}

function setupScrollBehavior() {
    window.addEventListener('scroll', () => {
        const fab = document.getElementById('fabButton');
        if (fab && fab.classList.contains('visible')) {
            fab.style.opacity = window.scrollY > 200 ? '1' : '0.9';
        }
    });
}
// ==========================
// INFO PANEL FUNCTIONS
// ==========================
function openInfoPanel(data) {
    const panel = document.getElementById('buildingInfoPanel');

    // 1. Populate Data (Ilagay ang laman)
    document.getElementById('panelTitle').innerText = data.title;
    document.getElementById('panelDesc').innerText = data.description;

    // Image Handling (Kung wala kang image, maglalagay ng default)
    const imgElement = document.getElementById('panelImage');
    imgElement.src = data.image || 'https://via.placeholder.com/350x180?text=LCUP+Building';

    // Listahan ng Offices
    const list = document.getElementById('panelList');
    list.innerHTML = ""; // Clear muna
    data.offices.forEach(office => {
        const li = document.createElement('li');
        li.innerText = office;
        li.style.marginBottom = "8px"; // Spacing
        list.appendChild(li);
    });

    // 2. Ipakita ang Panel (Slide In)
    panel.classList.add('active');
}

function closeInfoPanel() {
    const panel = document.getElementById('buildingInfoPanel');
    panel.classList.remove('active'); // Slide Out
}