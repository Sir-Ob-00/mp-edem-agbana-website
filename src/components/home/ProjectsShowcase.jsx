import { useEffect, useState } from "react";
import projectsService from "../../services/projectsService";
import { motion } from "framer-motion";
import { cleanupHtml } from "../../utils/heroHelpers";
import ProjectDetailsModal from "../projects/ProjectDetailsModal";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * index },
  }),
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "ongoing":
      return "bg-successBg text-success";
    case "completed":
      return "bg-primary/10 text-primary";
    case "planning":
      return "bg-warningBg text-warning";
    default:
      return "bg-background text-text-muted";
  }
};

function ProjectsShowcase() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsService.getFeaturedProjects(4);
        if (response.success) {
          setProjects(response.data.projects);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError("Failed to fetch featured projects");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (error) return null;

  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent">
              Impact
            </p>
            <h2 className="text-3xl font-semibold text-text-primary">
              Featured Projects
            </h2>
          </div>
          <a href="/projects" className="text-sm font-semibold text-primary">
            View all projects →
          </a>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm"
              >
                <div className="h-56 animate-pulse bg-border" />
                <div className="space-y-3 p-5">
                  <div className="flex justify-between">
                    <div className="h-4 w-20 animate-pulse rounded bg-border" />
                    <div className="h-5 w-16 animate-pulse rounded-full bg-border" />
                  </div>
                  <div className="h-7 w-3/4 animate-pulse rounded bg-border" />
                  <div className="h-4 w-full animate-pulse rounded bg-border" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-border" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={cardVariants}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(52,98,49,0.15)]"
              >
                <div className="h-56 overflow-hidden bg-background">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      width={400}
                      height={224}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-text-muted">
                      No Image
                    </div>
                  )}
                </div>
                <div className="space-y-3 p-5">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-text-muted">
                    <span>{project.sector?.name || "General"}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 ${getStatusColor(
                        project.status
                      )}`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <h3 className="line-clamp-2 text-xl font-semibold text-text-primary group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="line-clamp-2 text-sm text-text-muted">
                    {cleanupHtml(project.description || "")}
                  </p>
                  <div className="text-sm text-text-muted">
                    <p>
                      <span className="font-semibold text-text-primary">
                        Location:
                      </span>{" "}
                      {project.location}
                    </p>
                    <p>
                      <span className="font-semibold text-text-primary">
                        Timeline:
                      </span>{" "}
                      {formatDate(project.start_date)}
                      {project.end_date
                        ? ` · ${formatDate(project.end_date)}`
                        : " · Ongoing"}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      <ProjectDetailsModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

export default ProjectsShowcase;