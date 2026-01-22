// ==========================
// CONSOLOCATE Campus Navigation Script (DB Buildings Version)
// ==========================

// ==========================
// Global Variables
// ==========================
let locations = [];
let currentFilter = "all";
let campusMap;

// ==========================
// Initialize Application
// ==========================
document.addEventListener("DOMContentLoaded", async function () {
    console.log("🎓 CONSOLOCATE System Initialized");

    await fetchLocationsFromDB();

    setupSidebarEvents();
    setupKeyboardShortcuts();
    setupScrollBehavior();
});

// ==========================
// API / Data Fetching (Locations)
// ==========================
async function fetchLocationsFromDB() {
    try {
        const response = await fetch("/api/Locations");
        if (!response.ok) throw new Error(response.status);
        locations = await response.json();
        console.log(`✅ Loaded ${locations.length} locations`);
    } catch (err) {
        console.warn("⚠ Using empty data (locations)");
        locations = [];
    }
}

// ==========================
// API / Data Fetching (Buildings)
// ==========================
async function fetchBuildingsFromDB() {
    const res = await fetch("/api/buildings");
    if (!res.ok) throw new Error("Failed to load buildings");
    return await res.json();
}

// ==========================
// Screen Navigation
// ==========================
function showScreen(screenName) {
    closeMenu();
    document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));

    const map = {
        welcome: "welcomeScreen",
        dashboard: "dashboardScreen",
        search: "searchScreen",
        directory: "directoryScreen",
        faqs: "faqsScreen",
        map: "mapScreen",
    };

    const target = document.getElementById(map[screenName]);
    if (!target) return;

    target.classList.add("active");

    if (screenName === "map") {
        initCampusMap();
        setTimeout(() => campusMap?.resize(), 200);
    }
}

// ==========================
// Sidebar
// ==========================
function toggleMenu() {
    document.getElementById("sideMenu")?.classList.toggle("open");
    document.getElementById("menuOverlay")?.classList.toggle("open");
}
function closeMenu() {
    document.getElementById("sideMenu")?.classList.remove("open");
    document.getElementById("menuOverlay")?.classList.remove("open");
}
function setupSidebarEvents() {
    document.getElementById("menuOverlay")?.addEventListener("click", closeMenu);
}

// ==========================
// MAP INITIALIZATION
// ==========================
function initCampusMap() {
    if (campusMap) return;

    mapboxgl.accessToken =
        "pk.eyJ1IjoiYXlvd21paCIsImEiOiJjbWo1eW5yMm4wOWozM2ZwdWp5bGJvbmJ5In0.P2OctDtdjbLsVMVMcVLjrw";

    campusMap = new mapboxgl.Map({
        container: "campusMap",
        style: "mapbox://styles/mapbox/streets-v12",
        center: [120.8129, 14.8532],
        zoom: 18,
        minZoom: 17,
        maxBounds: [
            [120.811, 14.851],
            [120.8155, 14.855],
        ],
    });

    campusMap.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    campusMap.on("load", async () => {
        try {
            const buildings = await fetchBuildingsFromDB();
            buildings.forEach((b) => addBuilding(b));
            console.log(`🏫 Loaded ${buildings.length} buildings`);
        } catch (e) {
            console.error(e);
            alert("Failed to load buildings from database.");
        }
    });
}

// ==========================
// BUILDING FUNCTION (CORE)
// ==========================
function addBuilding({ id, name, coordinates, color, info }) {
    if (!campusMap) return;
    if (!id || !name || !Array.isArray(coordinates) || coordinates.length < 3) return;

    // ✅ Auto-close polygon (Mapbox likes closed rings)
    const first = coordinates[0];
    const last = coordinates[coordinates.length - 1];
    if (first[0] !== last[0] || first[1] !== last[1]) {
        coordinates = [...coordinates, first];
    }

    const sourceId = `${id}-source`;
    const fillId = `${id}-fill`;
    const outlineId = `${id}-outline`;
    const labelId = `${id}-label`;

    // ✅ prevent duplicates if called twice
    if (campusMap.getSource(sourceId)) return;

    campusMap.addSource(sourceId, {
        type: "geojson",
        data: {
            type: "Feature",
            properties: { name },
            geometry: {
                type: "Polygon",
                coordinates: [coordinates],
            },
        },
    });

    campusMap.addLayer({
        id: fillId,
        type: "fill",
        source: sourceId,
        paint: {
            "fill-color": color || "#ff2200",
            "fill-opacity": 0.25,
        },
    });

    campusMap.addLayer({
        id: outlineId,
        type: "line",
        source: sourceId,
        paint: {
            "line-color": color || "#ff2200",
            "line-width": 3,
            "line-opacity": 0,
        },
    });

    campusMap.addLayer({
        id: labelId,
        type: "symbol",
        source: sourceId,
        layout: {
            "text-field": ["get", "name"],
            "text-size": ["interpolate", ["linear"], ["zoom"], 16, 0, 18, 14],
            "text-font": ["Open Sans Bold"],
            "text-offset": [0, 0.6],
        },
        paint: {
            "text-color": "#111",
            "text-halo-color": "#fff",
            "text-halo-width": 1.5,
        },
    });

    // click/hover events
    campusMap.on("click", fillId, () => {
        openInfoPanel(info);
        campusMap.setPaintProperty(outlineId, "line-opacity", 1);
    });

    campusMap.on("mouseenter", fillId, () => {
        campusMap.getCanvas().style.cursor = "pointer";
        campusMap.setPaintProperty(outlineId, "line-opacity", 1);
    });

    campusMap.on("mouseleave", fillId, () => {
        campusMap.getCanvas().style.cursor = "";
        campusMap.setPaintProperty(outlineId, "line-opacity", 0);
    });
}

// ==========================
// INFO PANEL
// ==========================
function openInfoPanel(data) {
    const panel = document.getElementById('buildingInfoPanel');

    // TITLE & DESCRIPTION
    document.getElementById('panelTitle').innerText = data.title || '';
    document.getElementById('panelDesc').innerText = data.description || '';

    // IMAGE
    const img = document.getElementById('panelImage');
    if (data.image) {
        img.src = data.image;
        img.style.display = 'block';
    } else {
        img.src = '/images/placeholder.jpg'; // optional fallback
        img.style.display = 'block';
    }

    // OFFICES / FACILITIES
    const list = document.getElementById('panelList');
    list.innerHTML = '';

    if (data.offices && data.offices.length > 0) {
        data.offices.forEach(o => {
            const li = document.createElement('li');
            li.innerText = o;
            list.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.innerText = 'No listed offices';
        list.appendChild(li);
    }

    panel.classList.add('active');
}


function closeInfoPanel() {
    document.getElementById("buildingInfoPanel")?.classList.remove("active");
}

// ==========================
// Utilities
// ==========================
function setupKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeMenu();
            closeInfoPanel();
        }
    });
}
function setupScrollBehavior() {
    window.addEventListener("scroll", () => { });
}
