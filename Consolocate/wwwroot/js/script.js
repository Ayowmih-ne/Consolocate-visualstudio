// ==========================
// CONSOLOCATE Campus Navigation Script
// ==========================

// Campus Locations Database
const locations = [
    { id: 1, name: "Main Administration Building", description: "President's Office, Board Room, Executive Offices", category: "admin", floor: "All Floors", contact: "(044) 791-0883" },
    { id: 2, name: "Registrar's Office", description: "Enrollment, transcripts, academic records", category: "admin", floor: "Ground Floor, Admin Bldg", contact: "registrar@lcup.edu.ph" },
    { id: 3, name: "College of Nursing Building", description: "Nursing Department, Skills Lab, Faculty Offices", category: "all", floor: "1st-3rd Floor", contact: "nursing@lcup.edu.ph" },
    { id: 4, name: "IT Building", description: "Computer Studies, Computer Labs, Server Room", category: "all", floor: "Ground-3rd Floor", contact: "computerlab@lcup.edu.ph" },
    { id: 5, name: "Business Building", description: "Business Admin, Accountancy, Faculty Rooms", category: "all", floor: "1st-4th Floor", contact: "business@lcup.edu.ph" },
    { id: 6, name: "Student Affairs Office", description: "Student services, guidance, scholarships", category: "services", floor: "2nd Floor, Main Bldg", contact: "studentaffairs@lcup.edu.ph" },
    { id: 7, name: "University Library", description: "Books, digital resources, study areas", category: "facilities", floor: "Ground-2nd Floor", contact: "library@lcup.edu.ph" },
    { id: 8, name: "Finance Office", description: "Cashier, payments, financial aid", category: "admin", floor: "Ground Floor, Admin", contact: "finance@lcup.edu.ph" },
    { id: 9, name: "Health & Wellness Center", description: "Campus clinic, first aid, health services", category: "support", floor: "Ground Floor", contact: "clinic@lcup.edu.ph" },
    { id: 10, name: "Cafeteria & Food Court", description: "Student dining, food services, canteen", category: "facilities", floor: "Ground Floor", contact: "N/A" },
    { id: 11, name: "Gymnasium & Sports Complex", description: "Indoor sports, basketball court, fitness", category: "facilities", floor: "Ground Floor", contact: "sports@lcup.edu.ph" },
    { id: 12, name: "Campus Security Office", description: "Safety, security, lost and found", category: "support", floor: "Main Gate", contact: "security@lcup.edu.ph" },
    { id: 13, name: "Chapel / Prayer Room", description: "Campus ministry, religious activities", category: "facilities", floor: "2nd Floor, Main Bldg", contact: "ministry@lcup.edu.ph" },
    { id: 14, name: "Guidance & Counseling Office", description: "Student counseling, psychological support", category: "services", floor: "3rd Floor, Main Bldg", contact: "guidance@lcup.edu.ph" },
    { id: 15, name: "Science Laboratories", description: "Chemistry, Physics, Biology labs", category: "all", floor: "Science Building", contact: "science@lcup.edu.ph" }
];

let currentFilter = 'all';
let campusMap; // Global map variable

// ==========================
// Initialize Application
// ==========================
document.addEventListener('DOMContentLoaded', function () {
    console.log('🎓 CONSOLOCATE System Initialized');
    console.log(`📍 Loaded ${locations.length} campus locations`);

    showScreen('welcome');
    setupKeyboardShortcuts();
    setupScrollBehavior();
});

// ==========================
// Screen Navigation System
// ==========================
function showScreen(screenName) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));

    const screens = {
        'welcome': 'welcomeScreen',
        'dashboard': 'dashboardScreen',
        'search': 'searchScreen',
        'directory': 'directoryScreen',
        'faqs': 'faqsScreen',
        'map': 'mapScreen'
    };

    const targetScreen = document.getElementById(screens[screenName]);
    if (targetScreen) {
        targetScreen.classList.add('active');
        window.scrollTo(0, 0);
    }

    // Manage FAB visibility
    const fab = document.getElementById('fabButton');
    if (fab) fab.classList.toggle('visible', screenName !== 'welcome');

    // Screen-specific content
    if (screenName === 'search') renderLocations();

    if (screenName === 'map') {
        initCampusMap();
        setTimeout(() => campusMap?.resize(), 200);
    }

    console.log(`📱 Navigated to: ${screenName}`);
}

