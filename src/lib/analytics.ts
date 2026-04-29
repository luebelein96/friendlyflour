import { initializeApp, type FirebaseApp } from "firebase/app";
import {
  getAnalytics,
  isSupported,
  logEvent,
  type Analytics,
} from "firebase/analytics";

type AnalyticsEventParams = Record<string, unknown>;

let app: FirebaseApp | null = null;
let analyticsPromise: Promise<Analytics | null> | null = null;

function enabled(): boolean {
  if (process.env.NODE_ENV !== "production") return false;
  if (process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== "true") return false;
  if (!process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID) return false;
  return true;
}

function getFirebaseApp(): FirebaseApp {
  if (app) return app;

  app = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  });

  return app;
}

async function getAnalyticsInstance(): Promise<Analytics | null> {
  if (!enabled()) return null;
  if (typeof window === "undefined") return null;

  if (!analyticsPromise) {
    analyticsPromise = (async () => {
      const ok = await isSupported();
      if (!ok) return null;
      return getAnalytics(getFirebaseApp());
    })();
  }

  return analyticsPromise;
}

export async function track(eventName: string, params?: AnalyticsEventParams) {
  const analytics = await getAnalyticsInstance();
  if (!analytics) return;
  logEvent(analytics, eventName, params);
}

export async function trackPageView(opts: {
  page_path: string;
  page_location?: string;
  page_title?: string;
}) {
  await track("page_view", opts);
}

