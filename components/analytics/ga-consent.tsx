'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

const CONSENT_KEY = 'hydocs_ga_consent';

interface GAConsentProps {
  measurementId: string;
  enabled: boolean;
}

export function GAConsent({ measurementId, enabled }: GAConsentProps) {
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const stored = window.localStorage.getItem(CONSENT_KEY);
    if (stored === 'accepted') {
      setConsent(true);
      return;
    }
    if (stored === 'declined') {
      setConsent(false);
      return;
    }
    setConsent(null);
  }, [enabled]);

  if (!enabled || !measurementId) {
    return null;
  }

  return (
    <>
      {consent === true && (
        <>
          <Script async src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} />
          <Script id="ga-init">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);} 
gtag('js', new Date());
gtag('config', '${measurementId}');`}
          </Script>
        </>
      )}

      {consent === null && (
        <div className="fixed bottom-4 left-4 right-4 z-50 max-w-xl rounded-lg border bg-background/95 p-4 shadow-lg backdrop-blur">
          <p className="text-sm text-foreground">
            We use cookies to measure documentation usage and improve the experience.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <button
              className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
              onClick={() => {
                window.localStorage.setItem(CONSENT_KEY, 'accepted');
                setConsent(true);
              }}
              type="button"
            >
              Accept
            </button>
            <button
              className="rounded-md border px-3 py-1.5 text-sm font-medium"
              onClick={() => {
                window.localStorage.setItem(CONSENT_KEY, 'declined');
                setConsent(false);
              }}
              type="button"
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}
