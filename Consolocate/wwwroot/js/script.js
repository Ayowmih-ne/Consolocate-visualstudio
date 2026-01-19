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

    // Token from your previous code
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXlvd21paCIsImEiOiJjbWo1eW5yMm4wOWozM2ZwdWp5bGJvbmJ5In0.P2OctDtdjbLsVMVMcVLjrw';

    campusMap = new mapboxgl.Map({
        container: 'campusMap',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [120.8129, 14.8532],
        zoom: 19,
        pitch: 0,
        antialias: true
    });

    campusMap.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
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