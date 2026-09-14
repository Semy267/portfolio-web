import { useQuery } from "@tanstack/react-query";
import { Apis } from "./core";
import {
  Profile,
  Project,
  Skill,
  Experience,
  SocialLink,
  PaginatedResponse,
  HomepageData,
  PortfolioTheme,
} from "@/types/portfolio";

export const useGetProfile = () => {
  const { data, isLoading, error } = useQuery<IResponse<Profile>>({
    queryKey: ["public", "profile"],
    queryFn: () => Apis.profile.get(),
  });

  return {
    profile: data?.data || null,
    isLoading,
    error,
  };
};

export const useGetProjects = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  featured?: boolean;
}) => {
  const { data, isLoading, error } = useQuery<
    IResponse<PaginatedResponse<Project>>
  >({
    queryKey: ["public", "projects", params],
    queryFn: () => Apis.projects.list(params),
  });

  return {
    projects: data?.data?.items || [],
    pagination: data?.data
      ? {
          total: data.data.total,
          page: data.data.page,
          limit: data.data.limit,
          totalPages: data.data.totalPages,
        }
      : null,
    isLoading,
    error,
  };
};

export const useGetProjectDetail = (slug: string) => {
  const { data, isLoading, error } = useQuery<IResponse<Project>>({
    queryKey: ["public", "project", slug],
    queryFn: () => Apis.projects.getBySlug(slug),
    enabled: !!slug,
  });

  return {
    project: data?.data || null,
    isLoading,
    error,
  };
};

export const useGetSkills = () => {
  const { data, isLoading, error } = useQuery<IResponse<Skill[]>>({
    queryKey: ["public", "skills"],
    queryFn: () => Apis.skills.list(),
  });

  return {
    skills: data?.data || [],
    isLoading,
    error,
  };
};

export const useGetExperiences = () => {
  const { data, isLoading, error } = useQuery<IResponse<Experience[]>>({
    queryKey: ["public", "experiences"],
    queryFn: () => Apis.experiences.list(),
  });

  return {
    experiences: data?.data || [],
    isLoading,
    error,
  };
};

export const useGetSocialLinks = () => {
  const { data, isLoading, error } = useQuery<IResponse<SocialLink[]>>({
    queryKey: ["public", "social-links"],
    queryFn: () => Apis.socialLinks.list(),
  });

  return {
    socialLinks: data?.data || [],
    isLoading,
    error,
  };
};

export const useGetHomepage = () => {
  const { data, isLoading, error } = useQuery<IResponse<HomepageData>>({
    queryKey: ["public", "homepage"],
    queryFn: () => Apis.homepage.get(),
  });

  return {
    homepageData: data?.data || null,
    isLoading,
    error,
  };
};

export const useGetTheme = () => {
  const { data, isLoading, error } = useQuery<IResponse<PortfolioTheme>>({
    queryKey: ["public", "theme"],
    queryFn: () => Apis.theme.get(),
  });

  return {
    theme: data?.data || null,
    isLoading,
    error,
  };
};

export const fetchThemeSettings = async (): Promise<PortfolioTheme | null> => {
  try {
    const res = await Apis.theme.get();
    return res.data || null;
  } catch {
    return null;
  }
};
