// ==========================
// CONSOLOCATE Campus Navigation Script (FINAL)
// ==========================

// ==========================
// Global Variables
// ==========================
let locations = [];
let currentFilter = 'all';
let campusMap;

// ==========================
// Initialize Application
// ==========================
document.addEventListener('DOMContentLoaded', async function () {
    console.log('🎓 CONSOLOCATE System Initialized');
    await fetchLocationsFromDB();
    setupSidebarEvents();
    setupKeyboardShortcuts();
    setupScrollBehavior();
});

// ==========================
// API / Data Fetching
// ==========================
async function fetchLocationsFromDB() {
    try {
        const response = await fetch('/api/Locations');
        if (!response.ok) throw new Error(response.status);
        locations = await response.json();
        console.log(`✅ Loaded ${locations.length} locations`);
    } catch (err) {
        console.warn("⚠ Using empty data");
        locations = [];
    }
}

// ==========================
// Screen Navigation
// ==========================
function showScreen(screenName) {
    closeMenu();
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));

    const map = {
        welcome: 'welcomeScreen',
        dashboard: 'dashboardScreen',
        search: 'searchScreen',
        directory: 'directoryScreen',
        faqs: 'faqsScreen',
        map: 'mapScreen'
    };

    const target = document.getElementById(map[screenName]);
    if (!target) return;
    target.classList.add('active');

    if (screenName === 'map') {
        initCampusMap();
        setTimeout(() => campusMap.resize(), 200);
    }
}

// ==========================
// Sidebar
// ==========================
function toggleMenu() {
    document.getElementById('sideMenu')?.classList.toggle('open');
    document.getElementById('menuOverlay')?.classList.toggle('open');
}
function closeMenu() {
    document.getElementById('sideMenu')?.classList.remove('open');
    document.getElementById('menuOverlay')?.classList.remove('open');
}
function setupSidebarEvents() {
    document.getElementById('menuOverlay')
        ?.addEventListener('click', closeMenu);
}

