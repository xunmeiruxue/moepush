import { getRequestContext } from "@cloudflare/next-on-pages";

export function getEnv(key: string): string | undefined {
    // Try process.env first (for local dev and build time)
    if (process.env[key]) {
        return process.env[key];
    }

    // Try Cloudflare Pages runtime env
    try {
        const env = getRequestContext().env as unknown as Record<string, string | undefined>;
        return env[key];
    } catch {
        // Ignore error if not in Cloudflare context
        return undefined;
    }
}
