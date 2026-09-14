import { Http } from "@/configs/http/http-method";
import {
  Profile,
  Project,
  Skill,
  Experience,
  SocialLink,
  PaginatedResponse,
  HomepageData,
} from "@/types/portfolio";

export const Apis = {
  auth: {
    login: (payload: any) =>
      Http.post<{ access_token: string; user: any }>(
        "/api/auth/login",
        payload,
      ),
    guestLogin: () =>
      Http.post<{ access_token: string; user: any }>("/api/auth/guest", {}),
    me: () => Http.get<any>("/api/auth/me"),
  },

  profile: {
    get: () => Http.get<IResponse<Profile>>("/api/v1/profile"),
  },

  projects: {
    list: (params?: {
      page?: number;
      limit?: number;
      search?: string;
      category?: string;
      featured?: boolean;
    }) =>
      Http.get<IResponse<PaginatedResponse<Project>>>(
        "/api/v1/projects",
        params,
      ),
    getBySlug: (slug: string) =>
      Http.get<IResponse<Project>>(`/api/v1/projects/${slug}`),
  },

  skills: {
    list: () => Http.get<IResponse<Skill[]>>("/api/v1/skills"),
  },

  experiences: {
    list: () => Http.get<IResponse<Experience[]>>("/api/v1/experiences"),
  },

  socialLinks: {
    list: () => Http.get<IResponse<SocialLink[]>>("/api/v1/social-links"),
  },

  homepage: {
    get: () => Http.get<IResponse<HomepageData>>("/api/v1/homepage"),
  },

  todos: {
    list: () => Http.get<any[]>("/api/todos"),
    get: (id: string) => Http.get<any>(`/api/todos/${id}`),
    create: (data: any) => Http.post<any>("/api/todos", data),
    update: (id: string, data: any) => Http.put<any>(`/api/todos/${id}`, data),
    delete: (id: string) => Http.delete(`/api/todos/${id}`),
  },
};
