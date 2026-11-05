import { Vehicle, PortRate } from "@/types/vehicle";

export const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: "xiaomi-su7-max",
    name: "Xiaomi SU7 Max AWD",
    brand: "Xiaomi",
    model: "SU7",
    year: 2024,
    body_type: "Sedan",
    fuel_type: "Pure Electric (BEV)",
    price_fob_usd: 34800,
    range_km: 800,
    top_speed_kmh: 265,
    acceleration_0_100: "2.78s",
    battery_kwh: 101,
    drive_type: "AWD",
    seating: 5,
    featured: true,
    status: "Available",
    images: [
      "https://pub-fd2ae53de5ae41b1aee16df0031dc281.r2.dev/vehicles/xiaomi-su7-max.jpg",
      "https://pub-fd2ae53de5ae41b1aee16df0031dc281.r2.dev/vehicles/geely-galaxy-e8.jpg",
      "https://pub-fd2ae53de5ae41b1aee16df0031dc281.r2.dev/vehicles/byd-seal.jpg"
    ],
    color_options: [
      { name: "Aqua Blue", hex: "#1A4968" },
      { name: "Mineral Gray", hex: "#4B4E53" },
      { name: "Verdant Green", hex: "#435B4E" }
    ],
    description: "The Xiaomi SU7 Max is an ultra-high performance all-electric flagship sedan featuring an 800V silicon carbide architecture, HyperOS smart cockpit, and 673 horsepower.",
  },
  {
    id: "byd-yangwang-u8",
    name: "BYD Yangwang U8 Premium Edition",
    brand: "BYD",
    model: "Yangwang U8",
    year: 2025,
    body_type: "SUV",
    fuel_type: "Extended Range (EREV)",
    price_fob_usd: 148000,
    range_km: 1000,
    top_speed_kmh: 200,
    acceleration_0_100: "3.6s",
    battery_kwh: 49.05,
    drive_type: "4WD",
    seating: 5,
    featured: true,
    status: "Available",
    images: [
      "https://pub-fd2ae53de5ae41b1aee16df0031dc281.r2.dev/vehicles/byd-yangwang-u8.jpg",
      "https://pub-fd2ae53de5ae41b1aee16df0031dc281.r2.dev/vehicles/jetour-t2.jpg"
    ],
    color_options: [
      { name: "Obsidian Black", hex: "#111111" },
      { name: "Silver Stone", hex: "#8A8D8F" },
      { name: "Sunstone Gold", hex: "#C5A059" }
    ],
    description: "Million-RMB luxury off-road flagship with e4 quad-motor technology, DiSus-P hydraulic suspension, 360-degree tank turns, and emergency floatation capability.",
  },
  {
    id: "zeekr-001-fr",
    name: "Zeekr 001 Luxury Shooting Brake",
    brand: "Zeekr",
    model: "001",
    year: 2024,
    body_type: "Coupe",
    fuel_type: "Pure Electric (BEV)",
    price_fob_usd: 38500,
    range_km: 750,
    top_speed_kmh: 240,
    acceleration_0_100: "3.3s",
    battery_kwh: 100,
    drive_type: "AWD",
    seating: 5,
    featured: true,
    status: "Available",
    images: [
      "https://pub-fd2ae53de5ae41b1aee16df0031dc281.r2.dev/vehicles/zeekr-001.jpg",
      "https://pub-fd2ae53de5ae41b1aee16df0031dc281.r2.dev/vehicles/chery-tiggo-9.jpg"
    ],
    color_options: [
      { name: "Electric Blue", hex: "#1D3557" },
      { name: "Polar White", hex: "#F8F9FA" },
      { name: "Phantom Gray", hex: "#343A40" }
    ],
    description: "Built on Geely's SEA platform with an 800V high-voltage system, dual motors producing 544 HP, and air suspension with CCD damping.",
  },
  {
    id: "li-auto-l9-ultra",
    name: "Li Auto L9 Ultra Flagship SUV",
    brand: "Li Auto",
    model: "L9",
    year: 2025,
    body_type: "SUV",
    fuel_type: "Extended Range (EREV)",
    price_fob_usd: 59500,
    range_km: 1412,
    top_speed_kmh: 180,
    acceleration_0_100: "5.3s",
    battery_kwh: 52.3,
    drive_type: "AWD",
    seating: 6,
    featured: true,
    status: "Available",
    images: [
      "https://pub-fd2ae53de5ae41b1aee16df0031dc281.r2.dev/vehicles/li-auto-l9.jpg",
      "https://pub-fd2ae53de5ae41b1aee16df0031dc281.r2.dev/vehicles/voyah-dreamer.jpg"
    ],
    color_options: [
      { name: "Gold Metallic", hex: "#D4AF37" },
      { name: "Deep Silver", hex: "#5A5D64" },
      { name: "Glacier White", hex: "#FFFFFF" }
    ],
    description: "The premier full-size family smart SUV from China. Dual 15.7-inch OLED 3K screens, rear entertainment theater, dual wireless charging, and zero-gravity massage seats.",
  },
  {
    id: "nio-et7-executive",
    name: "NIO ET7 Executive All-Electric Sedan",
    brand: "NIO",
    model: "ET7",
    year: 2024,
    body_type: "Sedan",
    fuel_type: "Pure Electric (BEV)",
    price_fob_usd: 56000,
    range_km: 675,
    top_speed_kmh: 200,
    acceleration_0_100: "3.8s",
    battery_kwh: 100,
    drive_type: "AWD",
    seating: 5,
    featured: false,
    status: "Available",
    images: [
      "https://pub-fd2ae53de5ae41b1aee16df0031dc281.r2.dev/vehicles/nio-et7.jpg"
    ],
    color_options: [
      { name: "Star Gray", hex: "#6C757D" },
      { name: "Cloud White", hex: "#F8F9FA" },
      { name: "Deep Navy", hex: "#0B2545" }
    ],
    description: "Luxury high-end electric business sedan equipped with NIO Autonomous Driving (NAD), LiDAR sensor suite, NOMI intelligent assistant, and 3-minute battery swap compatibility.",
  },
  {
    id: "byd-seal-performance",
    name: "BYD Seal EV Performance AWD",
    brand: "BYD",
    model: "Seal",
    year: 2024,
    body_type: "Sedan",
    fuel_type: "Pure Electric (BEV)",
    price_fob_usd: 26900,
    range_km: 650,
    top_speed_kmh: 180,
    acceleration_0_100: "3.8s",
    battery_kwh: 82.5,
    drive_type: "AWD",
    seating: 5,
    featured: false,
    status: "Available",
    images: [
      "https://pub-fd2ae53de5ae41b1aee16df0031dc281.r2.dev/vehicles/byd-seal.jpg"
    ],
    color_options: [
      { name: "Atlantis Gray", hex: "#4A5568" },
      { name: "Courtyard Green", hex: "#2D3748" },
      { name: "Polar White", hex: "#EDF2F7" }
    ],
    description: "Award-winning EV sedan powered by BYD's ultra-safe Blade Battery and Cell-to-Body (CTB) integration technology with 530 HP dual motors.",
  },
  {
    id: "jetour-t2-4wd",
    name: "Jetour T2 Traveler 4WD Off-Roader",
    brand: "Jetour",
    model: "T2",
    year: 2024,
    body_type: "Off-Road",
    fuel_type: "Petrol",
    price_fob_usd: 23500,
    range_km: 850,
    top_speed_kmh: 180,
    acceleration_0_100: "8.1s",
    drive_type: "4WD",
    seating: 5,
    featured: false,
    status: "Available",
    images: [
      "https://pub-fd2ae53de5ae41b1aee16df0031dc281.r2.dev/vehicles/jetour-t2.jpg"
    ],
    color_options: [
      { name: "Desert Sand", hex: "#C2B280" },
      { name: "Forest Green", hex: "#2E4600" },
      { name: "Matte Black", hex: "#1A1A1A" }
    ],
    description: "Rugged boxy 4WD SUV with BorgWarner 6th-gen intelligent torque management, 2.0TGDI turbocharged engine, and Qualcomm Snapdragon 8155 chip cockpit.",
  },
  {
    id: "chery-tiggo-9",
    name: "Chery Tiggo 9 Flagship 7-Seater",
    brand: "Chery",
    model: "Tiggo 9",
    year: 2025,
    body_type: "SUV",
    fuel_type: "Plug-in Hybrid (PHEV)",
    price_fob_usd: 24800,
    range_km: 1300,
    top_speed_kmh: 205,
    acceleration_0_100: "4.9s",
    battery_kwh: 34.4,
    drive_type: "AWD",
    seating: 7,
    featured: false,
    status: "Available",
    images: [
      "https://pub-fd2ae53de5ae41b1aee16df0031dc281.r2.dev/vehicles/chery-tiggo-9.jpg"
    ],
    description: "Chery's flagship luxury 7-seat hybrid SUV featuring CDC electromagnetic suspension, Sony 14-speaker sound system, and zero-gravity passenger lounger.",
  },
  {
    id: "geely-galaxy-e8",
    name: "Geely Galaxy E8 Smart Sedan",
    brand: "Geely",
    model: "Galaxy E8",
    year: 2024,
    body_type: "Sedan",
    fuel_type: "Pure Electric (BEV)",
    price_fob_usd: 24200,
    range_km: 665,
    top_speed_kmh: 210,
    acceleration_0_100: "3.49s",
    battery_kwh: 76,
    drive_type: "AWD",
    seating: 5,
    featured: false,
    status: "Available",
    images: [
      "https://pub-fd2ae53de5ae41b1aee16df0031dc281.r2.dev/vehicles/geely-galaxy-e8.jpg"
    ],
    description: "World's lowest drag coefficient of 0.199 Cd, massive 45-inch 8K borderless unibody screen, and SEA architecture engineered with Volvo safety DNA.",
  },
  {
    id: "voyah-dreamer-phev",
    name: "Voyah Dreamer Luxury Executive MPV",
    brand: "Voyah",
    model: "Dreamer",
    year: 2024,
    body_type: "MPV",
    fuel_type: "Plug-in Hybrid (PHEV)",
    price_fob_usd: 52500,
    range_km: 1231,
    top_speed_kmh: 200,
    acceleration_0_100: "5.9s",
    battery_kwh: 43,
    drive_type: "AWD",
    seating: 7,
    featured: false,
    status: "Available",
    images: [
      "https://pub-fd2ae53de5ae41b1aee16df0031dc281.r2.dev/vehicles/voyah-dreamer.jpg"
    ],
    description: "First-class business carrier with airplane-style reclining massage seats, air suspension with magic carpet road preview, and 5-star C-NCAP safety rating.",
  }
];

