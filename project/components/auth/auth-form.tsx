'use client'

import { useRouter } from 'next/navigation'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { cn } from "@/lib/utils"

interface AuthFormProps {
  className?: string
  isSignIn?: boolean
}

export function AuthForm({ className, isSignIn = true }: AuthFormProps) {
  const router = useRouter()
  const supabase = createClientComponentClient()

  return (
    <div className={cn("flex flex-col space-y-4 w-full max-w-md", className)}>
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {isSignIn ? "Sign into your account" : "Create your account"}
        </h1>
      </div>
      <Auth
        supabaseClient={supabase}
        view={isSignIn ? 'sign_in' : 'sign_up'}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: 'hsl(var(--primary))',
                brandAccent: 'hsl(var(--primary))',
                brandButtonText: 'hsl(var(--primary-foreground))',
                defaultButtonBackground: 'hsl(var(--secondary))',
                defaultButtonBackgroundHover: 'hsl(var(--secondary))',
                defaultButtonBorder: 'hsl(var(--border))',
                defaultButtonText: 'hsl(var(--foreground))',
                dividerBackground: 'hsl(var(--border))',
                inputBackground: 'transparent',
                inputBorder: 'hsl(var(--border))',
                inputBorderHover: 'hsl(var(--ring))',
                inputBorderFocus: 'hsl(var(--ring))',
                inputText: 'hsl(var(--foreground))',
                inputLabelText: 'hsl(var(--muted-foreground))',
                inputPlaceholder: 'hsl(var(--muted-foreground))',
              },
              borderWidths: {
                buttonBorderWidth: '1px',
                inputBorderWidth: '1px',
              },
              borderRadius: {
                button: 'var(--radius)',
                input: 'var(--radius)',
              },
              fontSizes: {
                baseBodySize: '14px',
                baseInputSize: '14px',
                baseLabelSize: '14px',
                baseButtonSize: '14px',
              },
            }
          },
          className: {
            button: 'font-medium',
            label: 'font-medium',
            input: 'bg-background',
          }
        }}
        localization={{
          variables: {
            sign_in: {
              email_label: 'Email',
              password_label: 'Password',
              button_label: 'Sign in',
              loading_button_label: 'Signing in...',
              social_provider_text: 'Sign in with {{provider}}',
              link_text: "Don't have an account? Sign up",
            },
            sign_up: {
              email_label: 'Email',
              password_label: 'Password',
              button_label: 'Sign up',
              loading_button_label: 'Signing up...',
              social_provider_text: 'Sign up with {{provider}}',
              link_text: 'Already have an account? Sign in',
            },
          },
        }}
        theme="dark"
        providers={['github']}
        redirectTo={`${window.location.origin}/auth/callback`}
      />
    </div>
  )
}