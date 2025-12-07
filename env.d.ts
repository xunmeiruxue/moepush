/// <reference types="@cloudflare/workers-types" />

declare global {
  interface CloudflareEnv {
    DB: D1Database;
    AUTH_SECRET: string;
    AUTH_GITHUB_ID: string;
    AUTH_GITHUB_SECRET: string;
    DISABLE_REGISTER: string;
    // 通用 OAuth2/OIDC 配置（可选，设置后将使用通用 OAuth 代替 GitHub）
    // 适用于 Authentik、Keycloak、Auth0 等 OIDC 兼容的身份提供商
    AUTH_OAUTH_ID?: string;
    AUTH_OAUTH_SECRET?: string;
    AUTH_OAUTH_ISSUER?: string;
    AUTH_OAUTH_NAME?: string;  // 按钮显示名称，如 "Authentik"、"SSO" 等
  }

  type Env = CloudflareEnv
}

declare module "next-auth" {
  interface User {
    username?: string | null
  }
  interface Session {
    user: User
  }
}

export type { Env }
