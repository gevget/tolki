import { HomeExperience } from "@/components/home-experience";
import { projects } from "@/data/projects";

export default function HomePage() {
  return <HomeExperience projects={projects} />;
}
