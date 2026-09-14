import { configs } from "@/configs";

export const getMediaUrl = (url?: string | null): string => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const baseUrl = (configs.API_BASE || "http://localhost:5000").replace(
    /\/$/,
    "",
  );
  const path = url.startsWith("/") ? url : `/${url}`;
  return `${baseUrl}${path}`;
};
