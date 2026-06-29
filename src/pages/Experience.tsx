import { Section } from "@/components/Section";
import { useContent } from "@/hooks/useContent";
import { Timeline } from "@/pages/SharedViews";

export function ExperiencePage() {
  const { data } = useContent();
  return <Section eyebrow="Experience" title="Professional experience, internships, certifications, and timeline."><Timeline experiences={data?.experiences ?? []} /></Section>;
}
