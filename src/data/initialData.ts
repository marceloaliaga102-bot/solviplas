import { SiteConfig, Comment, MediaItem, TeamMember, ActivityItem, ProductItem, CustomSection } from '../types';

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: "prod-1",
    name: "Bolsa Hidrosoluble para Comercio",
    category: "Embalaje Ligero",
    badge: "🌱 100% Soluble en Agua Tibia",
    shortDescription: "Bolsa ecológica para compras livianas que se disuelve por completo en agua tibia (50-60°C) sin dejar residuos tóxicos ni microplásticos.",
    description: "Diseñada para reemplazar las bolsas plásticas de un solo uso en panaderías, tiendas naturistas, librerías y farmacias. Elaborada a base de fécula vegetal y plastificantes inocuos, presenta una resistencia a la carga de hasta 2.5 kg en ambiente seco.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80",
    dissolutionTime: "45 a 90 segundos en agua tibia",
    thickness: "0.05 mm - 0.08 mm",
    usage: "Embalaje comercial secundario, transporte de prendas livianas, productos secos y regalos ecológicos.",
    ingredients: [
      { id: "ing-1", name: "Almidón de maíz o yuca", amount: "6 cucharadas soperas (60g)", purpose: "Matriz polimérica base para resistencia estructural." },
      { id: "ing-2", name: "Glicerina vegetal refinada", amount: "2 cucharadas (30 ml)", purpose: "Otorga elasticidad y flexibilidad para soportar estiramiento." },
      { id: "ing-3", name: "Vinagre blanco destilado", amount: "1.5 cucharadas (22 ml)", purpose: "Catalizador ácido para romper la amilosa y evitar cristalización quebradiza." },
      { id: "ing-4", name: "Agua destilada o hervida", amount: "250 ml", purpose: "Medio disolvente y activador térmico." },
      { id: "ing-5", name: "Lecitina de soya / cera vegetal", amount: "1/4 cucharadita", purpose: "Sellador ligero contra humedad ambiente transitoria." }
    ],
    steps: [
      { id: "step-1", stepNumber: 1, title: "Disolución en frío homogénea", description: "En un recipiente metálico, mezcla el agua destilada con el almidón y la glicerina. Agita intensamente con batidor manual para eliminar cualquier grumo residual antes de aplicar calor.", tip: "Si la mezcla tiene grumos, el film de la bolsa quedará con poros débiles." },
      { id: "step-2", stepNumber: 2, title: "Cocción lenta con agitación laminar", description: "Cocina a fuego lento (aprox. 85°C) durante 6 a 8 minutos hasta que la masa pase de blanco lechoso a un gel translúcido brillante y viscoso.", tip: "El punto óptimo es cuando la masa forma un cordón continuo al levantar la paleta." },
      { id: "step-3", stepNumber: 3, title: "Extensión en láminas gemelas sobre molde antiadherente", description: "Vierte sobre dos bandejas de silicona o papel aluminio extendiendo un espesor parejo de 0.8 mm con una regla niveladora para crear las caras de la bolsa.", tip: "Deja secar 36 horas a 22-25°C en un lugar ventilado y libre de polvo." },
      { id: "step-4", stepNumber: 4, title: "Sellado térmico de bordes con calor suave", description: "Une las dos láminas curadas aplicando calor leve (60-70°C con plancha protegida por papel manteca) en los tres bordes periféricos y troquela las asas superiores.", tip: "No excedas el calor de sellado para evitar fundir el biopolímero en exceso." }
    ]
  },
  {
    id: "prod-2",
    name: "Film Protector Adhesivo para Frutas y Verduras",
    category: "Película Estirable",
    badge: "🍎 Grado de Contacto Alimentario Inocuo",
    shortDescription: "Película delgada, elástica y adherente ideal para cubrir recipientes y conservar frescos los alimentos secos y vegetales sin plástico derivado del petróleo.",
    description: "Una alternativa biodegradable y compostable frente al vinipel o plástico film convencional de cocina. Permite el intercambio gaseoso controlado, prolongando la frescura de frutas y verduras mientras se degrada de forma natural al mezclarse con abono orgánico o disolverse al lavar.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=800&auto=format&fit=crop&q=80",
    dissolutionTime: "15 a 30 segundos bajo chorro de agua",
    thickness: "0.02 mm - 0.04 mm",
    usage: "Envoltura de frutas cortadas, tapado de ensaladeras, cobertura de bandejas para refrigeración corta.",
    ingredients: [
      { id: "ing-1", name: "Almidón de maíz modificado en frío", amount: "4 cucharadas rasas", purpose: "Formación de película microdelgada de rápida descomposición." },
      { id: "ing-2", name: "Glicerina vegetal grado alimenticio", amount: "2.5 cucharadas", purpose: "Alta proporción de plastificante para maximizar adhesión electrostática y elongación." },
      { id: "ing-3", name: "Ácido acético al 5% (Vinagre de manzana o blanco)", amount: "1 cucharada", purpose: "Acidificación suave y conservante natural antimicrobiano." },
      { id: "ing-4", name: "Agua purificada", amount: "300 ml", purpose: "Fluidez ultra baja para lograr espesores milimétricos al verter." }
    ],
    steps: [
      { id: "step-1", stepNumber: 1, title: "Dilución extra fluida", description: "Integra los ingredientes con mayor proporción de agua y glicerina para obtener una consistencia muy líquida parecida a la leche descremada.", tip: "Usa batidor de globo durante 2 minutos continuos." },
      { id: "step-2", stepNumber: 2, title: "Gelatinización rápida controlada", description: "Lleva a ebullición suave apagando en cuanto comience a espesar ligeramente, evitando que se torne demasiado densa para facilitar el extendido.", tip: "Controla que la temperatura no pase de los 88°C." },
      { id: "step-3", stepNumber: 3, title: "Tendido por gravedad sobre vidrio o teflón", description: "Vierte sobre una superficie de vidrio templado muy limpia e inclina la bandeja para que el líquido se nivele por gravedad formando una microcapa.", tip: "Un grosor uniforme de 0.3 mm líquido generará una película de 0.03 mm al secar." },
      { id: "step-4", stepNumber: 4, title: "Despegado suave y enrollado", description: "Tras 24 horas de secado ambiental, levanta una esquina con bisturí plástico y enrolla con papel encerado para su posterior uso en cocina.", tip: "Almacena en recipientes herméticos lejos de la luz solar directa." }
    ]
  },
  {
    id: "prod-3",
    name: "Cápsulas y Sachets Solubles Monodosis",
    category: "Envases Monodosis",
    badge: "💧 Desintegración Instantánea en Líquido",
    shortDescription: "Sobres y cápsulas selladas para dosificar detergente ecológico, sales de baño o abono líquido que se disuelven en segundos al contacto con el agua.",
    description: "Reemplazan los blisters y sachets de polietileno de un solo uso que tanto contaminan nuestros ríos y océanos. Diseñados para contener polvos secos, detergentes biodegradables o concentrados agrícolas ecológicos, liberando su contenido al contacto con el agua.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80",
    dissolutionTime: "20 a 40 segundos en agua fría o tibia",
    thickness: "0.06 mm",
    usage: "Dosificación de detergente para lavadoras, champú en polvo para hoteles sostenibles, abono para macetas.",
    ingredients: [
      { id: "ing-1", name: "Almidón de fécula de papa y maíz", amount: "5 cucharadas", purpose: "Mezcla de almidones para lograr disolución instantánea sin sedimentación." },
      { id: "ing-2", name: "Glicerina pura", amount: "1.5 cucharadas", purpose: "Mantiene la cápsula maleable y resistente a impactos leves." },
      { id: "ing-3", name: "Vinagre blanco", amount: "1 cucharada", purpose: "Estabilizador de pH para prevenir degradación prematura en anaquel seco." },
      { id: "ing-4", name: "Agua limpia desmineralizada", amount: "200 ml", purpose: "Solvente de síntesis limpia." }
    ],
    steps: [
      { id: "step-1", stepNumber: 1, title: "Preparación de la masa densa de vaciado", description: "Prepara la solución a fuego medio hasta obtener un jarabe denso y sin burbujas de aire.", tip: "Deja reposar 5 minutos para que suban y revienten las microburbujas." },
      { id: "step-2", stepNumber: 2, title: "Moldeo en moldes semiesféricos", description: "Aplica con brocha fina en moldes de silicona tipo bombón o cavidades circulares para formar pequeñas cápsulas o bolsitas huecas.", tip: "Aplica dos capas finas con intervalo de 30 minutos de secado entre cada una." },
      { id: "step-3", stepNumber: 3, title: "Llenado con producto seco o insoluble", description: "Rellena con detergente en polvo o producto deshidratado asegurando que el contenido no contenga agua libre.", tip: "Si el contenido tiene agua, la cápsula se disolvería desde adentro." },
      { id: "step-4", stepNumber: 4, title: "Termosellado de tapa con gota de agua / calor", description: "Aplica una microgota de agua humedecida en el borde de cierre o pasa una espátula tibia para sellar la cápsula herméticamente.", tip: "El propio bioplástico actúa como pegamento natural al ser humedecido ligeramente." }
    ]
  },
  {
    id: "prod-4",
    name: "Láminas Termomoldeables Rígidas",
    category: "Estructuras Semirrígidas",
    badge: "📦 Alta Firmeza Estructural",
    shortDescription: "Planchas rígidas biodegradables para separadores de productos, tarjetería ecológica, carpetas de archivo y bandejas de embalaje ecológico.",
    description: "Al formular una mayor concentración de almidón con menor cantidad de plastificante glicerólico, se obtienen placas rígidas y resistentes que pueden ser dobladas con calor o cortadas con guillotina para packaging sustentable.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80",
    dissolutionTime: "5 a 10 minutos con agitación en agua tibia",
    thickness: "0.40 mm - 1.2 mm",
    usage: "Bandejas para embalaje de cosmética sólida, separadores de cajas, etiquetas colgantes para ropa.",
    ingredients: [
      { id: "ing-1", name: "Almidón de maíz o yuca concentrado", amount: "8 cucharadas colmadas", purpose: "Genera densidad polimérica y rigidez mecánica superior." },
      { id: "ing-2", name: "Glicerina vegetal", amount: "0.5 cucharada", purpose: "Mínima dosis de plastificante para evitar fragilidad sin perder rigidez." },
      { id: "ing-3", name: "Vinagre blanco", amount: "1.5 cucharadas", purpose: "Facilita la formación de enlaces cruzados en el secado." },
      { id: "ing-4", name: "Fibra de celulosa vegetal reciclada (opcional)", amount: "1 cucharadita", purpose: "Refuerzo estructural tipo biocompuesto para mayor resistencia." },
      { id: "ing-5", name: "Agua", amount: "220 ml", purpose: "Medio de cocción." }
    ],
    steps: [
      { id: "step-1", stepNumber: 1, title: "Mezclado de alta densidad", description: "Disuelve la pasta concentrada asegurando romper cada grumo. La mezcla cruda será densa y resistente al batido.", tip: "Usa batidor eléctrico manual si es necesario para máxima homogeneidad." },
      { id: "step-2", stepNumber: 2, title: "Cocción prolongada a baja temperatura", description: "Cocina a fuego lento durante 10 minutos revolviendo con firmeza hasta que la masa parezca una masilla flexible.", tip: "No permitas que se dore o queme el fondo de la olla." },
      { id: "step-3", stepNumber: 3, title: "Prensado entre láminas acrílicas o prensas planas", description: "Coloca la masa caliente entre dos láminas antiadherentes y prensa con un rodillo pesado hasta obtener 1 mm exacto.", tip: "Coloca pesas encima durante las primeras 12 horas para mantener la placa 100% plana." },
      { id: "step-4", stepNumber: 4, title: "Curado de 48 horas y acabado", description: "Deja secar completamente durante dos días. La placa quedará firme, lisa y lista para corte o estampado con tintas vegetales.", tip: "Excelente para confeccionar señalética ecológica y cubiertas de libretas." }
    ]
  },
  {
    id: "prod-5",
    name: "Cubierta Agrícola Acolchada (Bio-Mulch)",
    category: "Agricultura Sostenible",
    badge: "🌾 Nutre la Tierra al Biodegradarse",
    shortDescription: "Film biodegradable para colocar sobre el suelo en huertos y cultivos urbanos, reteniendo la humedad y evitando maleza antes de convertirse en abono.",
    description: "El acolchado plástico tradicional de polietileno agrícola deja residuos tóxicos en la tierra. Solviplas Bio-Mulch protege los cultivos durante 3 a 6 meses y luego se reintegra al suelo de forma natural, sirviendo como nutriente orgánico para los microorganismos.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1592417817098-8f3d6910a9f5?w=800&auto=format&fit=crop&q=80",
    dissolutionTime: "Biodegradable en tierra húmeda en 60-90 días",
    thickness: "0.15 mm",
    usage: "Huertos caseros, maceteros de biohuertos, protección de raíces en semilleros comunitarios.",
    ingredients: [
      { id: "ing-1", name: "Almidón de yuca o papa", amount: "6 cucharadas", purpose: "Nutriente natural asimilable por hongos y bacterias del suelo." },
      { id: "ing-2", name: "Glicerina vegetal", amount: "1.5 cucharadas", purpose: "Aporta flexibilidad para resistir vientos y pisadas leves." },
      { id: "ing-3", name: "Café molido usado o carbón activado en polvo", amount: "1 cucharada", purpose: "Pigmento oscuro natural para bloquear rayos solares a malezas y aportar minerales." },
      { id: "ing-4", name: "Agua", amount: "260 ml", purpose: "Vehículo de cocción." }
    ],
    steps: [
      { id: "step-1", stepNumber: 1, title: "Integración con tinte natural oscuro", description: "Mezcla el almidón, agua, glicerina y añade la borra de café o carbón para otorgarle color oscuro opaco.", tip: "El color negro o marrón bloquea el paso de luz solar inhibiendo las malas hierbas." },
      { id: "step-2", stepNumber: 2, title: "Cocción y pasteurización", description: "Cocina hasta textura brillante y espesa a fuego constante.", tip: "Asegúrate de que el pigmento quede totalmente homogéneo." },
      { id: "step-3", stepNumber: 3, title: "Extensión en mantas largas continuas", description: "Vierte sobre rollos de papel o mantas plásticas antiadherentes para crear franjas continuas de 30 a 50 cm de ancho.", tip: "Seca al aire libre bajo techo." },
      { id: "step-4", stepNumber: 4, title: "Instalación en canteros y perforado para plantas", description: "Extiende sobre el suelo de la huerta, perfora pequeños agujeros para el tallo de la planta y fija los bordes con tierra.", tip: "Al finalizar la cosecha, simplemente arrójalo a la compostera o entiérralo." }
    ]
  }
];

