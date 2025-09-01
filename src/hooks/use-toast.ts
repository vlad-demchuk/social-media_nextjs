'use client'

import { toast as sonnerToast } from "sonner"

// Simple wrapper to maintain compatibility
export const useToast = () => {
  return {
    toast: ({
      title,
      description,
      variant = "default",
      ...props
    }: {
      title?: string
      description?: string
      variant?: "default" | "destructive"
      [key: string]: any
    }) => {
      if (variant === "destructive") {
        return sonnerToast.error(title, {
          description,
          ...props
        })
      }

      return sonnerToast(title, {
        description,
        ...props
      })
    }
  }
}

export const toast = useToast().toast
