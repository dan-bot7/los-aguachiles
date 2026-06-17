import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const githubPagesRepo = process.env.GITHUB_PAGES_REPO ?? "los-aguachiles";
const githubPagesBasePath = isGithubPages ? `/${githubPagesRepo}` : "";

const nextConfig: NextConfig = {
  ...(isGithubPages
    ? {
        output: "export" as const,
        trailingSlash: true,
        basePath: githubPagesBasePath,
        assetPrefix: `${githubPagesBasePath}/`,
        images: {
          unoptimized: true
        }
      }
    : {}),
  transpilePackages: ["@los-aguachiles/shared"]
};

export default nextConfig;