// ==========================
// MAP INITIALIZATION
// ==========================
function initCampusMap() {
    if (campusMap) return;

    mapboxgl.accessToken = 'pk.eyJ1IjoiYXlvd21paCIsImEiOiJjbWo1eW5yMm4wOWozM2ZwdWp5bGJvbmJ5In0.P2OctDtdjbLsVMVMcVLjrw';

    campusMap = new mapboxgl.Map({
        container: 'campusMap',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [120.8129, 14.8532],
        zoom: 18,
        minZoom: 17,
        maxBounds: [
            [120.81100, 14.85100],
            [120.81550, 14.85500]
        ]
    });

    campusMap.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    campusMap.on('load', () => {

        // ==========================
        // ADD BUILDINGS HERE
        // ==========================

        addBuilding({
            id: 'main-building',
            name: 'Main Administration Building',
            color: '#0080ff',
            coordinates: [
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
            ],
            info: {
                title: "Main Administration Building",
                description: "Heart of the university.",
                image: "/images/main_bldg.jpg",
                offices: [
                    "Office of the President",
                    "Registrar",
                    "Finance",
                    "HR"
                ]
            }
        });

        addBuilding({
            id: 'barcie-building',
            name: 'Barcie International Hotel',
            color: '#ff6600',
            coordinates: [
                [120.81307862595372, 14.85422201708323],
                [120.81307556164853, 14.854181537787639],
                [120.81309088317289, 14.854178082237226],
                [120.81308781886776, 14.854135134682622],
                [120.81306994375711, 14.854137109283243],
                [120.81306432586439, 14.854099591873208],
                [120.81258323001549, 14.85414204578474],
                [120.81259753010488, 14.854279774114715],
                [120.81275380964803, 14.854266939220011],
                [120.81275432036557, 14.854254104324596],
                [120.81307862595372, 14.85422201708323]
            ],
            info: {
                title: "ETI Building",
                description: "Engineering and Technology Institute.",
                image: "/images/eti_building.jpg",
                offices: [
                    "Engineering Labs",
                    "IT Offices",
                    "Lecture Rooms"
                ]
            }
        });

        addBuilding({
            id: 'stage-building',
            name: 'Stage',
            color: '#ff2200',
            coordinates: [
                [120.81282284373663, 14.853905478151546],
                [120.81281391574947, 14.85380808652019],
                [120.812953574961, 14.853794525656582],
                [120.81296377837327, 14.853891300892116],
                [120.81282284373663, 14.853905478151546]
            ],
            info: {
                title: "Stage Building",
                description: "Engineering and Technology Institute.",
                image: "/images/eti_building.jpg",
                offices: [
                    "Engineering Labs",
                    "IT Offices",
                    "Lecture Rooms"
                ]
            }
        });

        addBuilding({
            id: 'consuelo-academic-building',
            name: 'Venerable Mo. Consuelo Academic Building',
            color: '#ff2200',
            coordinates: [
                [120.81297874609902, 14.853897016176205],
                [120.81309991162618, 14.853886537331007],
                [120.8130836264072, 14.853681110913584],
                [120.81314383022129, 14.853674949405487],
                [120.81313816397926, 14.853581157536382],
                [120.81309354232889, 14.853581157536382],
                [120.81308787608697, 14.853534603892399],
                [120.8130588366073, 14.853535288500055],
                [120.81303662303492, 14.85332519517452],
                [120.81292542305016, 14.85333683359815],
                [120.81298019089576, 14.853897888369545]
            ],
            info: {
                title: "Venerable Mo. Consuelo Academic Building",
                description: "Engineering and Technology Institute.",
                image: "/images/eti_building.jpg",
                offices: [
                    "Engineering Labs",
                    "IT Offices",
                    "Lecture Rooms"
                ]
            }
        });

        addBuilding({
            id: 'barcie-center-building',
            name: 'Barcie International Center',
            color: '#ff2200',
            coordinates: [
                [120.8125406202845, 14.85411983399456],
                [120.81257674258336, 14.854146533812127],
                [120.81258240882511, 14.854187628249122],
                [120.81250874768813, 14.854268412262584],
                [120.81242871202892, 14.854202689677692],
                [120.81232247000406, 14.854203374288105],
                [120.81229059739638, 14.85391309929932],
                [120.81250166488564, 14.853890507125811],
                [120.8125285795333, 14.85413080557683],
                [120.8125406202958, 14.854118482586117],
                [120.81256824322196, 14.854141759346447]
            ],
            info: {
                title: "Barcie International Center",
                description: "Engineering and Technology Institute.",
                image: "/images/eti_building.jpg",
                offices: [
                    "Engineering Labs",
                    "IT Offices",
                    "Lecture Rooms"
                ]
            }
        });

        addBuilding({
            id: 'barcie-pool-building',
            name: 'Barcie Pool',
            color: '#ff2200',
            coordinates: [
                [120.81232441122393, 14.854298121540054],
                [120.81238116770731, 14.854336338427757],
                [120.81243218477033, 14.854330790815567],
                [120.8124583310152, 14.854298737941605],
                [120.81245322930988, 14.854259288243952],
                [120.81239392197307, 14.854216756530192],
                [120.81234290491005, 14.854222304145338],
                [120.81231612095178, 14.854251275023046],
                [120.81232377351068, 14.854297505138504]
            ],
            info: {
                title: "Barcie Pool",
                description: "Engineering and Technology Institute.",
                image: "/images/eti_building.jpg",
                offices: [
                    "Engineering Labs",
                    "IT Offices",
                    "Lecture Rooms"
                ]
            }
        });

        addBuilding({
            id: 'cafe-building',
            name: 'Barcie Cafe',
            color: '#ff2200',
            coordinates: [
                [120.81229443335621, 14.853903296856586],
                [120.81228814011189, 14.853754264728323],
                [120.81235815246896, 14.853748181782393],
                [120.81242423154708, 14.853799886819843],
                [120.81240613846603, 14.85382726007009],
                [120.8124084984334, 14.853837905221198],
                [120.81239355197539, 14.853849310740841],
                [120.81240220518708, 14.853861476626818],
                [120.81236995230375, 14.853871361409318],
                [120.8123707389596, 14.853897213914834],
                [120.8122960066678, 14.853903296856586]
            ],
            info: {
                title: "Barcie Cafe",
                description: "Engineering and Technology Institute.",
                image: "/images/eti_building.jpg",
                offices: [
                    "Engineering Labs",
                    "IT Offices",
                    "Lecture Rooms"
                ]
            }
        });

        addBuilding({
            id: 'barcie-office-building',
            name: 'Barcie Office',
            color: '#ff2200',
            coordinates: [
                [120.81227251965043, 14.853740251442673],
                [120.81227251965043, 14.853547117804595],
                [120.81236849164645, 14.853547117804595],
                [120.81236849164645, 14.853740251442673],
                [120.81227251965043, 14.853740251442673]
            ],
            info: {
                title: "Barcie Office",
                description: "Engineering and Technology Institute.",
                image: "/images/eti_building.jpg",
                offices: [
                    "Engineering Labs",
                    "IT Offices",
                    "Lecture Rooms"
                ]
            }
        });

        addBuilding({
            id: 'andrada-building',
            name: 'Mother Theresa Andrada OSA Gymnasium',
            color: '#ff2200',
            coordinates: [
                [120.8131561855543, 14.854303160898624],
                [120.81310920107569, 14.853994656655203],
                [120.81330523976527, 14.853964902414944],
                [120.81335546455313, 14.85427497271256],
                [120.81315942586355, 14.854306292919517]
            ],
            info: {
                title: "Mother Theresa Andrada OSA Gymnasium",
                description: "Engineering and Technology Institute.",
                image: "/images/eti_building.jpg",
                offices: [
                    "Engineering Labs",
                    "IT Offices",
                    "Lecture Rooms"
                ]
            }
        });

        addBuilding({
            id: 'ezekiel-moreno-building',
            name: 'St. Ezekiel Moreno Building',
            color: '#ff2200',
            coordinates: [
                [120.81341475050982, 14.854139859237264],
                [120.81336429051026, 14.85400010376084],
                [120.81344968435837, 14.853970089150081],
                [120.81350208512754, 14.854111720558194],
                [120.81341669127937, 14.854143611061318]
            ],
            info: {
                title: "St. Ezekiel Moreno Building",
                description: "Engineering and Technology Institute.",
                image: "/images/eti_building.jpg",
                offices: [
                    "Engineering Labs",
                    "IT Offices",
                    "Lecture Rooms"
                ]
            }
        });

        addBuilding({
            id: 'ostia-student-lounge-building',
            name: 'Ostia Student Lounge',
            color: '#ff2200',
            coordinates: [
                [120.8135405740909, 14.85393575332111],
                [120.81350395800217, 14.853902046203999],
                [120.8135167445729, 14.853848676590871],
                [120.81356963447939, 14.853834631953376],
                [120.81360973781506, 14.853872833364818],
                [120.81359346399734, 14.853921708689981],
                [120.8135405740909, 14.853936876891737]
            ],
            info: {
                title: "Ostia Student Lounge",
                description: "Engineering and Technology Institute.",
                image: "/images/eti_building.jpg",
                offices: [
                    "Engineering Labs",
                    "IT Offices",
                    "Lecture Rooms"
                ]
            }
        });

        addBuilding({
            id: 'cafeteria-building',
            name: 'Cafe Monica Building',
            color: '#ff2200',
            coordinates: [
                [120.81356657633563, 14.853706526009091],
                [120.81355372886935, 14.853675184963592],
                [120.81353568123666, 14.85367902867668],
                [120.81350815095306, 14.853611615847697],
                [120.81352283377038, 14.853603041407112],
                [120.8135127393337, 14.853571109005713],
                [120.81348857389247, 14.853505195305232],
                [120.81349530351696, 14.853498099213894],
                [120.81348123248227, 14.853455522656446],
                [120.81368159177981, 14.853382787685291],
                [120.81371829882613, 14.853480654652813],
                [120.81372227589219, 14.853493073181554],
                [120.81376907737683, 14.853475628620842],
                [120.81377611289412, 14.853493073181554],
                [120.81384524988886, 14.853467540019011],
                [120.81387793580632, 14.853481855916172],
                [120.81389325732943, 14.853530233766406],
                [120.81387333934867, 14.853537638539407],
                [120.8138942787644, 14.853595889404005],
                [120.81382584262565, 14.853624027527744],
                [120.81382022473292, 14.853615141804966],
                [120.813566392334, 14.85370648993053]
            ],
            info: {
                title: "Cafe Monica Building",
                description: "Engineering and Technology Institute.",
                image: "/images/eti_building.jpg",
                offices: [
                    "Engineering Labs",
                    "IT Offices",
                    "Lecture Rooms"
                ]
            }
        });

        addBuilding({
            id: 'olgc-building',
            name: 'Our Lady of Good Counsel Building',
            color: '#ff2200',
            coordinates: [
                [120.81342704920195, 14.853403961975829],
                [120.8133886192573, 14.853246853438606],
                [120.81368282883483, 14.853176824402112],
                [120.81371873878436, 14.853312619816961],
                [120.81375212873564, 14.853305312442515],
                [120.81376031872486, 14.853342458259462],
                [120.81347051913986, 14.85341126934695],
                [120.81346484914741, 14.85339543670905],
                [120.81342767920114, 14.853403961975829]
            ],
            info: {
                title: "Our Lady of Good Counsel Building",
                description: "Engineering and Technology Institute.",
                image: "/images/eti_building.jpg",
                offices: [
                    "Engineering Labs",
                    "IT Offices",
                    "Lecture Rooms"
                ]
            }
        });

        addBuilding({
            id: 'canteen-building',
            name: 'Mini Canteen',
            color: '#ff2200',
            coordinates: [
                [120.81337988906557, 14.853525493034752],
                [120.81334880347413, 14.853499202042784],
                [120.81335735201287, 14.853467652848607],
                [120.81339076902395, 14.853457887620706],
                [120.81342107747548, 14.853474413390472],
                [120.81341408321651, 14.853511220781783],
                [120.81337911192765, 14.853526244206009]
            ],
            info: {
                title: "Mini Canteen",
                description: "Engineering and Technology Institute.",
                image: "/images/eti_building.jpg",
                offices: [
                    "Engineering Labs",
                    "IT Offices",
                    "Lecture Rooms"
                ]
            }
        });

        addBuilding({
            id: 'kalinangan-building',
            name: 'Kalinangan Auditorium',
            color: '#ff2200',
            coordinates: [
                [120.81231747083638, 14.853021861563079],
                [120.81231747083933, 14.853049660005354],
                [120.81236636179545, 14.853055219691583],
                [120.81236923773446, 14.853023714799306],
                [120.8124919444515, 14.853031127715482],
                [120.8125092000833, 14.852627123396488],
                [120.81245551589541, 14.852622490314502],
                [120.81245839183447, 14.852554847314607],
                [120.81227720769783, 14.852545581148647],
                [120.81227433175883, 14.852615077384343],
                [120.81221585433934, 14.852614150767891],
                [120.81219955735156, 14.853013522038694],
                [120.81231747083933, 14.853014448652246]
            ],
            info: {
                title: "Kalinangan Auditorium",
                description: "Engineering and Technology Institute.",
                image: "/images/eti_building.jpg",
                offices: [
                    "Engineering Labs",
                    "IT Offices",
                    "Lecture Rooms"
                ]
            }
        });

        addBuilding({
            id: 'chapel-building',
            name: 'Our Lady of Mt. Carmel Chapel',
            color: '#ff2200',
            coordinates: [
                [120.81295400576028, 14.853081881301861],
                [120.812919683102, 14.852992520628959],
                [120.81290695050274, 14.852899414259369],
                [120.81319481796089, 14.852825571247507],
                [120.81324464117358, 14.853017670043286],
                [120.8129816853226, 14.853085091864685],
                [120.81295400576028, 14.853081346208072]
            ],
            info: {
                title: "Our Lady of Mt. Caramel Chapel",
                description: "Engineering and Technology Institute.",
                image: "/images/eti_building.jpg",
                offices: [
                    "Engineering Labs",
                    "IT Offices",
                    "Lecture Rooms"
                ]
            }
        });

        addBuilding({
            id: 'mother-rita-building',
            name: 'MO.Rita Barcelo Building',
            color: '#ff2200',
            coordinates: [
                [120.8135761632119, 14.852711583778557],
                [120.81363297870723, 14.85293751811362],
                [120.81341269057145, 14.852995890240763],
                [120.8133476011497, 14.85277078346762],
                [120.81357420961587, 14.85271325828451],
                [120.81376535330452, 14.852489197432064],
                [120.81323568305766, 14.852617239466454],
                [120.81325430847517, 14.85271217538434],
                [120.81322578248728, 14.852721893995792],
                [120.81332308196107, 14.853085631805854],
                [120.8133490187933, 14.85308243528172],
                [120.81337628214317, 14.853175122158902],
                [120.81391186142491, 14.853045894640289],
                [120.81386810853041, 14.8528771269159],
                [120.8138326385029, 14.852890319177476],
                [120.81380938453435, 14.852813153549135],
                [120.81384488368082, 14.852803641721238],
                [120.81383033399487, 14.852731644610103],
                [120.8137921787843, 14.85273702067586],
                [120.8137713338113, 14.852662111519237],
                [120.81380751845757, 14.852651663037136],
                [120.81376858370317, 14.852489343249914]
            ],
            info: {
                title: "MO. Rita Barcelo Building",
                description: "Engineering and Technology Institute.",
                image: "/images/eti_building.jpg",
                offices: [
                    "Engineering Labs",
                    "IT Offices",
                    "Lecture Rooms"
                ]
            }
        });


        addBuilding({
            id: 'cloister-building',
            name: 'Cloister',
            color: '#ff2200',
            coordinates: [
                [120.81304358142842, 14.852526257822603],
                [120.81303759271111, 14.852631886860905],
                [120.81305918042409, 14.852700568206657],
                [120.81283289481632, 14.852752472131996],
                [120.81280397176027, 14.85263123577974],
                [120.81293903275736, 14.852592436227567],
                [120.81294028440993, 14.852528852596578],
                [120.81304443617512, 14.852527455451323]
            ],
            info: {
                title: "Cloister",
                description: "Engineering and Technology Institute.",
                image: "/images/eti_building.jpg",
                offices: [
                    "Engineering Labs",
                    "IT Offices",
                    "Lecture Rooms"
                ]
            }
        });


        addBuilding({
            id: 'motor-pool-building',
            name: 'Motor Pool',
            color: '#ff2200',
            coordinates: [
                [120.81270145317137, 14.852572674389307],
                [120.81257888558946, 14.852569365154679],
                [120.81256792990717, 14.852746351987548],
                [120.81269636664751, 14.852748690493826],
                [120.81270255527028, 14.852574962523036]
            ],
            info: {
                title: "Motor Pool",
                description: "Engineering and Technology Institute.",
                image: "/images/eti_building.jpg",
                offices: [
                    "Engineering Labs",
                    "IT Offices",
                    "Lecture Rooms"
                ]
            }
        });

        addBuilding({
            id: 'olympic-swimming-pool-building',
            name: 'Adeotatus Mini Olympic Swimming Pool',
            color: '#ff2200',
            coordinates: [
                [120.81277209846053, 14.852201596387175],
                [120.81275309955402, 14.852520737912954],
                [120.81246530878082, 14.852507379360091],
                [120.81248492319554, 14.85218499622998],
                [120.81277095230024, 14.852203068443856]
            ],
            info: {
                title: "Adeotatus Mini Olympic Swimming Pool",
                description: "Engineering and Technology Institute.",
                image: "/images/eti_building.jpg",
                offices: [
                    "Engineering Labs",
                    "IT Offices",
                    "Lecture Rooms"
                ]
            }
        });

        addBuilding({
            id: ' fish-pond-building',
            name: 'Fish Pond',
            color: '#ff2200',
            coordinates: [
                [120.8135642407837, 14.852025456383402],
                [120.81366016661747, 14.85237422215333],
                [120.81310611233238, 14.85257372107965],
                [120.81303508855387, 14.852122273465255],
                [120.81355796934236, 14.85200867065197],
                [120.8135687251825, 14.852044537280165]
            ],
            info: {
                title: "Fish Pond",
                description: "Engineering and Technology Institute.",
                image: "/images/eti_building.jpg",
                offices: [
                    "Engineering Labs",
                    "IT Offices",
                    "Lecture Rooms"
                ]
            }
        });

        addBuilding({
            id: ' padre-pio-building',
            name: 'St. Padre Pio Building',
            color: '#ff2200',
            coordinates: [
                [120.81419694466706, 14.852175006807244],
                [120.8142724992573, 14.852455304436461],
                [120.81447133022027, 14.852376617578287],
                [120.81430020222297, 14.85212998116765],
                [120.8142696082216, 14.852141305619938],
                [120.8141917077429, 14.852017695211629],
                [120.81415812940014, 14.852019545779783],
                [120.81413871055321, 14.851969037714127],
                [120.81404118136118, 14.851992386987035],
                [120.8140115370137, 14.851960416713965],
                [120.81364088034513, 14.852082177387956],
                [120.81368308528647, 14.852199158637191],
                [120.81404188349376, 14.852081959015791],
                [120.81408441126109, 14.852195275527833],
                [120.81419726749306, 14.852171342070363]
            ],
            info: {
                title: "St. Padre Pio Building",
                description: "Engineering and Technology Institute.",
                image: "/images/eti_building.jpg",
                offices: [
                    "Engineering Labs",
                    "IT Offices",
                    "Lecture Rooms"
                ]
            }
        });

        addBuilding({
            id: 'sto-niño-building',
            name: 'Sto. Niño Building',
            color: '#ff2200',
            coordinates: [
                [120.8141715637804, 14.852172467591345],
                [120.8140365970097, 14.852216018751292],
                [120.81408402940355, 14.852364293264898],
                [120.81382515009125, 14.85243109030796],
                [120.81386007334811, 14.852561837497518],
                [120.8141269966502, 14.85249438005718],
                [120.81411904943656, 14.852475574710368],
                [120.81416093097943, 14.852463521637958],
                [120.81414669815655, 14.852417160050123],
                [120.81422615494932, 14.852392985772767],
                [120.81421361477067, 14.85235666593158],
                [120.81422641897927, 14.852349891766565],
                [120.81417226019448, 14.852172591137233]
            ],
            info: {
                title: "Sto. Niño Building",
                description: "Engineering and Technology Institute.",
                image: "/images/eti_building.jpg",
                offices: [
                    "Engineering Labs",
                    "IT Offices",
                    "Lecture Rooms"
                ]
            }
        });
        addBuilding({
            id: 'sto-grounds-builduing',
            name: 'Sto. Niño Grounds and Sta. Rita de Casia Student Lounge',
            color: '#ff2200',
            coordinates: [
                [120.81398892826229, 14.852151086463948],
                [120.81406220296844, 14.852355859164618],
                [120.81380412316548, 14.85242534562532],
                [120.81373730967249, 14.852222685191506],
                [120.81398853957899, 14.852152527339669]
            ],
            info: {
                title: "Sto. Niño Grounds and Sta. Rita de Casia Student Lounge",
                description: "Engineering and Technology Institute.",
                image: "/images/eti_building.jpg",
                offices: [
                    "Engineering Labs",
                    "IT Offices",
                    "Lecture Rooms"
                ]
            }
        });

        addBuilding({
            id: 'cassiciacum-builduing',
            name: 'Cassiciacum Student Center',
            color: '#ff2200',
            coordinates: [
                [120.81451690477371, 14.852688561669567],
                [120.81427699446874, 14.852471430226942],
                [120.81409681231287, 14.852669458328762],
                [120.81433119881359, 14.852889360681843],
                [120.81451735829995, 14.852687904640305]
            ],
            info: {
                title: "Cassiciacum Student Center",
                description: "Engineering and Technology Institute.",
                image: "/images/eti_building.jpg",
                offices: [
                    "Engineering Labs",
                    "IT Offices",
                    "Lecture Rooms"
                ]
            }
        });

        addBuilding({
            id: 'student-lounge-builduing',
            name: 'Madaura, Milan, and Hippo Student Lounge',
            color: '#ff2200',
            coordinates: [
                [120.81433966224563, 14.852939738563478],
                [120.81417528050548, 14.852796112225448],
                [120.81405259667554, 14.852953022012912],
                [120.81418757430527, 14.853082462478355],
                [120.81433943720168, 14.852938679312416]
            ],
            info: {
                title: "Madaura, Milan, and Hippo Student Lounge",
                description: "Engineering and Technology Institute.",
                image: "/images/eti_building.jpg",
                offices: [
                    "Engineering Labs",
                    "IT Offices",
                    "Lecture Rooms"
                ]
            }
        });

        addBuilding({
            id: 'our-lady-grace-building',
            name: 'Our Lady of Grace Building',
            color: '#ff2200',
            coordinates: [
                [120.81411609751336, 14.853142687633678],
                [120.81407912673143, 14.85311277038862],
                [120.81391262827003, 14.85313123752043],
                [120.81393170958785, 14.8532661464332],
                [120.81411520895671, 14.853142843351065]
            ],
            info: {
                title: "Our Lady of Grace Building",
                description: "Engineering and Technology Institute.",
                image: "/images/eti_building.jpg",
                offices: [
                    "Engineering Labs",
                    "IT Offices",
                    "Lecture Rooms"
                ]
            }
        });

        addBuilding({
            id: 'our-lady-consolation-building',
            name: 'Our Lady of Consolation Building',
            color: '#ff2200',
            coordinates: [
                [120.813902246206, 14.853131267865137],
                [120.81393005596408, 14.853302719122993],
                [120.81376571602914, 14.853339272038966],
                [120.81372655421382, 14.853171328365534],
                [120.81389929146445, 14.853131001620355]
            ],
            info: {
                title: "Our Lady of Consolation Building",
                description: "Engineering and Technology Institute.",
                image: "/images/eti_building.jpg",
                offices: [
                    "Engineering Labs",
                    "IT Offices",
                    "Lecture Rooms"
                ]
            }
        });

        addBuilding({
            id: 'saint-agustine-garden-building',
            name: 'St. Agustine Inner Garden',
            color: '#00FF00',
            coordinates: [
                [120.81357312121179, 14.852722081886697],
                [120.81362160162752, 14.852931002470825],
                [120.81342139532461, 14.852985241026758],
                [120.81335772635691, 14.85277779451053],
                [120.81357106843728, 14.85272015328755]
            ],
            info: {
                title: "St. Agustine Inner Garden",
                description: "Engineering and Technology Institute.",
                image: "/images/eti_building.jpg",
                offices: [
                    "Engineering Labs",
                    "IT Offices",
                    "Lecture Rooms"
                ]
            }
        });

        addBuilding({
            id: 'agustino-farm-building',
            name: 'Agustino Farm',
            color: '#00FF00',
            coordinates: [
                [120.81303091434393, 14.852167162500777],
                [120.81284905670913, 14.852179403324044],
                [120.81284885132982, 14.852425155311224],
                [120.81305002327048, 14.85245132495497],
                [120.81303412843715, 14.852171330599361]
            ],
            info: {
                title: "Agustino Farm",
                description: "Engineering and Technology Institute.",
                image: "/images/eti_building.jpg",
                offices: [
                    "Engineering Labs",
                    "IT Offices",
                    "Lecture Rooms"
                ]
            }
        });
    });


}

