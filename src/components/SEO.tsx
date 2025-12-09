import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  type?: "website" | "article";
  image?: string;
  article?: {
    author?: string;
    publishedDate?: string;
  };
}

export const SEO = ({
  title = "brainOS - Personal Knowledge Base",
  description = "A personal knowledge base for organizing projects, ideas, journal entries, and professional achievements.",
  type = "website",
  image = "/og-image.png",
  article,
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    updateMeta("description", description);
    updateMeta("og:title", title, true);
    updateMeta("og:description", description, true);
    updateMeta("og:type", type, true);
    updateMeta("og:image", image, true);
    updateMeta("twitter:title", title);
    updateMeta("twitter:description", description);
    updateMeta("twitter:image", image);

    // Add Article structured data if article info provided
    if (type === "article" && article) {
      const existingScript = document.querySelector('script[data-seo="article"]');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo", "article");
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        author: {
          "@type": "Person",
          name: article.author || "brainOS",
        },
        datePublished: article.publishedDate,
        image: image,
      });
      document.head.appendChild(script);

      return () => {
        script.remove();
      };
    }
  }, [title, description, type, image, article]);

  return null;
};
