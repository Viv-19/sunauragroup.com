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
                    spec: "25L Capacity",
                    mrp: 24999,
                    price: 18499,
                    in_stock: true,
                    fast_delivery: true,
                    is_hero: true,
                    features: ["Voice Control (Alexa / Google Assistant)", "Racold Net Mobile App Control", "Digital Touch Display", "Intelligent Temperature Controller", "Auto Power OFF"]
                },
                {
                    id: "omnis-dg-wifi",
                    name: "Omnis DG Wi-Fi",
                    brand: "Racold",
                    image: "/assets/product category/Storage Geyser/Omnis dg wifi.jpeg",
                    spec: "15L and 25L Available",
                    mrp: 21999,
                    price: 16499,
                    in_stock: true,
                    fast_delivery: true,
                    is_hero: true,
                    features: ["Smart Wi-Fi & Voice Control", "Racold Net App", "Digital Touch Control", "Intelligent Temperature Controller", "Auto Power OFF"]
                },
                {
                    id: "omnis-dg",
                    name: "Omnis DG",
                    brand: "Racold",
                    image: "/assets/product category/Storage Geyser/Omnis dg.jpeg",
                    spec: "10L, 15L, 25L Available",
                    mrp: 17999,
                    price: 13499,
                    in_stock: true,
                    fast_delivery: true,
                    features: ["Digital Touch Control", "Auto Power OFF", "Self Auto-Diagnosis", "Titanium Plus Technology", "Safety Plus Protection"]
                },
                {
                    id: "omnis-slim",
                    name: "Omnis Slim",
                    brand: "Racold",
                    image: "/assets/product category/Storage Geyser/Omnis slim.jpeg",
                    spec: "15L and 25L Available",
                    mrp: 16499,
                    price: 12299,
                    in_stock: true,
                    fast_delivery: true,
                    features: ["Space Saving Horizontal/Vertical Slim Design", "Titanium Plus Technology", "Advanced Titanium Heating Element", "Safety Plus 8 Bar"]
                },
                {
                    id: "omnis-r",
                    name: "Omnis R",
                    brand: "Racold",
                    image: "/assets/product category/Storage Geyser/Omnis R.jpeg",
                    spec: "10L, 15L, 25L Available",
                    mrp: 14999,
                    price: 10999,
                    in_stock: true,
                    fast_delivery: true,
                    features: ["Titanium Plus Technology", "Children Care Mode", "High Pressure Resistance", "Safety Plus"]
                },
                {
                    id: "platinum-nxt",
                    name: "Platinum NXT",
                    brand: "Racold",
                    image: "/assets/product category/Storage Geyser/Platinum nxt.jpeg",
                    spec: "50L, 70L, 100L High Capacity",
                    mrp: 28999,
                    price: 22499,
                    in_stock: true,
                    fast_delivery: true,
                    features: ["Titanium Plus Enamel Coating", "Children Care Mode", "Extra High Volume Capacity", "Quick Heating System"]
                },
                {
                    id: "cdr-dlx",
                    name: "CDR DLX",
                    brand: "Racold",
                    image: "/assets/product category/Storage Geyser/cdr dlx.jpeg",
                    spec: "10L, 15L, 25L, 35L (H/V)",
                    mrp: 13499,
                    price: 9899,
                    in_stock: true,
                    fast_delivery: true,
                    features: ["Titanium Plus Technology", "Titanium Heating Element", "Safety Plus", "Rust-proof durable body"]
                },
                {
                    id: "altro-i-plus",
                    name: "Altro i+",
                    brand: "Racold",
                    image: "/assets/product category/Storage Geyser/Altro i+.jpeg",
                    spec: "1L, 3L, 6L Compact",
                    mrp: 6499,
                    price: 4699,
                    in_stock: true,
                    fast_delivery: true,
                    features: ["Instant Hot Water", "Smart LED Ring Indicator", "Safety Plus", "Customized Application for Kitchen & Bath"]
                },
                {
                    id: "pronto-neo",
                    name: "Pronto Neo",
                    brand: "Racold",
                    image: "/assets/product category/Storage Geyser/Pronto neo.jpeg",
                    spec: "1L, 3L, 5L Instant",
                    mrp: 5299,
                    price: 3799,
                    in_stock: true,
                    fast_delivery: true,
                    features: ["Faster 3kW Heating", "No Back-Flow Valve", "High Pressure Resistance (HPR)", "Rust-Proof Polymer Body"]
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
                "Multipoint Usage (Serves Multiple Outlets Simultaneously)",
                "Endless Continuous Hot Water without Waiting",
                "Super Compact & Space Saving Aesthetic",
                "Lightning Fast Electronic Heating"
            ],
            products: [
                {
                    id: "aures-24kw",
                    name: "Aures 24 kW Three Phase",
                    brand: "Racold",
                    image: "/assets/product category/Tankless Geyser/Aures 24kw.jpeg",
                    spec: "24 kW High Power Multi-point",
                    mrp: 35000,
                    price: 27999,
                    in_stock: true,
                    fast_delivery: true,
                    features: ["Multipoint continuous hot water", "Digital temperature display", "Premium European aesthetics", "High efficiency instantaneous heating"]
                },
                {
                    id: "aures-13kw",
                    name: "Aures 13 kW",
                    brand: "Racold",
                    image: "/assets/product category/Tankless Geyser/Aures 13 kw.jpeg",
                    spec: "13 kW Multi-point",
                    mrp: 24500,
                    price: 19499,
                    in_stock: true,
                    fast_delivery: true,
                    features: ["Lightning fast heating", "Multipoint usage", "Consistent temperature control", "Digital display"]
                },
                {
                    id: "aures-7-6kw",
                    name: "Aures 7.6 kW",
                    brand: "Racold",
                    image: "/assets/product category/Tankless Geyser/Aures 7.6kw.jpeg",
                    spec: "7.6 kW Single Phase",
                    mrp: 16999,
                    price: 12999,
                    in_stock: true,
                    fast_delivery: true,
                    features: ["Compact wall-mount design", "Constant warmth control", "Energy saver mode", "Multipoint compatible"]
                },
                {
                    id: "aures-6-6kw",
                    name: "Aures 6.6 kW",
                    brand: "Racold",
                    image: "/assets/product category/Tankless Geyser/Aures 6.6 kw.jpeg",
                    spec: "6.6 kW Single Phase",
                    mrp: 14999,
                    price: 11499,
                    in_stock: true,
                    fast_delivery: true,
                    features: ["Compact lightweight profile", "Fast heating element", "Safety cut-off sensor", "Minimal power standby"]
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
                "70% Electricity Energy Savings vs Regular Geysers",
                "Centralized Hot Water for 4 to 15 Bathrooms",
                "Capacities: 200L, 300L and 500L",
                "Smart Digital Touch Controller with Schedule Timer",
                "Complete Project Installation & Site Survey in Jharkhand"
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
                    in_stock: true,
                    is_project: true,
                    features: [
                        "Caters to 4 to 15 bathrooms simultaneously",
                        "70% energy savings with thermodynamic compressor",
                        "Titanium plus enamel tank with 8 bar pressure rating",
                        "Intelligent digital remote controller with vacation mode",
                        "Authorized installation & plumbing layout assistance"
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
                    in_stock: true,
                    is_project: true,
                    features: [
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
                    in_stock: true,
                    is_project: true,
                    features: [
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
                "Institutional capacities up to 12,000+ LPD"
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
                    in_stock: true,
                    is_project: true,
                    features: [
                        "High efficiency evacuated glass tubes (ETC)",
                        "Duronox rust-proof inner tank designed for hard water",
                        "Minimal heat loss with high density PUF insulation",
                        "Installed on rooftop with sturdy mounting frame"
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
                    in_stock: true,
                    is_project: true,
                    features: [
                        "Rated for 8 Bar High Pressure booster pumps",
                        "Suitable for luxury bathrooms with multi-head rain showers",
                        "Titanium Plus glass coated tank for long lifespan",
                        "Electric backup heating option for cloudy monsoon days"
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
