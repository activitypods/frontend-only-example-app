import { authProvider as apAuthProvider, dataProvider as apDataProvider } from "@activitypods/refine-providers";
import { clientId } from "virtual:app-manifest";

/**
 * When set, the login page offers this single Pod provider instead of fetching the public list
 * from https://activitypods.org/data/pod-providers — handy when developing against a local one
 * (see the README's Docker setup, which serves the Pod provider at this exact URL by default).
 */
export const DEFAULT_POD_PROVIDER = import.meta.env.VITE_POD_PROVIDER_URL || "http://localhost:3000";

export const authProvider = apAuthProvider({
  clientId,
  // Already done by the BackgroundChecks component
  appStatusCheckInterval: false,
});

export const dataProvider = apDataProvider({
  authProvider,
  resources: {
    posts: {
      // The "Note" shape tree is one of the shape trees deployed by default on
      // https://shapes.activitypods.org, and is used throughout the ActivityPods documentation.
      shapeTreeUri: "https://shapes.activitypods.org/shapetrees/as/Note",
    },
    profile: {
      // Read-only access (see app-manifest.json): used by the dashboard to
      // display the logged-in user's own profile via the data provider rather than the
      // auth provider's identity shortcut.
      shapeTreeUri: "https://shapes.activitypods.org/shapetrees/as/Profile",
    },
  },
});
