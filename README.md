# RankPeek --- Free SEO Analyzer

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)]()
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)]()


RankPeek is a fast, no-login SEO analysis tool that lets you analyze any
webpage and instantly get a full SEO health report.

Built as a fullstack SaaS-style project using **Next.js, TypeScript, and
a custom SEO scoring engine**.

------------------------------------------------------------------------

## ✨ Features

-   🔍 Analyze any public URL
-   📊 SEO Score (0--100)
-   🏆 SEO Grade (A--F)
-   ⚠️ Issues detection system
-   ⚡ Warnings & improvements
-   ✅ Good SEO signals
-   🧠 Structured SEO insights engine
-   📄 Content analysis (title, meta description, headings)
-   🧱 Heading structure validation (H1, H2, H3)
-   ⚙️ Technical SEO checks (Open Graph, canonical, lang)
-   🖼️ Image analysis (alt text coverage)
-   🔗 Link analysis (internal vs external)
-   📏 Content depth evaluation

------------------------------------------------------------------------

## 🧠 How It Works

1.  User enters a URL\
2.  Frontend sends request to `/api/analyze`\
3.  Backend fetches HTML from the target site\
4.  HTML is parsed using Cheerio\
5.  SEO data is extracted and normalized\
6.  Custom scoring engine evaluates multiple categories\
7.  Insights engine generates issues, warnings, and positives\
8.  Final report is returned and displayed in a dashboard UI

------------------------------------------------------------------------

## 🏗️ Tech Stack

-   ⚡ Next.js (App Router)
-   🟦 TypeScript
-   🎨 Tailwind CSS
-   🧩 Cheerio
-   🎯 Lucide Icons
-   🧠 Custom SEO scoring engine

------------------------------------------------------------------------

## 📊 SEO Scoring System

RankPeek evaluates pages using:

-   Content quality
-   Structure consistency
-   Technical SEO
-   Content depth
-   Media optimization
-   Link structure

Final score is normalized (0--100) and converted into a grade (A--F).

------------------------------------------------------------------------

## 🚀 Future Improvements

-   🌐 Multi-page crawler
-   🗺️ Sitemap analysis
-   ⚡ Performance metrics (Lighthouse)
-   🤖 AI SEO explanations
-   📄 Export reports (PDF)
-   🔗 Shareable links
-   📈 Historical tracking

------------------------------------------------------------------------

## 📖 Philosophy

-   Fast
-   Free
-   No login
-   Educational
-   Real-world utility

------------------------------------------------------------------------

## 👨‍💻 Author

Ricardo Jesus --- Full-Stack Developer