export const PORT_SHIPPING_RATES: PortRate[] = [
  // Middle East
  { region: "Middle East", country: "United Arab Emirates", port: "Dubai (Jebel Ali)", roro_usd: 1450, container_40ft_usd: 3200, transit_days: 18 },
  { region: "Middle East", country: "Saudi Arabia", port: "Jeddah Islamic Port", roro_usd: 1650, container_40ft_usd: 3600, transit_days: 22 },
  { region: "Middle East", country: "Saudi Arabia", port: "Dammam King Abdulaziz", roro_usd: 1550, container_40ft_usd: 3400, transit_days: 20 },
  { region: "Middle East", country: "Qatar", port: "Hamad Port (Doha)", roro_usd: 1600, container_40ft_usd: 3500, transit_days: 21 },
  { region: "Middle East", country: "Oman", port: "Sohar / Muscat", roro_usd: 1500, container_40ft_usd: 3300, transit_days: 19 },
  
  // Central Asia (Rail / Truck Transport)
  { region: "Central Asia", country: "Uzbekistan", port: "Tashkent (Khorgos Border Rail)", roro_usd: 2200, container_40ft_usd: 4800, transit_days: 14 },
  { region: "Central Asia", country: "Kazakhstan", port: "Almaty (Alashankou Rail)", roro_usd: 1950, container_40ft_usd: 4300, transit_days: 12 },
  { region: "Central Asia", country: "Kyrgyzstan", port: "Bishkek (Torugart Pass)", roro_usd: 2100, container_40ft_usd: 4600, transit_days: 13 },
  { region: "Central Asia", country: "Azerbaijan", port: "Baku (Caspian Sea Corridor)", roro_usd: 2800, container_40ft_usd: 5800, transit_days: 24 },

  // Africa
  { region: "Africa", country: "Djibouti", port: "Port of Djibouti", roro_usd: 1750, container_40ft_usd: 3800, transit_days: 25 },
  { region: "Africa", country: "Kenya", port: "Mombasa Port", roro_usd: 1850, container_40ft_usd: 3950, transit_days: 26 },
  { region: "Africa", country: "Nigeria", port: "Lagos (Apapa / Tin Can)", roro_usd: 2200, container_40ft_usd: 4600, transit_days: 35 },
  { region: "Africa", country: "Egypt", port: "Alexandria / Port Said", roro_usd: 1900, container_40ft_usd: 4100, transit_days: 24 },
  { region: "Africa", country: "Ghana", port: "Tema Port", roro_usd: 2150, container_40ft_usd: 4500, transit_days: 34 },

  // Europe & Mediterranean
  { region: "Europe", country: "Netherlands", port: "Rotterdam", roro_usd: 1850, container_40ft_usd: 3900, transit_days: 32 },
  { region: "Europe", country: "Belgium", port: "Antwerp", roro_usd: 1850, container_40ft_usd: 3900, transit_days: 32 },
  { region: "Europe", country: "Germany", port: "Bremerhaven", roro_usd: 1900, container_40ft_usd: 4000, transit_days: 33 },
  { region: "Europe", country: "Greece", port: "Piraeus", roro_usd: 1750, container_40ft_usd: 3700, transit_days: 26 },
  
  // South America & Caribbean
  { region: "South America", country: "Brazil", port: "Santos", roro_usd: 2300, container_40ft_usd: 4900, transit_days: 38 },
  { region: "South America", country: "Chile", port: "San Antonio / Valparaiso", roro_usd: 2100, container_40ft_usd: 4500, transit_days: 34 }
];