export const INITIAL_CUSTOM_SECTIONS: CustomSection[] = [
  {
    id: "sec-certificaciones",
    title: "Propiedades Ecológicas y Certificaciones Limpias",
    subtitle: "Química Verde de Vanguardia y Cero Residuos",
    badge: "🌿 Compromiso Global",
    content: "Solviplas cumple con los principios universales de la Química Verde: uso de materias primas 100% renovables, prevención activa de residuos desde el diseño, biodegradabilidad intrínseca y total inocuidad para ecosistemas acuáticos y terrestres.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop&q=80",
    order: 10,
    layout: "split",
    highlights: [
      { id: "h-1", title: "Cero Microplásticos", description: "Al disolverse no fragmenta cadenas sintéticas, disolviéndose en agua a nivel molecular como alimento para microorganismos." },
      { id: "h-2", title: "Costes Accesibles", description: "Diseñado para costar menos de 30 soles el lote artesanal, democratizando la sostenibilidad en todo hogar o negocio." },
      { id: "h-3", title: "Economía Circular Viva", description: "Permite usar excedentes agrícolas y almidones descartados, transformando mermas en biopolímeros útiles." }
    ]
  }
];

export const INITIAL_SITE_CONFIG: SiteConfig = {
  siteName: "SOLVIPLAS",
  tagline: "Bioplásticos biodegradables y solubles en agua como alternativa sostenible",
  organization: "Iniciativa de Innovación Sostenible",
  subOrganization: "Laboratorio de Química Verde",
  institutionTarget: "Comunidad y Hogares Sostenibles",
  location: "Lima, Perú",
  year: "2025",

  heroBadge: "🌱 Proyecto Ecológico de Química Verde",
  heroTitle: "Sustituyendo el plástico convencional por bioplásticos solubles en agua",
  heroHighlight: "Biodegradable, hidrosoluble y 100% natural",
  heroDescription: "Iniciativa sustentable orientada a la producción artesanal de bioplástico a base de almidón vegetal, ofreciendo una alternativa real y compostable frente a los plásticos de un solo uso.",
  heroMediaType: "image",
  heroMediaUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=1200&auto=format&fit=crop&q=80",

  stats: {
    beneficiarios: 100,
    beneficiariosLabel: "Participantes en Talleres Prácticos",
    presupuesto: "S/. 30",
    presupuestoLabel: "Presupuesto de Fabricación Accesible",
    reduccionHuella: "60%",
    reduccionHuellaLabel: "Reducción Estimada de Huella de Carbono",
    adopcionPostest: "89%",
    adopcionLabel: "Disposición a Reemplazar Plásticos",
  },

  // Tutorial Section Config
  tutorialBadge: "🧪 Guía Interactiva Paso a Paso",
  tutorialTitle: "Cómo Elaborar Bioplástico Soluble en Casa o Laboratorio",
  tutorialSubtitle: "Fórmula maestra, control de gelatinización térmica y técnicas de moldeado profesional",
  tutorialDescription: "Aprende el procedimiento exacto para producir láminas de bioplástico hidrosolubles y resistentes utilizando ingredientes de cocina accesibles y seguros.",
  tutorialMediaType: "video",
  tutorialMediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  tutorialSteps: [
    {
      id: "tut-step-1",
      stepNumber: 1,
      title: "Medición y Mezclado en Frío",
      description: "En una olla limpia de acero o teflón, incorpora el agua destilada, el almidón vegetal (maicena), la glicerina líquida y la cucharada de vinagre blanco. Agita con batidor manual de 2 a 3 minutos hasta disolver por completo cada grumo de almidón antes de someter a calor.",
      tip: "Una mezcla sin grumos garantiza una superficie cristalina y sin puntos quebradizos.",
      duration: "3 minutos",
      temp: "Temperatura ambiente (~20°C)",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80"
    },
    {
      id: "tut-step-2",
      stepNumber: 2,
      title: "Gelatinización Térmica a Fuego Medio-Bajo",
      description: "Enciende el fuego a nivel medio-bajo revolviendo sin pausa con una espátula de silicona en círculos continuos. A partir del tercer minuto, la mezcla blanca cambiará bruscamente de estado, convirtiéndose en un gel espeso, translúcido y brillante.",
      tip: "No dejes de mover ni un instante para que no se pegue al fondo de la olla.",
      duration: "5 a 7 minutos",
      temp: "80°C - 85°C constante",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop&q=80"
    },
    {
      id: "tut-step-3",
      stepNumber: 3,
      title: "Vaciado y Calibración sobre Molde Antiadherente",
      description: "Retira inmediatamente la olla del fuego. Vierte la masa caliente sobre una bandeja plana cubierta con papel aluminio o silicona antiadherente. Con una regla o espátula niveladora, extiende una capa de grosor regular de entre 0.8 mm y 1.5 mm.",
      tip: "Mantén un espesor homogéneo en toda la lámina para evitar que los bordes sequen más rápido que el centro.",
      duration: "4 minutos",
      temp: "Vaciado en caliente (~75°C)",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&auto=format&fit=crop&q=80"
    },
    {
      id: "tut-step-4",
      stepNumber: 4,
      title: "Curado Ambiental y Despegado",
      description: "Ubica la bandeja en un lugar ventilado, seco y protegido del polvo directo. Permite que el agua se evapore gradualmente durante 24 a 48 horas. Una vez seca y elástica, despega suavemente la lámina de Solviplas desde una esquina.",
      tip: "¡Listo para confeccionar empaques, bolsas o protectores 100% biodegradables e hidrosolubles!",
      duration: "24 a 48 horas",
      temp: "Secado a 20°C - 26°C",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80"
    }
  ],
  tutorialIngredients: [
    { id: "ting-1", name: "Almidón Vegetal (Maicena o Yuca)", amount: "4 cucharadas soperas (40 g)", purpose: "Formador de cadenas poliméricas de amilosa y amilopectina." },
    { id: "ting-2", name: "Glicerina Vegetal Pura", amount: "1 cucharada sopera (15 ml)", purpose: "Plastificante que otorga flexibilidad y previene rigidez quebradiza." },
    { id: "ting-3", name: "Vinagre Blanco Común (Ácido Acético 5%)", amount: "1 cucharada sopera (15 ml)", purpose: "Catalizador de hidrólisis suave que homogeneiza la película." },
    { id: "ting-4", name: "Agua Limpia Purificada", amount: "1 taza (200 ml)", purpose: "Vehículo solvente que hidrata los gránulos de almidón." },
    { id: "ting-5", name: "Papel Aluminio o Bandeja Siliconada", amount: "1 pliego liso", purpose: "Soporte antiadherente para secado y desmolde fácil." }
  ],

  // Products Section Config
  productsBadge: "📦 Catálogo Sostenible",
  productsTitle: "Productos Ecológicos Elaborados con Solviplas",
  productsSubtitle: "Explora aplicaciones reales con formulaciones a medida, tiempos de disolución y recetas específicas",
  productsDescription: "Cada producto cuenta con proporciones químicas adaptadas para cumplir un propósito específico: desde bolsas de comercio resistentes hasta film elástico de cocina y cápsulas hidrosolubles instantáneas.",

  sections: {
    hero: { id: "hero", title: "Inicio", subtitle: "Bienvenida y Presentación", enabled: true, order: 1 },
    tutorial: { id: "tutorial", title: "Tutorial", subtitle: "Cómo Elaborar el Plástico", enabled: true, order: 2 },
    products: { id: "products", title: "Productos", subtitle: "Catálogo y Fórmulas Específicas", enabled: true, order: 3 },
    overview: { id: "overview", title: "El Proyecto", subtitle: "Datos Generales e Identidad", enabled: true, order: 4 },
    problem: { id: "problem", title: "Problemática", subtitle: "Causas, Efectos y Soluciones", enabled: true, order: 5 },
    recipe: { id: "recipe", title: "Fórmula de Laboratorio", subtitle: "Ingredientes y Proceso Clásico", enabled: true, order: 6 },
    timeline: { id: "timeline", title: "Cronograma", subtitle: "Fases y Desarrollo de Acciones", enabled: true, order: 7 },
    results: { id: "results", title: "Impacto & Resultados", subtitle: "Evaluación y Validación Práctica", enabled: true, order: 8 },
    gallery: { id: "gallery", title: "Galería Multimedia", subtitle: "Fotos y Videos del Proceso y Prototipos", enabled: true, order: 9 },
    team: { id: "team", title: "Equipo del Proyecto", subtitle: "Líderes de Investigación y Desarrollo", enabled: true, order: 10 },
    comments: { id: "comments", title: "Comunidad", subtitle: "Preguntas, Comentarios y Experiencias", enabled: true, order: 11 },
  },

  problemText: "La contaminación ambiental se incrementa diariamente debido a la acumulación masiva de residuos sólidos plásticos derivados del petróleo. Envolturas, cubiertas y empaques desechables tardan entre 100 y 500 años en descomponerse, fragmentándose en peligrosos microplásticos.",
  problemSubtext: "Más del 70% del plástico producido a nivel global nunca llega a reciclarse. Frente a la dependencia cotidiana de materiales no biodegradables, Solviplas demuestra que cualquier persona puede elaborar materiales ecológicos, seguros y sostenibles con insumos de cocina.",
  
  solutionText: "Solviplas es un biopolímero hidrosoluble elaborado con almidón vegetal (maicena o harina), glicerina vegetal, vinagre y agua. Al entrar en contacto con agua tibia, se disuelve completamente sin generar residuos tóxicos, reduciendo hasta un 60% la huella de carbono ambiental.",
  
  generalObjective: "Desarrollar e implementar 'Solviplas', un bioplástico soluble en agua como alternativa accesible y ecológica al plástico sintético, reduciendo la generación de residuos no biodegradables y fomentando una cultura de consumo responsable.",

  odsGoals: [
    {
      number: 12,
      title: "Producción y Consumo Responsable",
      description: "Fomentar hábitos sostenibles reemplazando productos plásticos de un solo uso por alternativas ecológicas biodegradables elaboradas con ingredientes naturales."
    },
    {
      number: 13,
      title: "Acción por el Clima",
      description: "Contribuir a la reducción de emisiones contaminantes disminuyendo la dependencia de polímeros sintéticos derivados de combustibles fósiles."
    }
  ],

  recipeIngredients: [
    { id: "ri-1", name: "Almidón vegetal (Maicena / Harina)", amount: "4 cucharadas soperas", purpose: "Polímero base natural que forma la matriz del bioplástico mediante amilosa y amilopectina." },
    { id: "ri-2", name: "Glicerina líquida vegetal", amount: "1 cucharada", purpose: "Agente plastificante que otorga flexibilidad, suavidad y elasticidad para evitar fracturas." },
    { id: "ri-3", name: "Vinagre blanco común", amount: "1 cucharada", purpose: "Catalizador ácido suave que ayuda a polimerizar y homogeneizar la película." },
    { id: "ri-4", name: "Agua limpia", amount: "1 taza (200 ml)", purpose: "Solvente portador que permite la gelatinización térmica del almidón." },
    { id: "ri-5", name: "Papel aluminio", amount: "Láminas lisas", purpose: "Superficie antiadherente para extender y secar las láminas de bioplástico uniformemente." }
  ],

  recipeSteps: [
    {
      stepNumber: 1,
      title: "Mezcla en frío de los ingredientes",
      description: "En una olla limpia, vierte el agua, el almidón vegetal, la glicerina y la cucharada de vinagre. Remueve con una paleta hasta disolver todos los grumos por completo antes de encender el fuego.",
      tip: "Asegúrate de que no queden grumos secos en el fondo para obtener una película transparente y homogénea."
    },
    {
      stepNumber: 2,
      title: "Cocción y gelatinización a fuego medio-bajo",
      description: "Coloca la olla a fuego medio-bajo revolviendo constantemente. En pocos minutos, la mezcla líquida espesará rápidamente hasta tomar un aspecto viscoso, brillante y translúcido.",
      tip: "Remueve continuamente en círculos para evitar que la pasta se pegue a las paredes del recipiente."
    },
    {
      stepNumber: 3,
      title: "Vaciado y nivelado en molde",
      description: "Retira del fuego y vierte la mezcla caliente sobre papel aluminio. Con ayuda de una espátula o paleta lisa, extiende una capa delgada y uniforme de 1 a 2 milímetros de grosor.",
      tip: "Un grosor parejo garantiza un secado sin ondulaciones ni grietas."
    },
    {
      stepNumber: 4,
      title: "Secado ambiental y desmolde",
      description: "Deja reposar la película a temperatura ambiente en un espacio ventilado durante 24 a 48 horas. Una vez seca, desprende suavemente la lámina flexible de Solviplas lista para su uso.",
      tip: "¡Listo! Puedes cortar la lámina con tijeras para crear fundas, cubiertas o protectores ecológicos."
    }
  ],

  adminUsername: "admin",
  adminEmail: "marceloaliaga102@gmail.com",
  adminPasswordHash: "Solviplas2025!"
};

