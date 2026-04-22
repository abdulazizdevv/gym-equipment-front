/* eslint-disable @next/next/no-img-element -- dynamic backend-hosted images */
"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

type PreviewImageProps = {
  src: string
  alt: string
  caption?: string
  previewEnabled?: boolean
  className?: string
}

export function PreviewImage({
  src,
  alt,
  caption,
  previewEnabled = true,
  className,
}: PreviewImageProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={cn(className, previewEnabled && "cursor-zoom-in")}
        style={{ imageRendering: "-webkit-optimize-contrast" }}
        onClick={previewEnabled ? () => setOpen(true) : undefined}
      />

      {open
        ? createPortal(
            <div
              className="fixed inset-0 z-1000 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs"
              onClick={() => setOpen(false)}
            >
              <div
                className="relative w-full max-w-5xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="absolute top-3 right-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/75"
                  aria-label="Close preview"
                >
                  <X className="h-5 w-5" />
                </button>
                <img
                  src={src}
                  alt={alt}
                  className="max-h-[80vh] w-full rounded-xl object-contain"
                />
                {caption ? (
                  <p className="mt-2 text-center text-sm text-white/85">
                    {caption}
                  </p>
                ) : null}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  )
}
