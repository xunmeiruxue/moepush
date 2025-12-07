"use client"

import { Button } from "@/components/ui/button"
import { Github, ShieldCheck } from "lucide-react"
import { signIn } from "next-auth/react"

interface OAuthButtonProps {
    provider: "github" | "oauth"
    text?: string
}

export function OAuthButton({ provider, text }: OAuthButtonProps) {
    const isGitHub = provider === "github"
    const defaultText = isGitHub ? "使用 GitHub 登录" : "使用 OAuth 登录"
    const Icon = isGitHub ? Github : ShieldCheck

    return (
        <Button
            variant="outline"
            className="w-full"
            onClick={() => signIn(provider, { callbackUrl: "/moe" })}
        >
            <Icon className="mr-2 h-4 w-4" />
            {text || defaultText}
        </Button>
    )
}
