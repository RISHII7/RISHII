import type { FeaturedProject } from "./featuredWork";

/**
 * Section 03 — Data Engineering. Same shape as featured work / more projects
 * so each row opens a full case-study page at /data/:slug.
 */
export const dataEngineering: FeaturedProject[] = [
  {
    number: "001",
    slug: "walmart",
    title: "WALMART DATA PLATFORM",
    category: "Data Engineering",
    description:
      "End-to-end retail data platform — medallion architecture on Databricks, dbt incremental models with SCD Type 2 history, orchestrated by a containerized Airflow DAG",
    tags: ["dbt", "Airflow", "Databricks", "Unity Catalog", "PostgreSQL"],
    metrics: [
      { value: "3", label: "medallion layers — bronze, silver, gold" },
      { value: "SCD2", label: "full dimension history via dbt snapshots" },
      { value: "6", label: "source entities ingested end-to-end" },
    ],
    github: "https://github.com/RISHII7/walmart",
    detail: {
      role: "SOLO BUILD — DATA PLATFORM",
      timeline: "SHIPPED · ACTIVELY MAINTAINED",
      scope: ["Medallion architecture", "dbt transformations", "Airflow orchestration", "Data quality testing"],
      summary:
        "Raw retail data — customers, stores, products, orders, reviews — flows through a medallion architecture into analytics-ready gold tables, with full historical tracking and end-to-end orchestration.",
      pullquote:
        "A pipeline is only as trustworthy as its history — SCD Type 2 means nothing is ever silently overwritten.",
      body: [
        "Raw retail data — customers, stores, products, orders, reviews — lands in PostgreSQL and S3, then flows through a medallion architecture into analytics-ready gold tables. Bronze holds untouched source data via Unity Catalog external locations; silver deduplicates and conforms it with incremental dbt models; gold delivers dimension tables with full SCD Type 2 history alongside an order-item-grain fact table.",
        "The whole pipeline runs as a single containerized Airflow DAG — CeleryExecutor, Redis broker, Postgres metadata store — that triggers ingestion, dbt runs, snapshots, and data-quality tests in sequence with freshness checks along the way. dbt-databricks handles the transformation layer against a Databricks Lakehouse, so every model is tested, documented, and lineage-tracked.",
        "Built with the same rigor as a production platform: a full documentation suite (architecture rationale, column-level data dictionaries, ERDs, operational runbooks), a changelog, and a defined release process — the kind of knowledge-transfer artifacts a real data team would expect, not just working code.",
      ],
    },
  },
  {
    number: "002",
    slug: "zomato-ai-analytics",
    title: "ZOMATO AI ANALYTICS",
    category: "Data Engineering + AI",
    description:
      "A food-delivery data platform handling 33.6 million real, messy orders — cleaned through a Snowflake warehouse and paired with AI tools that answer questions about the data in plain English",
    tags: ["Snowflake", "dbt", "Airflow", "Gemini AI", "AWS S3"],
    metrics: [
      { value: "33.6M", label: "orders processed end-to-end" },
      { value: "1,020×", label: "cheaper AI costs by removing duplicate work" },
      { value: "6", label: "automated safety checks on every code change" },
    ],
    github: "https://github.com/RISHII7/Zomato-AI-Analytics",
    detail: {
      role: "SOLO BUILD — DATA PLATFORM + AI",
      timeline: "SHIPPED · ACTIVELY MAINTAINED",
      scope: ["Cloud data lake", "Warehouse modeling", "AI enrichment", "Security & safety guards"],
      summary:
        "A realistic, large-scale food-delivery dataset — 33.6 million orders — cleaned, organized, and connected to AI tools that can answer plain-English questions about the business, all built with the security and cost discipline of a real company's data team.",
      pullquote:
        "Real data pushes back — this project keeps the mess (missing values, weird formatting, one broken row in 371,000) instead of hiding it, and shows exactly how each problem was handled.",
      body: [
        "The data starts as 7 spreadsheets (orders, menus, restaurants, reviews, and more) sitting in Amazon S3 — about 33.6 million rows in total. From there it flows into Snowflake, a cloud data warehouse, in stages: first loaded exactly as-is, then cleaned and given proper types, then finally shaped into simple, ready-to-use tables that answer real business questions like \"which restaurants make the most money\" or \"how often do deliveries run late.\" Every step is checked automatically — 17 models and 16 automated tests make sure numbers stay correct as the data changes.",
        "On top of the clean data sit three AI features powered by Google's Gemini models. First, it reads through customer reviews and automatically tags each one with sentiment and complaint type — smartly, since only 294 of the 300,000 reviews are actually unique, so it does the AI work once per unique review instead of 300,000 times, cutting the cost by over 1,000×. Second, it can search reviews by meaning, not just keywords. Third, it lets someone type a plain-English question and turns it into a safe, read-only database query — with checks in place so it can never accidentally change or delete data.",
        "Security is treated as seriously as it would be at a real company: cloud storage access uses temporary, rotating credentials instead of permanent passwords, and every pull request automatically runs six checks — code-quality scans, a check that no secret keys were accidentally committed, and a check that the sample data used for testing still lines up correctly — before anything can be merged.",
      ],
    },
  },
];
