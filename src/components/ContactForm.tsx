import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { contactSchema } from "@shared/schema";
import { api } from "@/lib/api";
import { useLanguage } from "@/providers/language";
import type { z } from "zod";

type FormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(contactSchema) });
  async function onSubmit(values: FormValues) {
    try {
      await api("/api/contact", { method: "POST", body: JSON.stringify(values) });
      setStatus("success");
      reset();
    } catch {
      if (import.meta.env.VITE_GITHUB_PAGES === "true") {
        const body = encodeURIComponent(`${values.message}\n\nFrom: ${values.name} <${values.email}>\nCompany: ${values.company ?? ""}`);
        window.location.href = `mailto:hello@example.com?subject=${encodeURIComponent(values.subject)}&body=${body}`;
        return;
      }
      setStatus("error");
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass grid gap-4 rounded-lg p-5">
      <input className="hidden" tabIndex={-1} autoComplete="off" {...register("website")} aria-hidden="true" />
      <Field label={t.formName} error={errors.name?.message}><input {...register("name")} className="w-full rounded-md border border-white/12 bg-ink px-3 py-3" /></Field>
      <Field label={t.formEmail} error={errors.email?.message}><input {...register("email")} type="email" className="w-full rounded-md border border-white/12 bg-ink px-3 py-3" /></Field>
      <Field label={t.formCompany} error={errors.company?.message}><input {...register("company")} className="w-full rounded-md border border-white/12 bg-ink px-3 py-3" /></Field>
      <Field label={t.formSubject} error={errors.subject?.message}><input {...register("subject")} className="w-full rounded-md border border-white/12 bg-ink px-3 py-3" /></Field>
      <Field label={t.formMessage} error={errors.message?.message}><textarea {...register("message")} rows={6} className="w-full rounded-md border border-white/12 bg-ink px-3 py-3" /></Field>
      <button disabled={isSubmitting} className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald px-5 py-3 font-semibold text-ink transition hover:brightness-110 disabled:opacity-60"><Send size={17} />{t.send}</button>
      {status !== "idle" && <p className={status === "success" ? "text-emerald" : "text-red-300"}>{status === "success" ? t.success : t.error}</p>}
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return <label className="grid gap-2 text-sm text-slate-300"><span>{label}</span>{children}{error && <span className="text-xs text-red-300">{error}</span>}</label>;
}
