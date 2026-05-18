import ProjectCard from "./ProjectCard";

export default function ProjectsGrid({ projects, onSelect }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onSelect={onSelect} />
      ))}
    </div>
  );
}
