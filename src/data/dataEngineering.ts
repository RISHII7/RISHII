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
];

export const dataEngineeringFooterLink = {
  label: "ALL CODE · GITHUB.COM/RISHII7",
  href: "https://github.com/RISHII7?tab=repositories",
} as const;
