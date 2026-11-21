import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bhavya Wade — Software Engineer / Full-Stack Developer",
    short_name: "Bhavya Wade",
    description:
      "Practical web products with React, Next.js, TypeScript and AI — from Mumbai to the internet.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0b0a0f",
    theme_color: "#0b0a0f",
    lang: "en",
    categories: ["portfolio", "technology", "engineering"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