export const INITIAL_TEAM: TeamMember[] = [
  {
    id: "team-0",
    name: "Alessandra Caballero Barrientos",
    role: "Coordinadora General del Proyecto",
    institution: "Equipo de Investigación & Desarrollo",
    description: "Dirección integral de la iniciativa de química verde, formulación de biopolímeros y diseño metodológico de pruebas prácticas.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "team-1",
    name: "Alvaro Porras April Allison",
    role: "Líder de Formulación y Laboratorio",
    institution: "Laboratorio de Biopolímeros",
    description: "Encargada de las proporciones de reactivos naturales, control de gelatinización del almidón y supervisión del curado de láminas.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "team-2",
    name: "Cordova Adanaque Victoria Guadalupe",
    role: "Coordinadora de Talleres Prácticos",
    institution: "Área de Capacitación Ecológica",
    description: "Facilitadora pedagógica en sesiones demostrativas, guiando a los participantes en la preparación paso a paso de bioplásticos.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "team-3",
    name: "Castillo García Jhair",
    role: "Líder de Evaluación y Muestreo",
    institution: "Área de Calidad y Métricas",
    description: "Responsable de la recolección de datos técnicos, encuestas de satisfacción, pruebas de disolución y análisis estadístico.",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "team-4",
    name: "Quispe Herrera Franco Rodrigo",
    role: "Gestión de Recursos y Materiales",
    institution: "Logística y Sostenibilidad",
    description: "Optimización del presupuesto accesible de S/. 30 soles, adquisición de insumos naturales y control de calidad de materias primas.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "team-5",
    name: "Gutiérrez Carrión Mayté",
    role: "Especialista en Química y pH",
    institution: "Laboratorio de Control Ambiental",
    description: "Monitoreo de concentraciones de ácido acético, cinética de solubilidad en agua y estabilidad temporal frente a la humedad.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80"
  }
];

