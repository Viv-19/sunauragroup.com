export const websiteConfig = {
    settings: {
        dealer_name: "SunAura",
        tagline: "Authorized Distributor of Racold Water Heating Solutions",
        phone: "+91-9204418515",
        email: "sunauratec@gmail.com",
        address: "8th Lane, Sarweshwari Nagar, Bajra, Itki Road, Ranchi, Jharkhand - 834005",
        whatsapp_number: "919204418515",
        delivery_area: "Ranchi & Jharkhand",
        map_embed_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3663.156557833075!2d85.2589255!3d23.3463334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e09545d1d603%3A0xc3f837651a134a9e!2sSunAura!5e0!3m2!1sen!2sin!4v1704400000000!5m2!1sen!2sin",
        gstin: "20DZZPS7438M1ZB",
        state: "Jharkhand",
        state_code: "20",
        hero_images: [
            "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1600",
            "/assets/background baby racold.jpeg",
            "/assets/background children racold.png",
            "/assets/background elder racold.jpeg",
            "/assets/background young racold.png"
        ]
    },
    categories: [
        // 1. STORAGE GEYSERS (RACOLD)
        {
            id: "storage-geyser",
            brand: "Racold",
            name: "Storage Geysers",
            type: "residential",
            tagline: "High Pressure & Energy Efficient Titanium Plus Geysers",
            image_url: "/assets/product category/Storage Geyser/Category.jpeg",
            features: [
                "Free Standard Installation & Connecting Pipes Included (All Models except Pronto Neo)",
                "Titanium Plus Technology (Hard Water Resistant)",
                "Safety Plus 3-Level Protection",
                "Magnesium Anode Anti-Corrosion",
                "8 Bar Pressure - Ideal for High-Rise Apartments",
                "Same Day Ranchi Home Delivery Available"
            ],
            products: [
                {
                    id: "omnis-slim-wifi",
                    name: "Omnis Slim Wi-Fi",
                    brand: "Racold",
                    image: "/assets/product category/Storage Geyser/Omnis slim wifi.jpeg",
                    spec: "Available in 25L (Slim Wi-Fi)",
                    mrp: 26750,
                    price: 16050,
                    free_installation: true,
                    free_pipe: true,
                    in_stock: true,
                    fast_delivery: true,
                    is_hero: true,
                    features: [
                        "Free Standard Installation & Connecting Pipes Included",
                        "Voice Control (Alexa / Google Assistant)",
                        "Racold Net Mobile App Control",
                        "Space Saving Horizontal/Vertical Slim Design",
                        "Digital Touch Display & Intelligent Temp Controller",
                        "Auto Power OFF & Titanium Plus Element"
                    ],
                    variants: [
                        { id: "omnis-slim-wifi-25l", name: "Omnis Slim Wi-Fi 25L", capacity: "25L", spec: "25L (2.5 kW)", mrp: 26750, price: 16050 }
                    ]
                },
                {
                    id: "omnis-dg-wifi",
                    name: "Omnis DG Wi-Fi",
                    brand: "Racold",
                    image: "/assets/product category/Storage Geyser/Omnis dg wifi.jpeg",
                    spec: "Available in 15L and 25L",
                    mrp: 24949,
                    price: 15410,
                    free_installation: true,
                    free_pipe: true,
                    in_stock: true,
                    fast_delivery: true,
                    is_hero: true,
                    features: [
                        "Free Standard Installation & Connecting Pipes Included",
                        "Smart Wi-Fi & Voice Control (Alexa / Google)",
                        "Racold Net App Remote Control",
                        "Digital Touch Display & Auto Diagnosis",
                        "Intelligent Temperature Controller & Auto Power OFF",
                        "Titanium Plus Hard Water Coating (8 Bar)"
                    ],
                    variants: [
                        { id: "omnis-dg-wifi-15l", name: "Omnis DG Wi-Fi 15L", capacity: "15L", spec: "15L Wi-Fi (2 kW)", mrp: 24949, price: 15410 },
                        { id: "omnis-dg-wifi-25l", name: "Omnis DG Wi-Fi 25L", capacity: "25L", spec: "25L Wi-Fi (2 kW)", mrp: 26999, price: 16695 }
                    ]
                },
                {
                    id: "omnis-dg",
                    name: "Omnis DG",
                    brand: "Racold",
                    image: "/assets/product category/Storage Geyser/Omnis dg.jpeg",
                    spec: "Available in 10L, 15L, 25L",
                    mrp: 18749,
                    price: 10881,
                    free_installation: true,
                    free_pipe: true,
                    in_stock: true,
                    fast_delivery: true,
                    features: [
                        "Free Standard Installation & Connecting Pipes Included",
                        "Digital Touch Control & LED Display",
                        "Auto Power OFF & Self Auto-Diagnosis",
                        "Titanium Plus Technology (Hard Water Safe)",
                        "Safety Plus 3-Level Protection (8 Bar)"
                    ],
                    variants: [
                        { id: "omnis-dg-10l", name: "Omnis DG 10L", capacity: "10L", spec: "10L (2 kW)", mrp: 18749, price: 10881 },
                        { id: "omnis-dg-15l", name: "Omnis DG 15L", capacity: "15L", spec: "15L (2 kW)", mrp: 20949, price: 12154 },
                        { id: "omnis-dg-25l", name: "Omnis DG 25L", capacity: "25L", spec: "25L (2 kW)", mrp: 23199, price: 13465 }
                    ]
                },
                {
                    id: "omnis-slim",
                    name: "Omnis Slim",
                    brand: "Racold",
                    image: "/assets/product category/Storage Geyser/Omnis slim.jpeg",
                    spec: "Available in 15L and 25L",
                    mrp: 18049,
                    price: 10397,
                    free_installation: true,
                    free_pipe: true,
                    in_stock: true,
                    fast_delivery: true,
                    features: [
                        "Free Standard Installation & Connecting Pipes Included",
                        "Space Saving Horizontal/Vertical Slim Design",
                        "Advanced Titanium Heating Element (2.5 kW)",
                        "Titanium Plus Enamel Tank Protection",
                        "Safety Plus & 8 Bar Pressure Resistance"
                    ],
                    variants: [
                        { id: "omnis-slim-15l", name: "Omnis Slim 15L", capacity: "15L", spec: "15L (2.5 kW)", mrp: 18049, price: 10397 },
                        { id: "omnis-slim-25l", name: "Omnis Slim 25L", capacity: "25L", spec: "25L (2.5 kW)", mrp: 20949, price: 12067 }
                    ]
                },
                {
                    id: "omnis-r",
                    name: "Omnis R",
                    brand: "Racold",
                    image: "/assets/product category/Storage Geyser/Omnis R.jpeg",
                    spec: "Available in 10L, 15L, 25L",
                    mrp: 16099,
                    price: 9193,
                    free_installation: true,
                    free_pipe: true,
                    in_stock: true,
                    fast_delivery: true,
                    features: [
                        "Free Standard Installation & Connecting Pipes Included",
                        "Titanium Plus Hard Water Technology",
                        "Children Care Mode for Safe Temperature",
                        "High Pressure Resistance (8 Bar)",
                        "Safety Plus 3-Level Protection"
                    ],
                    variants: [
                        { id: "omnis-r-10l", name: "Omnis R 10L", capacity: "10L", spec: "10L (2 kW)", mrp: 16099, price: 9193 },
                        { id: "omnis-r-15l", name: "Omnis R 15L", capacity: "15L", spec: "15L (2 kW)", mrp: 17849, price: 10199 },
                        { id: "omnis-r-25l", name: "Omnis R 25L", capacity: "25L", spec: "25L (2 kW)", mrp: 20599, price: 11628 }
                    ]
                },
                {
                    id: "cdr-dlx",
                    name: "CDR DLX",
                    brand: "Racold",
                    image: "/assets/product category/Storage Geyser/cdr dlx.jpeg",
                    spec: "Available in 10L, 15L, 25L, 35L (Vertical)",
                    mrp: 12099,
                    price: 7473,
                    free_installation: true,
                    free_pipe: true,
                    in_stock: true,
                    fast_delivery: true,
                    features: [
                        "Free Standard Installation & Connecting Pipes Included",
                        "Titanium Plus Technology & Heating Element",
                        "Durable Rust-Proof Polypropylene Outer Body",
                        "Safety Plus 3-Level Temperature Cut-off",
                        "8 Bar Pressure for High Rise Buildings"
                    ],
                    variants: [
                        { id: "cdr-dlx-10l", name: "CDR DLX 10L (Vertical)", capacity: "10L", spec: "10L Vertical (2 kW)", mrp: 12099, price: 7473 },
                        { id: "cdr-dlx-15l", name: "CDR DLX 15L (Vertical)", capacity: "15L", spec: "15L Vertical (2 kW)", mrp: 13049, price: 8056 },
                        { id: "cdr-dlx-25l", name: "CDR DLX 25L (Vertical)", capacity: "25L", spec: "25L Vertical (2 kW)", mrp: 15049, price: 9287 },
                        { id: "cdr-dlx-35l", name: "CDR DLX 35L (Vertical)", capacity: "35L", spec: "35L Vertical (2 kW)", mrp: 17599, price: 11550 }
                    ]
                },
                {
                    id: "altro-i-plus",
                    name: "Altro i+",
                    brand: "Racold",
                    image: "/assets/product category/Storage Geyser/Altro i+.jpeg",
                    spec: "Available in 3L (3kW/4.5kW) and 6L (3kW)",
                    mrp: 6699,
                    price: 4100,
                    free_installation: true,
                    free_pipe: true,
                    in_stock: true,
                    fast_delivery: true,
                    features: [
                        "Free Standard Installation & Connecting Pipes Included",
                        "Faster High-Power Heating (3 kW & 4.5 kW)",
                        "Smart LED Ring Heating Status Indicator",
                        "Safety Plus Protection with High Pressure Resistance",
                        "Compact & Stylish Design for Kitchen & Bathrooms"
                    ],
                    variants: [
                        { id: "altro-i-plus-3l-3kw", name: "Altro i+ 3L (3 kW)", capacity: "3L (3 kW)", spec: "3L (3 kW)", mrp: 6699, price: 4100 },
                        { id: "altro-i-plus-3l-45kw", name: "Altro i+ 3L (4.5 kW)", capacity: "3L (4.5 kW)", spec: "3L High-Power (4.5 kW)", mrp: 6949, price: 4605 },
                        { id: "altro-i-plus-6l-3kw", name: "Altro i+ 6L (3 kW)", capacity: "6L (3 kW)", spec: "6L (3 kW)", mrp: 11949, price: 6700 }
                    ]
                },
                {
                    id: "pronto-neo",
                    name: "Pronto Neo",
                    brand: "Racold",
                    image: "/assets/product category/Storage Geyser/Pronto neo.jpeg",
                    spec: "Available in 3L and 5L",
                    mrp: 5499,
                    price: 3350,
                    free_installation: false,
                    free_pipe: false,
                    in_stock: true,
                    fast_delivery: true,
                    features: [
                        "Faster 3 kW High-Efficiency Heating Element",
                        "No Back-Flow Valve Protection",
                        "High Pressure Resistance (HPR Technology)",
                        "Rust-Proof Non-Corrosive Polymer Body",
                        "Standard Installation Available on Request"
                    ],
                    variants: [
                        { id: "pronto-neo-3l", name: "Pronto Neo 3L", capacity: "3L", spec: "3L (3 kW)", mrp: 5499, price: 3350 },
                        { id: "pronto-neo-5l", name: "Pronto Neo 5L", capacity: "5L", spec: "5L (3 kW)", mrp: 9549, price: 4800 }
                    ]
                },
                {
                    id: "platinum-nxt",
                    name: "Platinum NXT",
                    brand: "Racold",
                    image: "/assets/product category/Storage Geyser/Platinum nxt.jpeg",
                    spec: "Available in 50L, 70L, 100L (Vertical & Horizontal)",
                    mrp: 24049,
                    price: 17500,
                    free_installation: true,
                    free_pipe: true,
                    in_stock: true,
                    fast_delivery: true,
                    features: [
                        "Free Standard Installation & Connecting Pipes Included",
                        "Extra High Capacity (50L, 70L, 100L) for Large Families & Villas",
                        "Titanium Plus Glass Enamel Tank Coating",
                        "Children Care Mode for Safe Temperature Setting",
                        "Quick High-Speed Heating (3 kW)"
                    ],
                    variants: [
                        { id: "platinum-nxt-50l-v", name: "Platinum NXT 50L (Vertical)", capacity: "50L V", spec: "50L Vertical (3 kW)", mrp: 24049, price: 17500 },
                        { id: "platinum-nxt-50l-h", name: "Platinum NXT 50L (Horizontal)", capacity: "50L H", spec: "50L Horizontal (3 kW)", mrp: 24849, price: 18200 },
                        { id: "platinum-nxt-70l-v", name: "Platinum NXT 70L (Vertical)", capacity: "70L V", spec: "70L Vertical (3 kW)", mrp: 32399, price: 26000 },
                        { id: "platinum-nxt-70l-h", name: "Platinum NXT 70L (Horizontal)", capacity: "70L H", spec: "70L Horizontal (3 kW)", mrp: 33199, price: 26800 },
                        { id: "platinum-nxt-100l-v", name: "Platinum NXT 100L (Vertical)", capacity: "100L V", spec: "100L Vertical (3 kW)", mrp: 38599, price: 29000 },
                        { id: "platinum-nxt-100l-h", name: "Platinum NXT 100L (Horizontal)", capacity: "100L H", spec: "100L Horizontal (3 kW)", mrp: 39799, price: 29800 }
                    ]
                }
            ]
        },

        // 2. TANKLESS / INSTANT GEYSERS (RACOLD)
        {
            id: "tankless-geyser",
            brand: "Racold",
            name: "Tankless / Instant Geysers",
            type: "residential",
            tagline: "Instant Continuous Hot Water with Multipoint Capability",
            image_url: "/assets/product category/Tankless Geyser/Category.jpeg",
            features: [
                "Free Standard Installation & Connecting Pipes Included",
                "Multipoint Usage (Serves Multiple Outlets Simultaneously)",
                "Endless Continuous Hot Water without Waiting",
                "Super Compact & Space Saving Aesthetic",
                "Lightning Fast Electronic Instant Heating"
            ],
            products: [
                {
                    id: "aures-6-5kw",
                    name: "Aures 6.5 kW (Single-Phase)",
                    brand: "Racold",
                    image: "/assets/product category/Tankless Geyser/Aures 6.6 kw.jpeg",
                    spec: "6.5 kW Single-Phase Multi-point",
                    mrp: 11499,
                    price: 9000,
                    free_installation: true,
                    free_pipe: true,
                    in_stock: true,
                    fast_delivery: true,
                    features: [
                        "Free Standard Installation & Connecting Pipes Included",
                        "Lightning fast instant continuous heating",
                        "Single-Phase 6.5 kW power rating",
                        "Super compact wall-mount European styling",
                        "Digital display & precision thermostat sensor"
                    ],
                    variants: [
                        { id: "aures-6-5kw", name: "Aures 6.5 kW (Single-Phase)", capacity: "6.5 kW", spec: "6.5 kW Single-Phase", mrp: 11499, price: 9000 }
                    ]
                },
                {
                    id: "aures-7-6kw",
                    name: "Aures 7.6 kW (Single-Phase)",
                    brand: "Racold",
                    image: "/assets/product category/Tankless Geyser/Aures 7.6kw.jpeg",
                    spec: "7.6 kW Single-Phase Multi-point",
                    mrp: 11999,
                    price: 12000,
                    free_installation: true,
                    free_pipe: true,
                    in_stock: true,
                    fast_delivery: true,
                    features: [
                        "Free Standard Installation & Connecting Pipes Included",
                        "Continuous instant hot water without tank delays",
                        "Single-Phase 7.6 kW high output",
                        "Digital touch display for exact temperature selection",
                        "Multi-point bathroom & kitchen compatibility"
                    ],
                    variants: [
                        { id: "aures-7-6kw", name: "Aures 7.6 kW (Single-Phase)", capacity: "7.6 kW", spec: "7.6 kW Single-Phase", mrp: 11999, price: 12000 }
                    ]
                },
                {
                    id: "aures-13kw",
                    name: "Aures 13 kW (Three-Phase)",
                    brand: "Racold",
                    image: "/assets/product category/Tankless Geyser/Aures 13 kw.jpeg",
                    spec: "13 kW Three-Phase Multi-point",
                    mrp: 34149,
                    price: 26000,
                    free_installation: true,
                    free_pipe: true,
                    in_stock: true,
                    fast_delivery: true,
                    features: [
                        "Free Standard Installation & Connecting Pipes Included",
                        "High Power 13 kW Three-Phase Commercial/Luxury Grade",
                        "Continuous hot water for multiple bathrooms simultaneously",
                        "Digital smart display & temperature control",
                        "Premium European aesthetics & compact wall mounting"
                    ],
                    variants: [
                        { id: "aures-13kw", name: "Aures 13 kW (Three-Phase)", capacity: "13 kW", spec: "13 kW 3-Phase", mrp: 34149, price: 26000 }
                    ]
                },
                {
                    id: "aures-24kw",
                    name: "Aures 24 kW (Three-Phase)",
                    brand: "Racold",
                    image: "/assets/product category/Tankless Geyser/Aures 24kw.jpeg",
                    spec: "24 kW Three-Phase Multi-point",
                    mrp: 54199,
                    price: 42000,
                    free_installation: true,
                    free_pipe: true,
                    in_stock: true,
                    fast_delivery: true,
                    is_hero: true,
                    features: [
                        "Free Standard Installation & Connecting Pipes Included",
                        "Top-of-the-line 24 kW Three-Phase Instant Multi-point",
                        "Simultaneous flow to 3+ luxury rain showers",
                        "Digital touch display with high precision heating",
                        "Engineered for luxury villas, spas & penthouses"
                    ],
                    variants: [
                        { id: "aures-24kw", name: "Aures 24 kW (Three-Phase)", capacity: "24 kW", spec: "24 kW 3-Phase", mrp: 54199, price: 42000 }
                    ]
                }
            ]
        },

        // 3. DOMESTIC HEAT PUMPS (RACOLD)
        {
            id: "domestic-heatpump",
            brand: "Racold",
            name: "Domestic Heat Pumps",
            type: "projects",
            tagline: "70% Electricity Savings for Luxury Bungalows & Villas",
            image_url: "/assets/product category/Domestic Heatpump/Domestic Heat Pump 200l , 300l , 500l.jpeg",
            features: [
                "Complete Turnkey Installation & Technical Commissioning Included",
                "70% Electricity Energy Savings vs Regular Geysers",
                "Centralized Hot Water for 4 to 15 Bathrooms",
                "Capacities: 200L, 300L and 500L",
                "Smart Digital Touch Controller with Schedule Timer",
                "Free On-Site Engineering Survey in Ranchi & Jharkhand"
            ],
            products: [
                {
                    id: "domestic-heatpump-200-300-500",
                    name: "Racold Domestic Heat Pump System",
                    brand: "Racold",
                    image: "/assets/product category/Domestic Heatpump/Domestic Heat Pump 200l , 300l , 500l.jpeg",
                    spec: "Available in 200L, 300L, 500L",
                    mrp: 135000,
                    price: 108000,
                    free_installation: true,
                    free_pipe: true,
                    in_stock: true,
                    is_project: true,
                    features: [
                        "Free Standard Installation & Commissioning Included",
                        "Caters to 4 to 15 bathrooms simultaneously",
                        "70% energy savings with thermodynamic compressor",
                        "Titanium plus enamel tank with 8 bar pressure rating",
                        "Intelligent digital remote controller with vacation mode",
                        "Authorized installation & plumbing layout assistance by SunAura"
                    ],
                    variants: [
                        { id: "domestic-heatpump-200l", name: "Domestic Heat Pump 200L", capacity: "200L", spec: "200L Capacity", mrp: 135000, price: 108000 },
                        { id: "domestic-heatpump-300l", name: "Domestic Heat Pump 300L", capacity: "300L", spec: "300L Capacity", mrp: 165000, price: 132000 },
                        { id: "domestic-heatpump-500l", name: "Domestic Heat Pump 500L", capacity: "500L", spec: "500L Capacity", mrp: 210000, price: 168000 }
                    ]
                }
            ]
        },

        // 4. COMMERCIAL HEAT PUMPS (RACOLD)
        {
            id: "commercial-heatpump",
            brand: "Racold",
            name: "Commercial Heat Pumps",
            type: "projects",
            tagline: "Heavy-Duty Energy Efficient Solutions for Hotels, Hospitals & Hostels",
            image_url: "/assets/product category/Commercial Heatpump/commercial heatpump 12kw and 23kw.jpeg",
            features: [
                "Massive 70% Operating Cost Savings for Commercial Projects",
                "Power Ratings: 12 kW, 23 kW, and 48 kW",
                "Eco-Friendly Green Refrigerant",
                "Turnkey Supply, Installation & Engineering by SunAura"
            ],
            products: [
                {
                    id: "commercial-heatpump-12-23kw",
                    name: "Commercial Heat Pump (12 kW & 23 kW)",
                    brand: "Racold",
                    image: "/assets/product category/Commercial Heatpump/commercial heatpump 12kw and 23kw.jpeg",
                    spec: "12 kW & 23 kW Modular Units",
                    mrp: 220000,
                    price: 185000,
                    free_installation: true,
                    free_pipe: true,
                    in_stock: true,
                    is_project: true,
                    features: [
                        "Turnkey Installation & Engineering Setup Included",
                        "Designed for Hotels, Hospitals, Resorts & Hostels",
                        "Up to 70% energy savings on recurring boiler/diesel costs",
                        "Intelligent micro-controller with auto defrost",
                        "Quiet high-efficiency scroll compressor"
                    ]
                },
                {
                    id: "commercial-heatpump-48kw",
                    name: "Commercial Heat Pump (48 kW Mega Industrial)",
                    brand: "Racold",
                    image: "/assets/product category/Commercial Heatpump/commercial heatpump 48kw.jpeg",
                    spec: "48 kW High Capacity",
                    mrp: 450000,
                    price: 390000,
                    free_installation: true,
                    free_pipe: true,
                    in_stock: true,
                    is_project: true,
                    features: [
                        "Turnkey Engineering Installation Included",
                        "Ideal for 50+ room hotels, large educational institutes & hospitals",
                        "Installed successfully at Hotel Clarks Inn Bokaro",
                        "Cascade connection support for massive projects",
                        "SunAura direct warranty and authorized maintenance"
                    ]
                }
            ]
        },

        // 5. SOLAR WATER HEATERS (RACOLD)
        {
            id: "solar-water-heater",
            brand: "Racold",
            name: "Solar Water Heaters",
            type: "projects",
            tagline: "Zero Electricity Bill Hot Water for Homes & Institutions",
            image_url: "/assets/product category/Solar water Heater/Solar water Heater Alpha plus.jpeg",
            features: [
                "Zero Electricity Running Cost with High Solar Absorption",
                "Duronox Hard Water Protection & Magnesium Anode",
                "Max Pressure 8 Bar (Pressurized & Non-Pressurized)",
                "Institutional capacities up to 12,000+ LPD",
                "Turnkey Rooftop Installation by SunAura Engineers"
            ],
            products: [
                {
                    id: "alpha-plus-solar",
                    name: "Racold Alpha Plus Solar Water Heater",
                    brand: "Racold",
                    image: "/assets/product category/Solar water Heater/Solar water Heater Alpha plus.jpeg",
                    spec: "100L, 200L, 300L, 500L LPD",
                    mrp: 38000,
                    price: 29500,
                    free_installation: true,
                    free_pipe: true,
                    in_stock: true,
                    is_project: true,
                    features: [
                        "Complete Rooftop Installation & Structure Mounting Included",
                        "High efficiency evacuated glass tubes (ETC)",
                        "Duronox rust-proof inner tank designed for hard water",
                        "Minimal heat loss with high density PUF insulation",
                        "Installed on rooftop with sturdy mounting frame"
                    ],
                    variants: [
                        { id: "alpha-plus-100l", name: "Alpha Plus 100 LPD", capacity: "100 LPD", spec: "100 LPD", mrp: 38000, price: 29500 },
                        { id: "alpha-plus-200l", name: "Alpha Plus 200 LPD", capacity: "200 LPD", spec: "200 LPD", mrp: 54000, price: 42000 },
                        { id: "alpha-plus-300l", name: "Alpha Plus 300 LPD", capacity: "300 LPD", spec: "300 LPD", mrp: 72000, price: 58000 },
                        { id: "alpha-plus-500l", name: "Alpha Plus 500 LPD", capacity: "500 LPD", spec: "500 LPD", mrp: 110000, price: 89000 }
                    ]
                },
                {
                    id: "omega-max-8-solar",
                    name: "Racold Omega Max 8 Pressurized Solar",
                    brand: "Racold",
                    image: "/assets/product category/Solar water Heater/Solar Water Heater Omega.jpeg",
                    spec: "100L, 200L, 300L, 500L (8 Bar Pressurized)",
                    mrp: 48000,
                    price: 38500,
                    free_installation: true,
                    free_pipe: true,
                    in_stock: true,
                    is_project: true,
                    features: [
                        "Complete Rooftop Installation & Pressure Commissioning Included",
                        "Rated for 8 Bar High Pressure booster pumps",
                        "Suitable for luxury bathrooms with multi-head rain showers",
                        "Titanium Plus glass coated tank for long lifespan",
                        "Electric backup heating option for cloudy monsoon days"
                    ],
                    variants: [
                        { id: "omega-max-100l", name: "Omega Max 8 (100 LPD)", capacity: "100 LPD", spec: "100 LPD (8 Bar)", mrp: 48000, price: 38500 },
                        { id: "omega-max-200l", name: "Omega Max 8 (200 LPD)", capacity: "200 LPD", spec: "200 LPD (8 Bar)", mrp: 68000, price: 54000 },
                        { id: "omega-max-300l", name: "Omega Max 8 (300 LPD)", capacity: "300 LPD", spec: "300 LPD (8 Bar)", mrp: 92000, price: 74000 },
                        { id: "omega-max-500l", name: "Omega Max 8 (500 LPD)", capacity: "500 LPD", spec: "500 LPD (8 Bar)", mrp: 142000, price: 114000 }
                    ]
                }
            ]
        }
    ],
    projects: [
        {
            id: "project-1",
            title: "Hotel Clarks Inn - Bokaro",
            category: "Hotels & Hospitality",
            capacity: "48 kW Commercial Heat Pump + 5000L Storage",
            scope: "Centralized Hot Water for 50 Luxury Bathrooms",
            description: "We successfully engineered, supplied, and installed a 48kW Racold commercial heat pump system integrated with a 5000L insulated buffer tank. Providing 24/7 continuous hot water to 50 hotel rooms with 70% energy savings over conventional boilers.",
            images: [
                "/assets/Successfull Project/Hotel Clark INN 1.jpeg",
                "/assets/Successfull Project/Hotel Clark INN 2.jpeg",
                "/assets/Successfull Project/Hotel Clark INN 3.jpeg"
            ]
        },
        {
            id: "project-2",
            title: "NIT Jamshedpur - Mega Campus Solar",
            category: "Educational Institutions",
            capacity: "12,000 LPD Solar Water Heating FPC System",
            scope: "Boys & Girls Hostels (1,300 Students)",
            description: "SunAura completed the turnkey installation of a 12,000 Litres Per Day (LPD) industrial Solar Water Heating System featuring flat plate collectors (FPC) and high-efficiency heat exchangers for student hostels at the prestigious National Institute of Technology (NIT) Jamshedpur.",
            images: [
                "/assets/Successfull Project/NIT 1.jpeg",
                "/assets/Successfull Project/NIT 2.jpeg",
                "/assets/Successfull Project/NIT 3.jpeg"
            ]
        }
    ]
};
