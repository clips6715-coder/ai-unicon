
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { VideoProject } from '../types';
import Button from '../components/Button';
import { ICONS } from '../constants';

const ProjectCard: React.FC<{ project: VideoProject; onDelete: (id: string) => void }> = ({ project, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-dark-card rounded-lg border border-dark-border overflow-hidden group">
      <div className="relative aspect-video">
        <img src={project.thumbnailUrl} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
            <button onClick={() => navigate(`/preview/${project.id}`)} className="text-white opacity-0 group-hover:opacity-100 transform group-hover:scale-100 scale-75 transition-all">
                {ICONS.play}
            </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-light-text truncate">{project.title}</h3>
        <p className="text-sm text-medium-text">Created: {new Date(project.createdAt).toLocaleDateString()}</p>
        <div className="mt-4 flex space-x-2">
            <Button size="sm" variant="secondary" className="flex-1" onClick={() => navigate(`/preview/${project.id}`)}>{ICONS.view}</Button>
            <Button size="sm" variant="secondary" className="flex-1">{ICONS.edit}</Button>
            <Button size="sm" variant="danger" onClick={() => onDelete(project.id)}>{ICONS.delete}</Button>
        </div>
      </div>
    </div>
  );
};

const DashboardPage: React.FC = () => {
  const [projects, setProjects] = useLocalStorage<VideoProject[]>('video-projects', []);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-light-text sm:text-4xl">Dashboard</h1>
          <p className="mt-2 text-lg text-medium-text">Your generated videos at a glance.</p>
        </div>
        <div className="mt-4 md:mt-0">
            <div className="text-right">
                <p className="text-sm text-medium-text">Plan: <span className="font-semibold text-light-text">Free</span></p>
                <p className="text-sm text-medium-text">Credits: <span className="font-semibold text-light-text">3/5 videos used</span></p>
            </div>
        </div>
      </div>
      
      {projects.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center border-2 border-dashed border-dark-border rounded-lg p-12">
          <svg className="mx-auto h-12 w-12 text-medium-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
          <h3 className="mt-2 text-lg font-medium text-light-text">No projects yet</h3>
          <p className="mt-1 text-medium-text">Get started by creating your first video.</p>
          <div className="mt-6">
            <Link to="/generate">
              <Button>Create Video</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
