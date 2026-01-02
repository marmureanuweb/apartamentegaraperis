export const siteConfig = {
  name: 'Apartamente Gara Peris',
  description: 'Apartamente de vanzare in Gara Peris - locuinte moderne cu acces rapid la Bucuresti',
  url: 'https://apartamentegaraperis.web.app',
  defaultImage: '/assets/img/ApartamenteGaraPeris-logo.svg',
  language: 'ro',
  locale: 'ro_RO',
};

export const contactConfig = {
  phone: '0040723658451',
  phoneFormatted: '0723 658 451',
  phone2: '0040723658452',
  phone2Formatted: '0722 498 665',
  whatsapp: '40723658451',
  email: 'contact@apartamentegaraperis.web.app',
  address: {
    street: 'Strada Gării',
    city: 'Peris',
    county: 'Ilfov',
    country: 'România',
    postalCode: '077145',
  },
  coordinates: {
    lat: 44.677528,
    lng: 25.997525,
  },
  googleMapsUrl: 'https://maps.app.goo.gl/aSjSyij4e7BZzfqB6',
  googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d178.20184527863154!2d25.997525432898225!3d44.677528261585394!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b217af3fbafc43%3A0x49ff98f48b0f0c24!2zUGVyaciZ!5e0!3m2!1sen!2sro!4v1766353479795!5m2!1sen!2sro',
};

export const socialConfig = {
  facebook: 'https://www.facebook.com/profile.php?id=61585622155044',
  googleMaps: 'https://maps.app.goo.gl/aSjSyij4e7BZzfqB6',
};

export const navConfig = [
  { href: '/', label: 'Acasă', id: 'home' },
  { href: '/despre', label: 'Despre', id: 'despre' },
  { href: '/apartamente', label: 'Apartamente', id: 'apartamente' },
  { href: '/blog', label: 'Blog', id: 'blog' },
  { href: '/contact', label: 'Contact', id: 'contact' },
];

export const footerConfig = {
  quickLinks: [
    { href: '/', label: 'Acasă' },
    { href: '/despre', label: 'Despre' },
    { href: '/apartamente', label: 'Apartamente' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ],
  legalLinks: [
    { href: '/termeni-si-conditii', label: 'Termeni și condiții' },
    { href: '/politica-cookies', label: 'Politica de cookies' },
  ],
  benefits: [
    'Apartamente de vanzare la preturi accesibile în zonă liniștită',
    'Acces rapid la transport în comun și centrul Bucureștiului',
    'Apartament lângă Gara Periș cu spații verzi și aer curat în apropiere',
    'Case Peris cu facilități moderne: școli, magazine, parcuri',
    'Investiție sigură în imobiliare cu potențial de creștere',
    'Comunitate prietenoasă și infrastructură în continuă dezvoltare',
  ],
};

export const featuresConfig = [
  {
    icon: 'bi-building',
    title: 'Modern',
    description: 'Locuință modernă vizavi de gara Peris cu acces rapid la București în doar 30 de minute cu trenul – mult mai rapid decât mașina. Stație de autobuz chiar în fața blocului și magazine Mega Image, Profi la doar 1 minut de mers pe jos.',
  },
  {
    icon: 'bi-bricks',
    title: 'Construit să reziste',
    description: 'Construit din materiale de calitate superioară, cu pereți din cărămidă groasă pentru izolație fonică și termică excelentă. Structură solidă, finisaje durabile și atenție la detalii pentru un apartament care rezistă în timp.',
  },
  {
    icon: 'bi-card-checklist',
    title: 'Confort',
    description: 'Ai confortul unui apartament modern și libertatea unei case. Spații generoase, curte comună verde și vecini prietenoși într-o comunitate liniștită, departe de aglomerația orașului.',
  },
];

export const heroSlides = [
  {
    image: '/assets/img/slide-1.jpg',
    location: 'Gara Peris, Ilfov',
    title: '<span class="color-b">Apartamente</span> Moderne\n<br /> lângă Gara Periș',
    price: 'de la 90.000 EUR',
    href: '/apartamente',
  },
  {
    image: '/assets/img/slide-2.jpg',
    location: 'La 30 min de București',
    title: '<span class="color-b">3 Camere</span>\n<br /> cu Finisaje Premium',
    price: '70-90 mp',
    href: '/apartamente',
  },
  {
    image: '/assets/img/slide-3.jpg',
    location: 'Construite în 2023',
    title: '<span class="color-b">Calitate</span>\n<br /> și Confort',
    price: 'Acces rapid București',
    href: '/despre',
  },
];
