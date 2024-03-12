import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Metadata } from 'next'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  if (typeof window !== 'undefined') return path
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL}${path}`
  return `http://localhost:${process.env.PORT ?? 3000}${path}`
    // we need to return absolute URLs in server components
}

export function constructMetadata({
  title = "Quill - the SaaS for students",
  description = "Quill is an open-source software to make chatting to your PDF files easy.",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
  noIndex = false
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@thequantumcoder"
    },
    icons,
    metadataBase: new URL('https://quill-six-mocha.vercel.app'),
  }
}