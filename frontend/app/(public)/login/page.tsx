"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

// Session expiry messages in English and Estonian
const SESSION_EXPIRY_MESSAGES = {
  en: "Your session has expired. Please log in again.",
  et: "Sessioon on aegunud. Palun logi uuesti sisse.",
} as const;

function LoginContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showExpiredMessage, setShowExpiredMessage] = useState(false);
  const [language, setLanguage] = useState<"en" | "et">("en");

  // For OAuth, browser needs PUBLIC backend URL, not Docker internal URL
  const publicBackendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

  useEffect(() => {
    // Check if session expired query parameter is present
    const expired = searchParams.get("expired");

    if (expired === "true") {
      setShowExpiredMessage(true);

      // Detect browser language preference (fallback to English)
      const browserLang = navigator.language.toLowerCase();
      setLanguage(browserLang.startsWith("et") ? "et" : "en");

      // Clear the query parameter from URL without page reload
      try {
        router.replace("/login", { scroll: false });
      } catch (error) {
        console.error("Failed to clear query parameter:", error);
      }

      // Auto-hide message after 10 seconds
      const timer = setTimeout(() => {
        setShowExpiredMessage(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [searchParams, router]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center content-center gap-4 px-4">
      {/* Session Expiry Alert */}
      {showExpiredMessage && (
        <Alert variant="warning" className="max-w-md mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {SESSION_EXPIRY_MESSAGES[language]}
          </AlertDescription>
        </Alert>
      )}

      <h1 className="text-2xl font-bold text-center">Login</h1>
      <a href={`${publicBackendUrl}/oauth2/authorization/google`}>
        <button
          type="button"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Login with Google
        </button>
      </a>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginContent />
    </Suspense>
  );
}

function LoginFallback() {
  const publicBackendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

  return (
    <div className="flex flex-col min-h-screen items-center justify-center content-center gap-4 px-4">
      <h1 className="text-2xl font-bold text-center">Login</h1>
      <a href={`${publicBackendUrl}/oauth2/authorization/google`}>
        <button
          type="button"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Login with Google
        </button>
      </a>
    </div>
  );
}
