export interface Profile {
  id: string;
  name: string;
  headline: string;
  bio: string;
  profileImageId?: string | null;
  email: string;
  location?: string | null;
  updatedAt?: string;
}

export interface Technology {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
  category: string;
  sortOrder: number;
}

export interface ProjectTechnology {
  projectId: string;
  technologyId: string;
  sortOrder: number;
  technology: Technology;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  content?: string | null;
  category: string;
  year: number;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  featured: boolean;
  sortOrder: number;
  thumbnailId?: string | null;
  thumbnail?: Media | null;
  githubUrl?: string | null;
  demoUrl?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
  technologies?: ProjectTechnology[];
}

export interface Media {
  id: string;
  filename: string;
  url: string;
  altText?: string | null;
  mimeType: string;
  size: number;
  width?: number | null;
  height?: number | null;
  createdAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  icon?: string | null;
  sortOrder: number;
  visible: boolean;
}

export interface Experience {
  id: string;
  title: string;
  organization: string;
  description: string;
  startDate: string;
  endDate?: string | null;
  sortOrder: number;
  visible: boolean;
}

export interface SocialLink {
  id: string;
  platform: string;
  label: string;
  url: string;
  icon?: string | null;
  sortOrder: number;
  visible: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface HomepageData {
  profile: Profile;
  featuredProjects: Project[];
  skills: Skill[];
  experiences: Experience[];
  socialLinks: SocialLink[];
}

export interface PortfolioTheme {
  id: string;
  primaryColor?: string | null;
  secondaryColor?: string | null;
  backgroundColor?: string | null;
  surfaceColor?: string | null;
  textColor?: string | null;
  borderColor?: string | null;
  borderWidth?: string | null;
  shadowX?: string | null;
  shadowY?: string | null;
  borderRadius?: string | null;
}

export interface SiteSettings {
  id: string;
  siteName?: string | null;
  siteDescription?: string | null;
  faviconMediaId?: string | null;
  faviconUrl?: string | null;
  ogImageMediaId?: string | null;
  ogImageUrl?: string | null;
  contactEmail?: string | null;
  updatedAt?: string;
}
