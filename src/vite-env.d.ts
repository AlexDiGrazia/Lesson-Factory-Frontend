/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLOUDFRONT_DISTRIBUTION: string;
  // Add other environment variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
