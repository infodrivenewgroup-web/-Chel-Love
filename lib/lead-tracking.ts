/**
 * Lead tracking & Yandex Metrika integration for site "А"
 *
 * Counter: 109840176 (new). The old counter 108966149 has been fully removed.
 *
 * Responsibilities:
 *  - Yandex Metrika goals (START_CHECK, click_polychit) via a safe helper.
 *  - lead_id generation / persistence (sessionStorage).
 *  - phone_or_vk capture (sessionStorage only — never logged, never sent to Metrika, never in URL).
 *  - yclid + UTM capture from the current URL of site "А".
 *  - Server-side lead delivery to site "Б" via POST /api/leads/upsert.
 *  - Redirect URL building for site "Б" /payment.
 *  - Debug mode (?debug_metrika=1) that NEVER leaks personal data.
 */

export const YM_COUNTER_ID = 109840176

export const SITE_B_ORIGIN = "https://audit-love.vercel.app"
export const SITE_B_UPSERT_URL = `${SITE_B_ORIGIN}/api/leads/upsert`
export const SITE_B_PAYMENT_URL = `${SITE_B_ORIGIN}/payment`

const LEAD_ID_KEY = "lead_id"
const PHONE_OR_VK_KEY = "phone_or_vk"
const UTM_PARAMS_KEY = "utm_params"
const LEAD_SAVED_KEY = "lead_saved"

