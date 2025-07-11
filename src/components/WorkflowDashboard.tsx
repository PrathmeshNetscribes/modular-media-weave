
import { Plus, Play, Settings, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface WorkflowDashboardProps {
  onCreateWorkflow: () => void;
  onEditWorkflow: (workflow: any) => void;
}

const WorkflowDashboard = ({ onCreateWorkflow, onEditWorkflow }: WorkflowDashboardProps) => {
  const sampleWorkflows = [
    {
      id: 1,
      name: "Portrait Enhancement",
      steps: 3,
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      lastModified: "2 hours ago"
    },
    {
      id: 2,
      name: "Background Removal",
      steps: 2,
      thumbnail: "https://images.unsplash.com/photo-1494790108755-2616b332c9c7?w=300&h=300&fit=crop",
      lastModified: "1 day ago"
    },
    {
      id: 3,
      name: "Style Transfer",
      steps: 4,
      thumbnail: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
      lastModified: "3 days ago"
    }
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Workflow Studio</h1>
        <p className="text-lg text-gray-600">Create and manage your AI processing workflows</p>
      </div>

      <div className="mb-8">
        <Button 
          onClick={onCreateWorkflow}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="w-6 h-6 mr-2" />
          Create New Workflow
        </Button>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Workflows</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sampleWorkflows.map((workflow) => (
            <Card 
              key={workflow.id} 
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-0 shadow-lg bg-white/80 backdrop-blur-sm"
              onClick={() => onEditWorkflow(workflow)}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={workflow.thumbnail} 
                    alt={workflow.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="sm" variant="secondary" className="rounded-full">
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{workflow.name}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{workflow.steps} steps</span>
                    <span>{workflow.lastModified}</span>
                  </div>
                  <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Settings className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Template Workflows</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {["Face Enhancement", "Object Removal", "Color Grading"].map((template, index) => (
            <Card key={index} className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-dashed border-gray-300 hover:border-blue-400">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                  <Plus className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                  {template}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkflowDashboard;
