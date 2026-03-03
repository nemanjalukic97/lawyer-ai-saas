'use client'

import { useEffect, useState } from "react"

export function SignupSuccessToast() {
  const [visible, setVisible] = useState(true)
  const [fadingOut, setFadingOut] = useState(false)

  useEffect(() => {
    if (!visible) return

    const hideTimeout = setTimeout(() => {
      setFadingOut(true)
      const removeTimeout = setTimeout(() => {
        setVisible(false)
      }, 500)

      return () => clearTimeout(removeTimeout)
    }, 8000)

    return () => clearTimeout(hideTimeout)
  }, [visible])

  if (!visible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm">
      <div
        className={`rounded-xl border border-border bg-card text-card-foreground shadow-lg border-l-4 border-emerald-500 p-4 flex gap-3 items-start transition-opacity duration-500 ${
          fadingOut ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600/10 text-emerald-600 text-base font-semibold">
          ✔
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-sm font-semibold leading-none">
              You&apos;re almost there!
            </h2>
            <button
              type="button"
              onClick={() => {
                setFadingOut(true)
                setTimeout(() => setVisible(false), 500)
              }}
              className="text-xs text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <p className="text-sm text-muted-foreground">
            Your account has been created. Please check your inbox and confirm your
            email to activate your account.
          </p>
        </div>
      </div>
    </div>
  )
}

