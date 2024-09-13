// src/sitemap.js
import React from "react";
import { Route, Routes } from "react-router-dom";

const pages = [
  { route: "/", changefreq: "daily", priority: 1.0 },
  { route: "/services", changefreq: "weekly", priority: 0.8 },
  { route: "/services/:id", changefreq: "weekly", priority: 0.8 },
  { route: "/blog", changefreq: "monthly", priority: 0.7 },
  { route: "/blog/:id", changefreq: "monthly", priority: 0.7 },
  { route: "/example", changefreq: "monthly", priority: 0.7 },
  { route: "/reviews", changefreq: "monthly", priority: 0.7 },
  { route: "/calculator", changefreq: "monthly", priority: 0.7 },
  { route: "/admin", changefreq: "monthly", priority: 0.7 },
  { route: "/addclient", changefreq: "monthly", priority: 0.7 },
  { route: "/client", changefreq: "monthly", priority: 0.7 },
  { route: "/addshippers", changefreq: "monthly", priority: 0.7 },
  { route: "/editshippers/:id", changefreq: "monthly", priority: 0.7 },
  { route: "/editconsignees/:id", changefreq: "monthly", priority: 0.7 },
  { route: "/shippers", changefreq: "monthly", priority: 0.7 },
  { route: "/addconsignees", changefreq: "monthly", priority: 0.7 },
  { route: "/consignees", changefreq: "monthly", priority: 0.7 },
  { route: "/adddispatch", changefreq: "monthly", priority: 0.7 },
  { route: "/dispatch", changefreq: "monthly", priority: 0.7 },
  { route: "/message", changefreq: "monthly", priority: 0.7 },
  { route: "/chat", changefreq: "monthly", priority: 0.7 },
  { route: "/wallet", changefreq: "monthly", priority: 0.7 },
  { route: "/rates", changefreq: "monthly", priority: 0.7 },
  { route: "/way", changefreq: "monthly", priority: 0.7 },
  { route: "/admin-login", changefreq: "monthly", priority: 0.7 },
  { route: "/user-home", changefreq: "monthly", priority: 0.7 },
  { route: "/user-about/:id", changefreq: "monthly", priority: 0.7 },
  { route: "/user-profile", changefreq: "monthly", priority: 0.7 },
  { route: "/user-message", changefreq: "monthly", priority: 0.7 },
  { route: "/user-chat", changefreq: "monthly", priority: 0.7 },
  { route: "/add-service", changefreq: "monthly", priority: 0.7 },
  { route: "/add-blog", changefreq: "monthly", priority: 0.7 },
];

const generateSitemap = () => {
  const currentDate = new Date().toISOString();
  
  const xmlEntries = pages
    .map((page) => {
      return `
        <url>
          <loc>${window.location.origin}${page.route}</loc>
          <lastmod>${currentDate}</lastmod>
          <changefreq>${page.changefreq}</changefreq>
          <priority>${page.priority}</priority>
        </url>
      `;
    })
    .join("");

  return `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${xmlEntries}
    </urlset>
  `;
};

const Sitemap = () => {
  return <SitemapContent />;
};

const SitemapContent = () => {
  const xmlString = generateSitemap();
  return (
    <div>
      <pre>
        {xmlString}
      </pre>
    </div>
  );
};

export default Sitemap;