// ==========================
// Render Locations
// ==========================
function renderLocations() {
    const container = document.getElementById('locationsList');
    const searchTerm = document.getElementById('locationSearch').value.toLowerCase();

    const filtered = locations.filter(loc => {
        const matchesCategory = currentFilter === 'all' || loc.category === currentFilter;
        const matchesSearch =
            loc.name.toLowerCase().includes(searchTerm) ||
            loc.description.toLowerCase().includes(searchTerm) ||
            loc.floor.toLowerCase().includes(searchTerm);
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

// ==========================
// Filter by Category
// ==========================
function filterByTab(category, event) {
    currentFilter = category;
    document.querySelectorAll('.filter-chip').forEach(chip => chip.classList.remove('active'));
    if (event) event.currentTarget.classList.add('active');
    renderLocations();
}

// ==========================
// Search / Clear Search
// ==========================
function filterLocations() { renderLocations(); }

function clearSearch() {
    document.getElementById('locationSearch').value = '';
    renderLocations();
}

// ==========================
// Select Location
// ==========================
function selectLocation(id) {
    const loc = locations.find(l => l.id === id);
    if (!loc) return;

    const message = `
📍 ${loc.name}

📋 Description: ${loc.description}
🏢 Location: ${loc.floor}
📞 Contact: ${loc.contact}

Would you like to see the LED path navigation?`;

    if (confirm(message)) {
        alert('🎯 Activating LED path on 3D model...\nFollow the illuminated path on the physical campus model!');
    }
}

// ==========================
// Toggle Accordions
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

// ==========================
// Show About Modal
// ==========================
function showAbout() {
    alert(`🎓 La Consolacion University Philippines
Founded: 1937

"Unitas • Caritas • Veritas"

CONSOLOCATE is our interactive campus navigation system.`);
}

// ==========================
// Map Initialization
// ==========================
function initCampusMap() {
    if (campusMap) return;

    mapboxgl.accessToken = 'pk.eyJ1IjoiYXlvd21paCIsImEiOiJjbWo1eW5yMm4wOWozM2ZwdWp5bGJvbmJ5In0.P2OctDtdjbLsVMVMcVLjrw';

    const lcupBounds = [
        [120.8115, 14.8521],
        [120.8145, 14.8545]
    ];

    campusMap = new mapboxgl.Map({
        container: 'campusMap',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [120.8129, 14.8532],
        zoom: 20,
        minZoom: 19,
        maxZoom: 22,
        pitch: 0,
        maxBounds: lcupBounds,
        antialias: true
    });

    campusMap.addControl(new mapboxgl.NavigationControl());

    campusMap.on('load', () => console.log('🏗️ Map loaded within LCUP bounds'));

    // Add markers
    locations.forEach(loc => {
        const lng = 120.8120 + (Math.random() * 0.0015);
        const lat = 14.8525 + (Math.random() * 0.0010);

        new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .setPopup(new mapboxgl.Popup({ offset: 25 })
                .setHTML(`<h4>${loc.name}</h4><p>${loc.description}</p>`))
            .addTo(campusMap);
    });
}

// ==========================
// Keyboard Shortcuts
// ==========================
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', e => {
        if (!e.ctrlKey && !e.altKey) {
            if (e.key.toLowerCase() === 'h') showScreen('welcome');
            if (e.key.toLowerCase() === 'd') showScreen('dashboard');
        }
        if (e.key === 'Escape') {
            const active = document.querySelector('.screen.active');
            if (active && active.id !== 'welcomeScreen') showScreen('dashboard');
        }
    });
}

// ==========================
// Scroll Behavior
// ==========================
function setupScrollBehavior() {
    window.addEventListener('scroll', () => {
        const fab = document.getElementById('fabButton');
        if (fab?.classList.contains('visible')) {
            fab.style.opacity = window.scrollY > 200 ? '1' : '0.9';
        }
    });
}
