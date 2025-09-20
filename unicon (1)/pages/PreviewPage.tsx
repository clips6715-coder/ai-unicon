
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { VideoProject } from '../types';
import Button from '../components/Button';
import { ICONS } from '../constants';

const PreviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [projects] = useLocalStorage<VideoProject[]>('video-projects', []);
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Video not found</h1>
        <p className="text-medium-text mt-2">The video you are looking for does not exist or has been deleted.</p>
        <Link to="/dashboard" className="mt-6 inline-block">
          <Button>Go to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const handleRegenerate = () => {
    // In a real app, this would likely take you back to the generator with pre-filled options
    alert("Regeneration feature coming soon!");
  }

  const handleEditScript = () => {
    alert("Script editing feature coming soon!");
  }
  
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        
        {/* Video Player */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-light-text">{project.title}</h1>
          <div className="mt-4 aspect-video w-full bg-dark-card rounded-lg border border-dark-border overflow-hidden shadow-lg">
             <img src={project.thumbnailUrl.replace('400/225', '1280/720')} alt={project.title} className="w-full h-full object-cover" />
             <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                <div className="text-white scale-150 cursor-pointer">{ICONS.play}</div>
            </div>
          </div>
        </div>
        
        {/* Actions & Details */}
        <div className="mt-8 lg:mt-0">
          <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
            <h2 className="text-xl font-semibold text-light-text">Manage Video</h2>
            <div className="mt-6 space-y-4">
               <Button className="w-full">
                {ICONS.download}
                Download Video
              </Button>
               <Button variant="secondary" className="w-full" onClick={handleRegenerate}>
                {ICONS.regenerate}
                Regenerate
              </Button>
               <Button variant="secondary" className="w-full" onClick={handleEditScript}>
                {ICONS.edit}
                Edit Script
              </Button>
            </div>
             <div className="mt-6 text-center">
                 <Button onClick={() => navigate('/dashboard')} variant="primary" className="w-full bg-green-600 hover:bg-green-700 focus:ring-green-500">Save to Dashboard</Button>
            </div>
          </div>

          <div className="mt-8 bg-dark-card p-6 rounded-lg border border-dark-border">
            <h3 className="text-lg font-semibold text-light-text">Details</h3>
            <ul className="mt-4 space-y-2 text-sm text-medium-text">
              <li><strong>Style:</strong> {project.style}</li>
              <li><strong>Voice:</strong> {project.voice}</li>
              <li><strong>Duration:</strong> {project.duration} seconds</li>
              <li><strong>Created:</strong> {new Date(project.createdAt).toLocaleDateString()}</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PreviewPage;
