import { Github, Linkedin, Mail } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Section } from "@/components/Section";
import { useLanguage } from "@/providers/language";
import { useSettings } from "@/hooks/useSettings";

export function ContactPage() {
  const { t } = useLanguage();
  const settings = useSettings();
  return (
    <Section eyebrow="Contact" title={t.dataDriven}>
      <div className="grid gap-8 lg:grid-cols-[.8fr_1fr]">
        <div className="glass rounded-lg p-6">
          <p className="text-slate-300">{settings?.contact.intro ?? t.contactIntro}</p>
          <div className="mt-6 grid gap-3">
            <a className="inline-flex items-center gap-3 rounded-md border border-white/10 p-3 hover:bg-white/8" href={settings?.profile.linkedin ?? "#"}><Linkedin />LinkedIn</a>
            <a className="inline-flex items-center gap-3 rounded-md border border-white/10 p-3 hover:bg-white/8" href={settings?.profile.github ?? "#"}><Github />GitHub</a>
            <a className="inline-flex items-center gap-3 rounded-md border border-white/10 p-3 hover:bg-white/8" href={`mailto:${settings?.profile.email ?? "hello@example.com"}`}><Mail />Email</a>
          </div>
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}