// ==========================
// BUILDING FUNCTION (CORE)
// ==========================
function addBuilding({ id, name, coordinates, color, info }) {

    campusMap.addSource(`${id}-source`, {
        type: 'geojson',
        data: {
            type: 'Feature',
            properties: { name },
            geometry: {
                type: 'Polygon',
                coordinates: [coordinates]
            }
        }
    });

    campusMap.addLayer({
        id: `${id}-fill`,
        type: 'fill',
        source: `${id}-source`,
        paint: {
            'fill-color': color,
            'fill-opacity': 0.25
        }
    });

    campusMap.addLayer({
        id: `${id}-outline`,
        type: 'line',
        source: `${id}-source`,
        paint: {
            'line-color': color,
            'line-width': 3,
            'line-opacity': 0
        }
    });

    campusMap.addLayer({
        id: `${id}-label`,
        type: 'symbol',
        source: `${id}-source`,
        layout: {
            'text-field': ['get', 'name'],
            'text-size': ['interpolate', ['linear'], ['zoom'], 16, 0, 18, 14],
            'text-font': ['Open Sans Bold'],
            'text-offset': [0, 0.6]
        },
        paint: {
            'text-color': '#111',
            'text-halo-color': '#fff',
            'text-halo-width': 1.5
        }
    });

    campusMap.on('click', `${id}-fill`, () => {
        openInfoPanel(info);
        campusMap.setPaintProperty(`${id}-outline`, 'line-opacity', 1);
    });

    campusMap.on('mouseenter', `${id}-fill`, () => {
        campusMap.getCanvas().style.cursor = 'pointer';
        campusMap.setPaintProperty(`${id}-outline`, 'line-opacity', 1);
    });

    campusMap.on('mouseleave', `${id}-fill`, () => {
        campusMap.getCanvas().style.cursor = '';
        campusMap.setPaintProperty(`${id}-outline`, 'line-opacity', 0);
    });
}

// ==========================
// INFO PANEL
// ==========================
function openInfoPanel(data) {
    const panel = document.getElementById('buildingInfoPanel');
    document.getElementById('panelTitle').innerText = data.title;
    document.getElementById('panelDesc').innerText = data.description;

    const img = document.getElementById('panelImage');
    img.src = data.image || 'https://via.placeholder.com/350x180';

    const list = document.getElementById('panelList');
    list.innerHTML = '';
    data.offices.forEach(o => {
        const li = document.createElement('li');
        li.innerText = o;
        list.appendChild(li);
    });

    panel.classList.add('active');
}

function closeInfoPanel() {
    document.getElementById('buildingInfoPanel')
        ?.classList.remove('active');
}

// ==========================
// Utilities
// ==========================
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeMenu();
    });
}
function setupScrollBehavior() {
    window.addEventListener('scroll', () => { });
}
