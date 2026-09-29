export type DemoSlug = "multi-tenant" | "data-quality" | "validation-framework" | "azure-real-estate" | "finance-planning";
export type DemoStatus = "idle" | "running" | "completed" | "warning" | "failed";
export type StageStatus = "pending" | "running" | "success" | "warning" | "error";

export type DemoStage = {
  id: string;
  label: string;
  status: StageStatus;
  message: string;
  recordsIn?: number;
  recordsOut?: number;
  duration?: number;
};
export type DemoResult = {
  status: DemoStatus;
  title: string;
  scenario: string;
  rows: number;
  columns: number;
  metrics: Array<{ label: string; value: string }>;
  stages: DemoStage[];
  logs: Array<{ level: "INFO" | "SUCCESS" | "WARNING"; message: string }>;
  output: Array<Record<string, string | number>>;
  explanation: string;
};

const tenants = {
  atlas: { label: "Atlas Retail", revenue: 184200, cost: 113700, orders: 128 },
  nova: { label: "Nova Foods", revenue: 241800, cost: 151200, orders: 164 },
  greenfarm: { label: "GreenFarm Export", revenue: 318400, cost: 189300, orders: 92 }
} as const;
const baseStages = (names: string[], records = 1000): DemoStage[] => names.map((label, index) => ({
  id: String(index) + "-" + label.toLowerCase().replace(/ /g, "-"),
  label,
  status: "success",
  message: index === names.length - 1 ? "Published to the demo output" : "Deterministic step completed",
  recordsIn: index === 0 ? records : Math.max(records - (index === 2 ? 22 : 0), 1),
  recordsOut: Math.max(records - (index === 2 ? 22 : 0), 1),
  duration: 320 + index * 70
}));

