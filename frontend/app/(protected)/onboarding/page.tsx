"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { backendUrl } from "@/utils/constants";

type Org = { id: number; name: string; createdAt?: string; updatedAt?: string };

export default function OnboardingPage() {
  const router = useRouter();

  const [orgs, setOrgs] = useState<Org[]>([
    { id: 1, name: "Default Organization" },
  ]); // fallback
  const [organizationId, setOrganizationId] = useState<number | "">("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loadingOrgs, setLoadingOrgs] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Client safety guard: if user already onboarded, redirect away.
  const { data: user } = useSWR(
    "/api/backend/account",
    async (url: string) => {
      const r = await fetch(url, { credentials: "include" });
      if (!r.ok) return null;
      try {
        return await r.json();
      } catch {
        return null;
      }
    },
    { refreshInterval: 0, revalidateOnFocus: false }
  );

  useEffect(() => {
    if (user && user.needsOnboarding === false) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  // Load orgs via Next proxy to avoid CORS: /api/backend/organizations
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/api/backend/organizations", {
          credentials: "include",
        });
        if (r.ok) {
          const list = await r.json();
          if (Array.isArray(list) && list.length) {
            setOrgs(list);
          }
        }
      } catch (err) {
        console.error("Error loading organizations:", err);
      } finally {
        setLoadingOrgs(false);
      }
    })();
  }, []);

  async function submit() {
    try {
      setSaving(true);
      setError(null);
      if (organizationId === "")
        throw new Error("Please choose an organization");

      const resp = await fetch("/api/backend/account/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ organizationId, acceptTerms: true }),
      });

      if (!resp.ok) {
        const txt = await resp.text();
        throw new Error(`Failed (${resp.status}) ${txt || ""}`.trim());
      }

      router.replace("/dashboard");
    } catch (e) {
      setError(e?.message ?? "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-lg rounded-2xl bg-card text-card-foreground p-6 shadow [color-scheme:light]">
        <h1 className="text-xl font-semibold">Finish onboarding</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose your organization to continue.
        </p>

        <div className="mt-5 space-y-4">
          <div>
            <label className="text-sm font-medium">Organization</label>
            <select
              className="mt-1 w-full rounded-lg border border-input bg-background text-foreground px-3 py-2"
              value={organizationId}
              onChange={(e) =>
                setOrganizationId(e.target.value ? Number(e.target.value) : "")
              }
              disabled={loadingOrgs || saving}
            >
              <option value="">{loadingOrgs ? "Loading…" : "Select…"}</option>
              {orgs.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name}
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              disabled={saving}
            />
            I accept the Terms &amp; Privacy Policy.
          </label>

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <a
            className="rounded-lg border border-input px-4 py-2 text-foreground"
            href={`${backendUrl}/logout`}
          >
            Cancel
          </a>
          <button
            className="rounded-lg bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
            disabled={saving || !acceptTerms || organizationId === ""}
            onClick={submit}
          >
            {saving ? "Saving…" : "Finish"}
          </button>
        </div>
      </div>
    </div>
  );
}
