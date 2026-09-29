import { Github, Linkedin, Mail } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Section } from "@/components/Section";
import { useLanguage } from "@/providers/language";
import { useSettings } from "@/hooks/useSettings";

export function ContactPage() {
  const { t, lang } = useLanguage();
  const settings = useSettings();
  const githubUrl = settings?.profile.github && settings.profile.github !== "#" ? settings.profile.github : "https://github.com/Hamzabakh1";
  const linkedinUrl = settings?.profile.linkedin && settings.profile.linkedin !== "#" ? settings.profile.linkedin : "https://www.linkedin.com/in/hamza-bakh/";
  return (
    <Section eyebrow={t.ui.contactEyebrow} title={t.dataDriven}>
      <div className="grid gap-8 lg:grid-cols-[.8fr_1fr]">
        <div className="glass rounded-lg p-6">
          <p className="text-slate-300">{lang === "fr" ? t.contactIntro : (settings?.contact.intro ?? t.contactIntro)}</p>
          <div className="mt-6 grid gap-3">
            <a className="inline-flex items-center gap-3 rounded-md border border-white/10 p-3 hover:bg-white/8" href={linkedinUrl}><Linkedin />{t.ui.linkedin}</a>
            <a className="inline-flex items-center gap-3 rounded-md border border-white/10 p-3 hover:bg-white/8" href={githubUrl}><Github />{t.ui.github}</a>
            <a className="inline-flex items-center gap-3 rounded-md border border-white/10 p-3 hover:bg-white/8" href={`mailto:${settings?.profile.email ?? "hello@example.com"}`}><Mail />{t.ui.email}</a>
          </div>
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}