export function runDemo(slug: DemoSlug, scenario = "Clean", tenant: keyof typeof tenants = "atlas"): DemoResult {
  if (slug === "multi-tenant") {
    const selected = tenants[tenant];
    const margin = Math.round(((selected.revenue - selected.cost) / selected.revenue) * 1000) / 10;
    return {
      status: "completed", title: "Multi-tenant analytics platform", scenario: selected.label + " · synthetic tenant", rows: selected.orders, columns: 9,
      metrics: [
        { label: "Revenue", value: selected.revenue.toLocaleString() + " MAD" },
        { label: "Gross profit", value: (selected.revenue - selected.cost).toLocaleString() + " MAD" },
        { label: "Gross margin", value: margin + "%" },
        { label: "Average order", value: Math.round(selected.revenue / selected.orders).toLocaleString() + " MAD" }
      ],
      stages: baseStages(["Source", "Ingest", "Validate", "Transform", "Model", "Publish", "Dashboard"], selected.orders),
      logs: [
        { level: "INFO", message: "Tenant boundary applied: " + tenant },
        { level: "SUCCESS", message: selected.orders + " synthetic sales records loaded" },
        { level: "SUCCESS", message: "Tenant isolation check passed" },
        { level: "SUCCESS", message: "Dashboard-ready mart published" }
      ],
      output: [
        { tenant: selected.label, region: tenant === "atlas" ? "Casablanca" : tenant === "nova" ? "Rabat" : "Agadir", orders: selected.orders, revenue: selected.revenue },
        { tenant: selected.label, region: tenant === "atlas" ? "Tangier" : tenant === "nova" ? "Marrakesh" : "Agadir", orders: Math.round(selected.orders * .46), revenue: Math.round(selected.revenue * .41) }
      ],
      explanation: "Switching tenants changes every result while tenant_id remains part of each modeled row. This demonstrates isolation without client data."
    };
  }
  if (slug === "data-quality") {
    const severe = scenario === "Severe Issues"; const moderate = scenario === "Moderate Issues"; const affected = severe ? 43 : moderate ? 14 : 2; const score = severe ? "78.6%" : moderate ? "92.4%" : "99.2%";
    return {
      status: affected > 20 ? "warning" : "completed", title: "Data quality observability", scenario: "customer_transactions.csv · " + scenario, rows: 250, columns: 9,
      metrics: [{ label: "Quality score", value: score }, { label: "Critical", value: severe ? "4" : "0" }, { label: "Warnings", value: String(affected) }, { label: "Passed checks", value: severe ? "8 / 14" : "14 / 14" }],
      stages: baseStages(["Load", "Schema", "Completeness", "Uniqueness", "Validity", "Release"], 250).map((stage) => stage.label === "Release" && severe ? { ...stage, status: "warning", message: "Held for review" } : stage),
      logs: [{ level: "INFO", message: "14 deterministic rules evaluated" }, { level: severe ? "WARNING" : "SUCCESS", message: affected + " records flagged for review" }, { level: severe ? "WARNING" : "SUCCESS", message: severe ? "Publish gate held" : "Publish gate passed" }],
      output: [{ rule: "customer_id NOT NULL", status: severe ? "WARNING" : "PASS", affected: severe ? 11 : 0, severity: severe ? "high" : "—" }, { rule: "transaction_id UNIQUE", status: moderate ? "WARNING" : "PASS", affected: moderate ? 3 : 0, severity: moderate ? "medium" : "—" }, { rule: "amount >= 0", status: severe ? "WARNING" : "PASS", affected: severe ? 7 : 0, severity: severe ? "high" : "—" }, { rule: "email format", status: moderate || severe ? "WARNING" : "PASS", affected: affected > 2 ? 4 : 0, severity: "medium" }],
      explanation: "The score is a transparent demo methodology: completeness, uniqueness and validity are averaged. Error injection is controlled and repeatable."
    };
  }
  if (slug === "validation-framework") {
    const failed = scenario !== "Clean";
    return {
      status: failed ? "warning" : "completed", title: "Python validation framework", scenario: "Sample schema · " + scenario, rows: 120, columns: 4,
      metrics: [{ label: "Schema", value: failed ? "FAIL" : "PASS" }, { label: "Rows checked", value: "120" }, { label: "Duplicates", value: failed ? "3" : "0" }, { label: "Report", value: "JSON-ready" }],
      stages: baseStages(["Read CSV", "Schema", "Types", "Nulls", "Duplicates", "Report"], 120).map((stage) => failed && ["Types", "Duplicates"].includes(stage.label) ? { ...stage, status: "warning", message: "Review required" } : stage),
      logs: [{ level: "INFO", message: "In-memory sample dataset selected" }, { level: failed ? "WARNING" : "SUCCESS", message: failed ? "3 duplicate customer_id values detected" : "Required columns and types passed" }, { level: "SUCCESS", message: "Validation report generated without persistence" }],
      output: [{ rule: "required columns", result: "PASS", affected: 0 }, { rule: "revenue numeric", result: failed ? "WARNING" : "PASS", affected: failed ? 2 : 0 }, { rule: "customer_id unique", result: failed ? "FAIL" : "PASS", affected: failed ? 3 : 0 }],
      explanation: "The framework processes the sample in memory. An upload path can enforce CSV and size limits, then discard the file."
    };
  }
  if (slug === "azure-real-estate") {
    const issues = scenario === "Severe Issues" ? 12 : scenario === "Moderate Issues" ? 4 : 0;
    return {
      status: issues ? "warning" : "completed", title: "Azure real-estate data platform", scenario: "Listings pipeline · " + scenario, rows: 480, columns: 8,
      metrics: [{ label: "Raw", value: "480" }, { label: "Clean", value: String(480 - issues) }, { label: "Median price/m²", value: "14,820 MAD" }, { label: "Listings", value: String(480 - issues) }],
      stages: baseStages(["CSV/API", "Blob raw", "ADF ingest", "SQL clean", "Curated", "Power BI"], 480).map((stage) => stage.label === "SQL clean" && issues ? { ...stage, status: "warning", message: issues + " rows quarantined" } : stage),
      logs: [{ level: "INFO", message: "Azure Blob and ADF lifecycle simulated locally" }, { level: issues ? "WARNING" : "SUCCESS", message: issues ? issues + " invalid listings quarantined" : "All listings passed the curated-layer gate" }, { level: "SUCCESS", message: "Power BI semantic output refreshed" }],
      output: [{ city: "Casablanca", listings: 182, averagePrice: "1.62M MAD", pricePerM2: 16200 }, { city: "Rabat", listings: 141, averagePrice: "1.48M MAD", pricePerM2: 14800 }, { city: "Agadir", listings: 96, averagePrice: "1.12M MAD", pricePerM2: 12100 }],
      explanation: "Azure services are simulated, while layer counts and derived metrics are calculated from a deterministic synthetic listing set."
    };
  }
  const pressure = scenario === "Severe Issues" ? 1.12 : scenario === "Moderate Issues" ? 1.06 : 1;
  const rows = [{ department: "Operations", budget: 180000, actual: Math.round(172000 * pressure) }, { department: "Technology", budget: 240000, actual: Math.round(251000 * pressure) }, { department: "Commercial", budget: 160000, actual: Math.round(151000 * pressure) }].map((row) => ({ ...row, variance: row.actual - row.budget, variancePct: (((row.actual - row.budget) / row.budget) * 100).toFixed(1) + "%" }));
  const budget = rows.reduce((sum, row) => sum + row.budget, 0); const actual = rows.reduce((sum, row) => sum + row.actual, 0);
  return {
    status: actual > budget ? "warning" : "completed", title: "Finance planning analytics", scenario: "FY26 planning · " + scenario, rows: rows.length, columns: 6,
    metrics: [{ label: "Budget", value: budget.toLocaleString() + " MAD" }, { label: "Actual", value: actual.toLocaleString() + " MAD" }, { label: "Variance", value: (actual - budget).toLocaleString() + " MAD" }, { label: "Forecast", value: Math.round(actual * 1.08).toLocaleString() + " MAD" }],
    stages: baseStages(["Budget source", "Normalize", "Reconcile", "Forecast", "Semantic model", "BI output"], 12),
    logs: [{ level: "INFO", message: "Scenarios use fixed assumptions" }, { level: actual > budget ? "WARNING" : "SUCCESS", message: (actual > budget ? "Overrun" : "Within plan") + " detected after reconciliation" }, { level: "SUCCESS", message: "Department variance table published" }],
    output: rows,
    explanation: "Budget versus actual is actual minus budget, with variance percentage guarded by a non-zero budget. Values are synthetic."
  };
}