export const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: "act-1",
    objectiveId: 1,
    activityCode: "A.1.1",
    name: "Formulación y Elaboración de Muestras Piloto",
    description: "Ensayos con proporciones variables de maicena, glicerina y vinagre para calibrar elasticidad y velocidad de hidrosolubilidad.",
    months: ["Mayo", "Junio"],
    responsible: "Alessandra Caballero",
    status: "completado"
  },
  {
    id: "act-2",
    objectiveId: 2,
    activityCode: "A.2.1",
    name: "Diseño de la Guía Metodológica y Fichas Técnicas",
    description: "Elaboración de manuales gráficos paso a paso para que cualquier persona replique la fórmula con utensilios domésticos.",
    months: ["Junio"],
    responsible: "Alvaro Porras",
    status: "completado"
  },
  {
    id: "act-3",
    objectiveId: 3,
    activityCode: "A.3.1",
    name: "Talleres Demostrativos y Prácticas Abiertas",
    description: "Sesiones en vivo donde participantes aprenden a gelatinizar y moldear sus propias muestras de bioplástico.",
    months: ["Junio", "Julio"],
    responsible: "Cordova Adanaque",
    status: "completado"
  },
  {
    id: "act-4",
    objectiveId: 4,
    activityCode: "A.4.1",
    name: "Pruebas de Disolución e Impacto Ambiental",
    description: "Validación de biodegradabilidad en agua fría y caliente, registrando tiempos de disolución y resistencia a la tensión.",
    months: ["Julio"],
    responsible: "Castillo García",
    status: "completado"
  },
  {
    id: "act-5",
    objectiveId: 5,
    activityCode: "A.5.1",
    name: "Publicación Abierta y Plan de Replicabilidad Comunitaria",
    description: "Lanzamiento de la plataforma web interactiva y distribución libre de las fórmulas de bioplásticos biodegradables.",
    months: ["Agosto", "Septiembre"],
    responsible: "Quispe Herrera & Gutiérrez",
    status: "en_proceso"
  }
];

