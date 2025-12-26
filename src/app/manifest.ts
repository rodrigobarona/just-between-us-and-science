import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Just Between Us …and Science: The Women's Health Lab",
    short_name: "JBUS Podcast",
    description:
      "Join Dr. Patrícia Mota, PT, PhD, as she takes you behind the scenes of women's health — from the latest research to everyday experiences.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#007a7a",
    orientation: "portrait-primary",
    categories: ["health", "science", "education", "podcast"],
    icons: [
      {
        src: "/FAVICON.png",
        sizes: "any",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
