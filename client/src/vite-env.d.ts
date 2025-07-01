/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // Add more custom env variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}