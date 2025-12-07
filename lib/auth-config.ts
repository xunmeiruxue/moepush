// OAuth 提供商配置（服务端）
// 根据环境变量决定使用通用 OAuth 还是 GitHub

export const useGenericOAuth = !!(
    process.env.AUTH_OAUTH_ID &&
    process.env.AUTH_OAUTH_SECRET &&
    process.env.AUTH_OAUTH_ISSUER
);

// 使用通用名称 "oauth" 代替 "authentik"
// 回调 URL: /api/auth/callback/oauth
export const oauthProvider: "oauth" | "github" = useGenericOAuth ? "oauth" : "github";

// OAuth 提供商显示名称（可通过 AUTH_OAUTH_NAME 自定义）
export const oauthProviderName = process.env.AUTH_OAUTH_NAME || "OAuth";
