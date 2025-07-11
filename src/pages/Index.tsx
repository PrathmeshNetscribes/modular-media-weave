
import { useState } from "react";
import WorkflowDashboard from "@/components/WorkflowDashboard";
import WorkflowBuilder from "@/components/WorkflowBuilder";

const Index = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'builder'>('dashboard');
  const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null);

  const handleCreateWorkflow = () => {
    setCurrentView('builder');
    setSelectedWorkflow(null);
  };

  const handleEditWorkflow = (workflow: any) => {
    setCurrentView('builder');
    setSelectedWorkflow(workflow);
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedWorkflow(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {currentView === 'dashboard' ? (
        <WorkflowDashboard 
          onCreateWorkflow={handleCreateWorkflow}
          onEditWorkflow={handleEditWorkflow}
        />
      ) : (
        <WorkflowBuilder 
          workflow={selectedWorkflow}
          onBack={handleBackToDashboard}
        />
      )}
    </div>
  );
};

export default Index;