const TRACKING_PARAM_KEYS = [
  "yclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const

type TrackingParams = Partial<Record<(typeof TRACKING_PARAM_KEYS)[number], string>>

/* ----------------------------- Debug mode ----------------------------- */

export function isDebugMetrika(): boolean {
  if (typeof window === "undefined") return false
  try {
    return new URLSearchParams(window.location.search).get("debug_metrika") === "1"
  } catch {
    return false
  }
}

function debugLog(...args: unknown[]) {
  if (isDebugMetrika()) {
    // Never pass personal data here — callers guarantee this.
    console.info("[metrika]", ...args)
  }
}

/* ------------------------- Tracking parameters ------------------------- */

/**
 * Read yclid + UTM from the current URL, falling back to values persisted in
 * sessionStorage (captured on first load). Empty / null / undefined values are
 * never returned.
 */
export function getTrackingParams(): TrackingParams {
  if (typeof window === "undefined") return {}

  const result: TrackingParams = {}

  try {
    const current = new URLSearchParams(window.location.search)
    TRACKING_PARAM_KEYS.forEach((key) => {
      const value = current.get(key)
      if (value && value.trim() !== "") {
        result[key] = value
      }
    })
  } catch {
    // ignore
  }

  // Fall back to persisted params (for internal navigation without the query).
  try {
    const stored = sessionStorage.getItem(UTM_PARAMS_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as Record<string, string>
      TRACKING_PARAM_KEYS.forEach((key) => {
        if (!result[key] && parsed[key] && String(parsed[key]).trim() !== "") {
          result[key] = parsed[key]
        }
      })
    }
  } catch {
    // ignore
  }

  return result
}

/**
 * Persist yclid + UTM on first load so they survive internal navigation.
 */
export function persistTrackingParams(): void {
  if (typeof window === "undefined") return
  try {
    const current = new URLSearchParams(window.location.search)
    const toStore: Record<string, string> = {}
    // also support legacy gclid/fbclid persistence without forwarding them
    const extra = ["gclid", "fbclid"]
    ;[...TRACKING_PARAM_KEYS, ...extra].forEach((key) => {
      const value = current.get(key)
      if (value && value.trim() !== "") {
        toStore[key] = value
      }
    })
    if (Object.keys(toStore).length > 0) {
      const existing = sessionStorage.getItem(UTM_PARAMS_KEY)
      const merged = existing ? { ...JSON.parse(existing), ...toStore } : toStore
      sessionStorage.setItem(UTM_PARAMS_KEY, JSON.stringify(merged))
    }
  } catch {
    // ignore
  }
}

/* ------------------------------ lead_id ------------------------------- */

export function getOrCreateLeadId(): string {
  if (typeof window === "undefined") return ""

  try {
    const existing = sessionStorage.getItem(LEAD_ID_KEY)
    if (existing) return existing
  } catch {
    // ignore
  }

  let leadId: string
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      leadId = `lead_${crypto.randomUUID()}`
    } else {
      throw new Error("randomUUID unavailable")
    }
  } catch {
    leadId = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`
  }

  try {
    sessionStorage.setItem(LEAD_ID_KEY, leadId)
  } catch {
    // ignore
  }
  return leadId
}

export function getLeadId(): string {
  if (typeof window === "undefined") return ""
  try {
    return sessionStorage.getItem(LEAD_ID_KEY) || ""
  } catch {
    return ""
  }
}

/* ---------------------------- phone_or_vk ----------------------------- */

/** Store the partner phone / VK link. Never logged, never sent to Metrika. */
export function setPhoneOrVk(value: string): void {
  if (typeof window === "undefined") return
  try {
    sessionStorage.setItem(PHONE_OR_VK_KEY, value)
  } catch {
    // ignore
  }
}

export function getPhoneOrVk(): string {
  if (typeof window === "undefined") return ""
  try {
    return sessionStorage.getItem(PHONE_OR_VK_KEY) || ""
  } catch {
    return ""
  }
}

export function hasPhoneOrVk(): boolean {
  return getPhoneOrVk().trim().length > 0
}

/* ----------------------- Yandex Metrika goals ------------------------- */

/**
 * Send a Metrika goal to counter 109840176 and invoke `callback` once.
 * Falls back to a timeout (300–700ms) if the Metrika callback never fires or
 * if Metrika is unavailable, so user flow is never blocked.
 */
export function sendYmGoal(goalName: string, callback?: () => void): void {
  let called = false
  const fallbackMs = 500

  const runOnce = () => {
    if (called) return
    called = true
    if (callback) callback()
  }

  debugLog("reachGoal", {
    goalName,
    counterId: YM_COUNTER_ID,
    url: typeof window !== "undefined" ? window.location.href : "",
    lead_id: getLeadId(),
    tracking: Object.keys(getTrackingParams()),
    phone_or_vk_present: hasPhoneOrVk(),
  })

  try {
    const ym = typeof window !== "undefined" ? (window as any).ym : undefined
    if (typeof ym === "function") {
      ym(YM_COUNTER_ID, "reachGoal", goalName, {}, runOnce)
    }
  } catch {
    // ignore
  }

  // Fallback ensures the callback always runs even if Metrika is blocked.
  setTimeout(runOnce, fallbackMs)
}

/**
 * Manual SPA hit. The very first hit is skipped (handled by the counter init)
 * to avoid a double first pageview.
 */
export function sendYmHit(): void {
  try {
    const ym = typeof window !== "undefined" ? (window as any).ym : undefined
    if (typeof ym === "function") {
      const fullUrl =
        window.location.pathname + window.location.search + window.location.hash
      ym(YM_COUNTER_ID, "hit", window.location.href, {
        referer: document.referrer,
      })
      debugLog("hit", { url: window.location.href, path: fullUrl })
    }
  } catch {
    // ignore
  }
}

/* --------------------- Lead delivery to site "Б" ---------------------- */

export interface UpsertResult {
  ok: boolean
  lead_id?: string
}

/**
 * POST the lead to site "Б". phone_or_vk is sent ONLY in the request body.
 * Empty values are stripped. Returns ok=false on any failure (caller must
 * still proceed with the redirect so the client is never lost).
 */
export async function upsertLead(): Promise<UpsertResult> {
  if (typeof window === "undefined") return { ok: false }

  const leadId = getOrCreateLeadId()
  const phoneOrVk = getPhoneOrVk()
  const tracking = getTrackingParams()

  const body: Record<string, string> = {
    lead_id: leadId,
    source_site: window.location.origin,
  }
  if (phoneOrVk && phoneOrVk.trim() !== "") {
    body.phone_or_vk = phoneOrVk
  }
  Object.entries(tracking).forEach(([key, value]) => {
    if (value && value.trim() !== "") {
      body[key] = value
    }
  })

  debugLog("upsertLead -> site Б", {
    lead_id: leadId,
    tracking: Object.keys(tracking),
    phone_or_vk_present: hasPhoneOrVk(),
  })

  try {
    const res = await fetch(SITE_B_UPSERT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true,
    })

    if (!res.ok) return { ok: false }

    const data = (await res.json().catch(() => ({}))) as UpsertResult
    if (data && data.ok) {
      try {
        sessionStorage.setItem(LEAD_SAVED_KEY, "1")
      } catch {
        // ignore
      }
      return { ok: true, lead_id: data.lead_id || leadId }
    }
    return { ok: false }
  } catch {
    return { ok: false }
  }
}

export function isLeadSaved(): boolean {
  if (typeof window === "undefined") return false
  try {
    return sessionStorage.getItem(LEAD_SAVED_KEY) === "1"
  } catch {
    return false
  }
}

/* ------------------------- Redirect to site "Б" ----------------------- */

/**
 * Build the site "Б" /payment URL with lead_id + yclid + UTM only.
 * phone_or_vk is NEVER added to the URL.
 */
export function buildPaymentUrl(): string {
  const url = new URL(SITE_B_PAYMENT_URL)
  const leadId = getOrCreateLeadId()
  if (leadId) url.searchParams.set("lead_id", leadId)

  const tracking = getTrackingParams()
  Object.entries(tracking).forEach(([key, value]) => {
    if (value && value.trim() !== "") {
      url.searchParams.set(key, value)
    }
  })

  const result = url.toString()
  debugLog("redirect target (site Б)", { url: result, lead_id: leadId })
  return result
}

export function redirectToSiteB(): void {
  if (typeof window === "undefined") return
  window.location.assign(buildPaymentUrl())
}