export const INITIAL_MEDIA: MediaItem[] = [
  {
    id: "media-1",
    type: "image",
    title: "Prototipo de Lámina Hidrosoluble Solviplas",
    description: "Película translúcida y flexible elaborada a base de fécula de maíz y plastificante vegetal de origen 100% natural.",
    url: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80",
    category: "prototipo",
    uploadedAt: "2025-06-15T10:00:00Z",
    isFeatured: true
  },
  {
    id: "media-2",
    type: "image",
    title: "Taller Práctico de Gelatinización Térmica",
    description: "Demostración en vivo de la transición de estado líquido a gel polimérico a 80°C con supervisión técnica.",
    url: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop&q=80",
    category: "taller",
    uploadedAt: "2025-06-20T11:30:00Z",
    isFeatured: true
  },
  {
    id: "media-3",
    type: "image",
    title: "Prueba de Disolución Rápida en Agua Tibia",
    description: "Lámina sumergida en agua a 55°C descomponiéndose íntegramente en menos de 60 segundos sin restos plásticos.",
    url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80",
    category: "resultados",
    uploadedAt: "2025-06-25T16:00:00Z",
    isFeatured: true
  },
  {
    id: "media-4",
    type: "image",
    title: "Proceso de Nivelado y Curado en Molde",
    description: "Vaciado manual uniforme sobre papel aluminio garantizando un grosor controlado para empaques comerciales.",
    url: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&auto=format&fit=crop&q=80",
    category: "proceso",
    uploadedAt: "2025-07-02T09:15:00Z",
    isFeatured: false
  }
];

