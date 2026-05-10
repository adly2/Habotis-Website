import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { env } from "../lib/env";

function getApp() {
  if (getApps().length > 0) return getApps()[0];
  return initializeApp({
    credential: cert({
      projectId: env.firebase.projectId,
      clientEmail: env.firebase.clientEmail,
      // Railway/hosting dashboards store \n as literal \\n — normalize it
      privateKey: env.firebase.privateKey.replace(/\\n/g, "\n"),
    }),
  });
}

let db: ReturnType<typeof getFirestore> | null = null;

export function getDb() {
  if (!db) {
    getApp();
    db = getFirestore();
    db.settings({ preferRest: true });
  }
  return db;
}
