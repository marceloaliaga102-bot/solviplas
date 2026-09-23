export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student' | 'teacher' | 'parent' | 'community';
  avatar: string;
  institution?: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userRole: string;
  content: string;
  category: 'opinion' | 'pregunta' | 'felicitacion' | 'idea';
  rating: number; // 1 - 5
  likes: number;
  likedBy: string[];
  isPinned?: boolean;
  createdAt: string;
  adminReply?: string;
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  title: string;
  description: string;
  url: string; // Base64 or URL
  thumbnailUrl?: string;
  category: 'taller' | 'proceso' | 'prototipo' | 'resultados' | 'documental';
  uploadedAt: string;
  isFeatured?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  institution: string;
  description: string;
  avatar: string;
}

export interface ActivityItem {
  id: string;
  objectiveId: number;
  activityCode: string;
  name: string;
  description: string;
  months: string[];
  responsible: string;
  status: 'completado' | 'en_proceso' | 'planificado';
}

export interface SectionConfig {
  id: string;
  title: string;
  subtitle: string;
  enabled: boolean;
  order: number;
}

export interface TutorialStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  tip: string;
  duration: string;
  temp: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
}

export interface RecipeIngredient {
  id: string;
  name: string;
  amount: string;
  purpose: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  badge: string;
  shortDescription: string;
  description: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  dissolutionTime: string;
  thickness: string;
  usage: string;
  ingredients: {
    id: string;
    name: string;
    amount: string;
    purpose: string;
  }[];
  steps: {
    id: string;
    stepNumber: number;
    title: string;
    description: string;
    tip?: string;
  }[];
}

export interface CustomSection {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  content: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  order: number;
  layout?: 'split' | 'cards' | 'banner';
  highlights?: {
    id: string;
    title: string;
    description: string;
  }[];
}

export interface SiteConfig {
  // General Info
  siteName: string;
  tagline: string;
  organization: string;
  subOrganization: string;
  institutionTarget: string;
  location: string;
  year: string;
  
  // Hero Section
  heroBadge: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  heroMediaType?: 'image' | 'video';
  heroMediaUrl?: string;

  // Key Statistics
  stats: {
    beneficiarios: number;
    beneficiariosLabel: string;
    presupuesto: string;
    presupuestoLabel: string;
    reduccionHuella: string;
    reduccionHuellaLabel: string;
    adopcionPostest: string;
    adopcionLabel: string;
  };

  // Tutorial Section Config
  tutorialBadge: string;
  tutorialTitle: string;
  tutorialSubtitle: string;
  tutorialDescription: string;
  tutorialMediaType: 'image' | 'video';
  tutorialMediaUrl: string;
  tutorialSteps: TutorialStep[];
  tutorialIngredients: RecipeIngredient[];

  // Products Section Config
  productsBadge: string;
  productsTitle: string;
  productsSubtitle: string;
  productsDescription: string;

  // Sections config
  sections: Record<string, SectionConfig>;

  // Project texts
  problemText: string;
  problemSubtext: string;
  solutionText: string;
  generalObjective: string;
  odsGoals: {
    number: number;
    title: string;
    description: string;
  }[];

  // Recipe and materials (General lab)
  recipeIngredients: RecipeIngredient[];
  recipeSteps: {
    stepNumber: number;
    title: string;
    description: string;
    tip: string;
  }[];

  // Admin Credentials Config
  adminUsername: string;
  adminEmail: string;
  adminPasswordHash: string;
}
