// ==========================
// CONSOLOCATE Campus Navigation Script (DB Buildings Version)
// ==========================

// ==========================
// Global Variables
// ==========================
let locations = [];
let campusMap;

// ==========================
// Initialize Application
// ==========================
document.addEventListener("DOMContentLoaded", async function () {
    console.log("🎓 CONSOLOCATE System Initialized");

    await fetchLocationsFromDB();
    setupSidebarEvents();
    setupKeyboardShortcuts();
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
    } catch {
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
// MAP INITIALIZATION
// ==========================
let lastScreen = "welcome";

function showScreen(screenName) {
    closeInfoPanel();
    // Hide all screens
    document.querySelectorAll(".screen").forEach(s =>
        s.classList.remove("active")
    );

    const map = {
        welcome: "welcomeScreen",
        dashboard: "dashboardScreen",
        search: "searchScreen",
        directory: "directoryScreen",
        faqs: "faqsScreen",
        map: "mapScreen"
    };

    const targetId = map[screenName];
    if (!targetId) return;

    const target = document.getElementById(targetId);
    if (!target) return;

    target.classList.add("active");

    // 🚨 THIS IS THE IMPORTANT PART
    if (screenName === "map") {
        initCampusMap();
        setTimeout(() => campusMap?.resize(), 200);
    }

    lastScreen = screenName;
}

function goBack() {
    showScreen(lastScreen);
}
function initCampusMap() {
    if (campusMap) return;

    mapboxgl.accessToken =
        "pk.eyJ1IjoiYXlvd21paCIsImEiOiJjbWo1eW5yMm4wOWozM2ZwdWp5bGJvbmJ5In0.P2OctDtdjbLsVMVMcVLjrw";

    campusMap = new mapboxgl.Map({
        container: "campusMap",
        style: "mapbox://styles/mapbox/streets-v12",
        center: [120.8129, 14.8532],
        zoom: 18,
        minZoom: 18,
        maxBounds: [
            [120.811, 14.851],
            [120.8155, 14.855],
        ],
    });

    campusMap.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    campusMap.on("load", async () => {
        try {
            const buildings = await fetchBuildingsFromDB();
            buildings.forEach(b => addBuilding(b));
            console.log(`🏫 Loaded ${buildings.length} buildings`);
        } catch (e) {
            console.error(e);
            alert("Failed to load buildings from database.");
        }
    });
}

// ==========================
// BUILDING FUNCTION (FIXED)
// ==========================
function addBuilding(building) {
    if (!campusMap) return;

    if (!building || !Array.isArray(building.coordinates)) {
        console.warn("Invalid building:", building);
        return;
    }

    const ring = building.coordinates
        .filter(c => c.lng != null && c.lat != null)
        .map(c => [c.lng, c.lat]);

    if (ring.length < 3) return;

    if (ring[0][0] !== ring.at(-1)[0] || ring[0][1] !== ring.at(-1)[1]) {
        ring.push(ring[0]);
    }

    const sourceId = `building-${building.id}-source`;
    const fillId = `building-${building.id}-fill`;
    const outlineId = `building-${building.id}-outline`;
    const labelId = `building-${building.id}-label`;

    if (campusMap.getSource(sourceId)) return;

    campusMap.addSource(sourceId, {
        type: "geojson",
        data: {
            type: "Feature",
            properties: {
                name: building.name || "",
                title: building.title || ""
            },
            geometry: {
                type: "Polygon",
                coordinates: [ring]
            }
        }
    });

    campusMap.addLayer({
        id: fillId,
        type: "fill",
        source: sourceId,
        paint: {
            "fill-color": building.color || "#ff2200",
            "fill-opacity": 0.35
        }
    });

    campusMap.addLayer({
        id: outlineId,
        type: "line",
        source: sourceId,
        paint: {
            "line-color": building.color || "#ff2200",
            "line-width": 2
        }
    });

    campusMap.addLayer(
        {
            id: labelId,
            type: "symbol",
            source: sourceId,
            layout: {
                "text-field": [
                    "coalesce",
                    ["get", "title"],
                    ["get", "name"]
                ],
                "text-size": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    17, 10,
                    19, 16
                ],
                "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                "text-anchor": "center"
            },
            paint: {
                "text-color": "#111",
                "text-halo-color": "#fff",
                "text-halo-width": 1.5
            }
        },
        outlineId
    );

    campusMap.on("click", fillId, () => openInfoPanel(building));
    campusMap.on("mouseenter", fillId, () => campusMap.getCanvas().style.cursor = "pointer");
    campusMap.on("mouseleave", fillId, () => campusMap.getCanvas().style.cursor = "");
}

// ==========================
// INFO PANEL
// ==========================
function openInfoPanel(building) {
    console.log("OPEN PANEL BUILDING:", building);

    const panel = document.getElementById("buildingInfoPanel");
    if (!panel) return;

    // TEXT
    document.getElementById("panelTitle").innerText =
        building.title || building.name || "";

    document.getElementById("panelDesc").innerText =
        building.description || "";

    // IMAGE
    const img = document.getElementById("panelImage");
    img.src = building.imageUrl || "/images/placeholder.jpg";
    img.style.display = "block";

    // QR
    const qr = document.getElementById("panelQr");
    qr.src = building.qrCodeUrl || "/images/qr/qrcodesample.jpg";
    qr.style.display = "block";

    // OFFICES
    const list = document.getElementById("panelList");
    list.innerHTML = "";

    if (Array.isArray(building.offices) && building.offices.length > 0) {
        building.offices.forEach(o => {
            const li = document.createElement("li");
            li.innerText = o.officeName;
            list.appendChild(li);
        });
    } else {
        const li = document.createElement("li");
        li.innerText = "No listed offices";
        list.appendChild(li);
    }

    panel.classList.add("active");
}


// ==========================
// Utilities
// ==========================
function setupKeyboardShortcuts() {
    document.addEventListener("keydown", e => {
        if (e.key === "Escape") closeInfoPanel();
    });
}

function setupSidebarEvents() {
    document.getElementById("menuOverlay")?.addEventListener("click", closeInfoPanel);
}


// Panel close function
function closeInfoPanel() {
    document.getElementById("buildingInfoPanel")?.classList.remove("active");
}