export const INITIAL_COMMENTS: Comment[] = [
  {
    id: "comm-1",
    userId: "usr-demo-1",
    userName: "Ing. Sofía Mendoza",
    userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    userRole: "Ingeniería Química Ambiental",
    content: "Excelente iniciativa. El balance de glicerina y almidón es el punto crítico para evitar fragilidad en climas secos. ¿Han probado adicionar una pizca de agar-agar para incrementar la resistencia a la tracción?",
    category: "idea",
    rating: 5,
    likes: 14,
    likedBy: ["usr-admin-master"],
    isPinned: true,
    createdAt: "2025-06-28T14:22:00Z",
    adminReply: "¡Hola Sofía! Efectivamente, el agar-agar genera películas más tenaces. En la fase actual priorizamos ingredientes de supermercado y cocina básica para que sea accesible a todo público, ¡pero ya estamos probando agar-agar en prototipos industriales!"
  },
  {
    id: "comm-2",
    userId: "usr-demo-2",
    userName: "Carlos Ramírez Dávila",
    userAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    userRole: "Comunidad Ecológica",
    content: "Hicimos la prueba en mi taller artesanal y obtuvimos unas láminas resistentes y perfectamente flexibles. ¡Mis clientes quedaron fascinados con que se disuelvan en agua tibia!",
    category: "felicitacion",
    rating: 5,
    likes: 9,
    likedBy: [],
    isPinned: false,
    createdAt: "2025-07-05T09:10:00Z"
  }
];

