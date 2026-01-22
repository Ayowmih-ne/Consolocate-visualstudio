// generate-seed.js
// Usage: node generate-seed.js

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const INPUT = path.join(__dirname, "wwwroot", "data", "buildings_raw.js");
const OUTPUT = path.join(__dirname, "seed_buildings.sql");

if (!fs.existsSync(INPUT)) {
    console.error("❌ Missing file:", INPUT);
    process.exit(1);
}

const raw = fs.readFileSync(INPUT, "utf8");

// Capture all addBuilding calls into an array
const buildings = [];
const sandbox = {
    addBuilding: (obj) => buildings.push(obj),
    console,
};
vm.createContext(sandbox);
vm.runInContext(raw, sandbox, { filename: "buildings_raw.js" });

// Helpers
const sqlStr = (s) => {
    if (s === null || s === undefined) return "NULL";
    return "N'" + String(s).replace(/'/g, "''") + "'";
};

const sqlColor = (s) => (s ? sqlStr(s) : sqlStr("#ff2200"));

const normalizeId = (id) => String(id || "").trim(); // removes leading/trailing spaces

// Fix duplicates by keeping last occurrence
const mapByCode = new Map();
for (const b of buildings) {
    const code = normalizeId(b.id);
    if (!code) continue;
    mapByCode.set(code, { ...b, id: code });
}

const unique = Array.from(mapByCode.values());

// Generate SQL (rerunnable/upsert style)
let out = "";
out += "/* =========================================\n";
out += "   CONSOLOCATE Buildings Seed (FULL)\n";
out += "   - Upsert Buildings by Code\n";
out += "   - Replace Coordinates + Offices\n";
out += "   ========================================= */\n\n";
out += "SET NOCOUNT ON;\n";
out += "BEGIN TRAN;\n\n";

for (const b of unique) {
    const code = normalizeId(b.id);
    const name = b.name || "";
    const color = b.color || "#ff2200";

    const info = b.info || {};
    const title = info.title || name;
    const desc = info.description || "";
    const image = info.image || "";

    const coords = Array.isArray(b.coordinates) ? b.coordinates : [];
    const offices = Array.isArray(info.offices) ? info.offices : [];

    // Make sure polygon ring is closed (first == last)
    let coordsFixed = coords.slice();
    if (coordsFixed.length >= 3) {
        const first = coordsFixed[0];
        const last = coordsFixed[coordsFixed.length - 1];
        if (first && last && (first[0] !== last[0] || first[1] !== last[1])) {
            coordsFixed.push(first);
        }
    }

    out += `-- ${code}\n`;
    out += `IF EXISTS (SELECT 1 FROM dbo.Buildings WHERE Code = ${sqlStr(code)})\n`;
    out += `BEGIN\n`;
    out += `  UPDATE dbo.Buildings\n`;
    out += `  SET Name=${sqlStr(name)}, Color=${sqlColor(color)}, Title=${sqlStr(title)}, Description=${sqlStr(desc)}, ImageUrl=${sqlStr(image)}\n`;
    out += `  WHERE Code=${sqlStr(code)};\n`;
    out += `END\n`;
    out += `ELSE\n`;
    out += `BEGIN\n`;
    out += `  INSERT INTO dbo.Buildings (Code, Name, Color, Title, Description, ImageUrl)\n`;
    out += `  VALUES (${sqlStr(code)}, ${sqlStr(name)}, ${sqlColor(color)}, ${sqlStr(title)}, ${sqlStr(desc)}, ${sqlStr(image)});\n`;
    out += `END\n`;
    out += `\nDECLARE @bid INT = (SELECT Id FROM dbo.Buildings WHERE Code=${sqlStr(code)});\n`;

    // Replace coords + offices
    out += `DELETE FROM dbo.BuildingCoordinates WHERE BuildingId=@bid;\n`;
    if (coordsFixed.length > 0) {
        out += `INSERT INTO dbo.BuildingCoordinates (BuildingId, Seq, Lng, Lat) VALUES\n`;
        const rows = coordsFixed.map((p, i) => {
            const lng = Number(p[0]);
            const lat = Number(p[1]);
            return `(@bid, ${i + 1}, ${lng}, ${lat})`;
        });
        out += rows.join(",\n") + ";\n";
    } else {
        out += `-- (no coordinates)\n`;
    }

    out += `\nDELETE FROM dbo.BuildingOffices WHERE BuildingId=@bid;\n`;
    if (offices.length > 0) {
        out += `INSERT INTO dbo.BuildingOffices (BuildingId, OfficeName) VALUES\n`;
        const rows = offices
            .filter((x) => String(x || "").trim().length > 0)
            .map((o) => `(@bid, ${sqlStr(o)})`);
        out += rows.join(",\n") + ";\n";
    } else {
        out += `-- (no offices)\n`;
    }

    out += `\nGO\n\n`;
}

out += "COMMIT;\n";
fs.writeFileSync(OUTPUT, out, "utf8");

console.log(`✅ Captured: ${buildings.length} addBuilding() calls`);
console.log(`✅ Unique by id: ${unique.length}`);
console.log("✅ Generated:", OUTPUT);
