import AboutHero from "./AboutHero";
import StatsRibbon from "./StatsRibbon";
import BiographySection from "./BiographySection";
import RolesSection from "./RolesSection";
import CommitteesSection from "./CommitteesSection";
import EducationSection from "./EducationSection";
import AwardsSection from "./AwardsSection";
import PhilosophySection from "./PhilosophySection";

const roles = [
  { title: "Member of Parliament", org: "Ketu North Constituency" },
  { title: "Member, Education Committee", org: "Parliament of Ghana" },
  { title: "Member, Public Accounts Committee", org: "Parliament of Ghana" },
  { title: "Board Member", org: "Electricity Company of Ghana (ECG)" },
  { title: "Project Manager", org: "African Centre for Development Finance" },
  { title: "Chief Corporate Affairs Officer", org: "Young Apostles FC" },
  { title: "President", org: "Nukunu Sports Academy" },
];

const education = [
  { degree: "PhD Candidate", field: "Finance", institution: "University of Professional Studies, Accra" },
  { degree: "Master of Arts", field: "Development Finance & Economic Policy Management", institution: "University of Ghana" },
  { degree: "Master of Arts", field: "Peace, Security & Intelligence Management", institution: "University of Professional Studies, Accra" },
];

const awards = [
  { title: "Most Influential Young Politician", org: "Spotlight Africa Awards", year: "2020" },
  { title: "50 Most Influential Young Ghanaians", org: "—", year: "2018 & 2020" },
  { title: "100 Most Influential Young African Leaders", org: "—", year: "2018" },
  { title: "Coca-Cola Ghana 60 Young Achievers Award", org: "Coca-Cola Ghana", year: "2017" },
  { title: "Best Student Leader in Africa", org: "All-Africa Students Union", year: "2014" },
];

const stats = [
  { value: "10+", label: "Years of Leadership" },
  { value: "3", label: "Master's Degrees" },
  { value: "5+", label: "Awards & Recognitions" },
  { value: "7+", label: "Leadership Roles" },
];

export default function About() {
  return (
    <main className="relative overflow-hidden bg-background text-text-primary">
      <AboutHero />
      <StatsRibbon stats={stats} />
      <BiographySection />
      <RolesSection roles={roles} />
      <CommitteesSection />
      <EducationSection education={education} />
      <AwardsSection awards={awards} />
      <PhilosophySection />
    </main>
  );
}