export const SURVEY_RESULTS = {
  pretestVsPostest: [
    {
      question: "¿Estaría dispuesto a reemplazar bolsas plásticas comunes por bioplásticos solubles en agua?",
      pretest: { correct: 2, label: "2 de 100 tenían disposición previa" },
      postest: { correct: 89, label: "89 de 100 totalmente dispuestos" },
      gain: "+87% incremento neto"
    },
    {
      question: "¿Considera que los bioplásticos artesanales son fáciles de elaborar en un hogar o taller?",
      pretest: { correct: 8, label: "8 de 100 creían que era sencillo" },
      postest: { correct: 92, label: "92 de 100 confirmaron su facilidad" },
      gain: "+84% incremento"
    },
    {
      question: "¿Comprende la diferencia entre biodegradabilidad real e hidrosolubilidad frente al plástico común?",
      pretest: { correct: 14, label: "14 de 100 comprendían el concepto" },
      postest: { correct: 95, label: "95 de 100 entendieron el principio químico" },
      gain: "+81% comprensión"
    },
    {
      question: "¿Recomendaría esta alternativa ecológica a vecinos, comerciantes y familiares?",
      pretest: { correct: 21, label: "21 de 100 mostraron interés inicial" },
      postest: { correct: 96, label: "96 de 100 promotores activos" },
      gain: "+75% promotores"
    }
  ],
  satisfaction: [
    { metric: "Claridad en las instrucciones de elaboración del bioplástico", muySatisfecho: 78, satisfecho: 18, neutral: 3, pocoSatisfecho: 1, nadaSatisfecho: 0 },
    { metric: "Comprobación de hidrosolubilidad real en agua tibia", muySatisfecho: 84, satisfecho: 14, neutral: 1, pocoSatisfecho: 1, nadaSatisfecho: 0 },
    { metric: "Accesibilidad económica de los ingredientes (almidón y glicerina)", muySatisfecho: 88, satisfecho: 10, neutral: 2, pocoSatisfecho: 0, nadaSatisfecho: 0 },
    { metric: "Impacto ecológico positivo frente al plástico convencional", muySatisfecho: 91, satisfecho: 8, neutral: 1, pocoSatisfecho: 0, nadaSatisfecho: 0 },
    { metric: "Utilidad práctica de los productos terminados (bolsas y láminas)", muySatisfecho: 75, satisfecho: 21, neutral: 3, pocoSatisfecho: 1, nadaSatisfecho: 0 }
  ]
};

