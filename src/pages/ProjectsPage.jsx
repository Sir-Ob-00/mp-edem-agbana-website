import { useEffect, useState } from "react";
import projectsService from "../services/projectsService";
import ProjectsGrid from "../components/projects/ProjectsGrid";
import ProjectDetailsModal from "../components/projects/ProjectDetailsModal";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await projectsService.getPublicProjects({ limit: 100 });
        if (response.success) {
          setProjects(response.data.projects || []);
        } else {
          setError(response.message || "Failed to fetch projects");
        }
      } catch (err) {
        setError("Failed to fetch projects");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <>
      <section className="relative bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">Development Projects</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Tracking the progress of infrastructure, health, and education initiatives across the constituency.
          </p>
        </div>
      </section>

      <section className="min-h-screen bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          {error && (
            <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4 text-center text-red-600">
              {error}. Please try again later.
            </div>
          )}

          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
                >
                  <div className="h-56 animate-pulse bg-slate-200" />
                  <div className="space-y-3 p-5">
                    <div className="flex justify-between">
                      <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
                      <div className="h-5 w-16 animate-pulse rounded-full bg-slate-200" />
                    </div>
                    <div className="h-7 w-3/4 animate-pulse rounded bg-slate-200" />
                    <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                    <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="py-20 text-center text-slate-500">
              <p className="text-xl">No projects found.</p>
            </div>
          ) : (
            <ProjectsGrid projects={projects} onSelect={setSelectedProject} />
          )}
        </div>

        <ProjectDetailsModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </section>
    </>
  );
}
