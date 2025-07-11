
import FunctionLibrary from "@/components/FunctionLibrary";
import PreviewCanvas from "@/components/PreviewCanvas";
import { Button } from "@/components/ui/button";
import WorkflowSteps from "@/components/WorkflowSteps";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Play, Settings } from "lucide-react";
import { useState } from "react";

interface WorkflowBuilderProps {
  workflow?: any;
  onBack: () => void;
}

const WorkflowBuilder = ({ workflow, onBack }: WorkflowBuilderProps) => {
  const [workflowSteps, setWorkflowSteps] = useState([
    { id: 'input', type: 'input', name: 'Input Image', thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop' },
    { id: 'output', type: 'output', name: 'Output' }
  ]);
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAddFunction = (func: any) => {
    const newStep = {
      id: `step-${Date.now()}`,
      type: 'function',
      name: func.name,
      function: func,
      parameters: {}
    };

    const outputIndex = workflowSteps.findIndex(step => step.type === 'output');
    const newSteps = [...workflowSteps];
    newSteps.splice(outputIndex, 0, newStep);
    setWorkflowSteps(newSteps);

    toast({
      title: "Function Added",
      description: `${func.name} has been added to your workflow.`,
    });
  };

  const handleDeleteStep = (stepId: string) => {
    const stepToDelete = workflowSteps.find(step => step.id === stepId);
    setWorkflowSteps(steps => steps.filter(step => step.id !== stepId));
    
    if (stepToDelete) {
      toast({
        title: "Step Removed",
        description: `${stepToDelete.name} has been removed from your workflow.`,
      });
    }
  };

  const handleReorderSteps = (dragIndex: number, hoverIndex: number) => {
    // const dragStep = workflowSteps[dragIndex];
    // const newSteps = [...workflowSteps];
    // newSteps.splice(dragIndex, 1);
    // newSteps.splice(hoverIndex, 0, dragStep);
    const functionSteps = workflowSteps.filter((step) => step.type === "function");

    const draggedStepId = functionSteps[dragIndex]?.id;
    const hoveredStepId = functionSteps[hoverIndex]?.id;

    const fromIndex = workflowSteps.findIndex((s) => s.id === draggedStepId);
    const toIndex = workflowSteps.findIndex((s) => s.id === hoveredStepId);

    if (fromIndex === -1 || toIndex === -1) return;

    const updatedSteps = [...workflowSteps];
    const [moved] = updatedSteps.splice(fromIndex, 1);
    updatedSteps.splice(toIndex, 0, moved);
    setWorkflowSteps(updatedSteps);
  };

  const handleRunBatch = () => {
    const functionSteps = workflowSteps.filter(step => step.type === 'function');
    if (functionSteps.length === 0) {
      toast({
        title: "No Functions",
        description: "Please add at least one function to your workflow before running.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Batch Process Started",
      description: `Processing workflow with ${functionSteps.length} functions...`,
    });
  };

  const handleSettings = () => {
    toast({
      title: "Settings",
      description: "Workflow settings panel will open here.",
    });
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="hover:bg-gray-100">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Workflows
          </Button>
          <div className="h-6 w-px bg-gray-300" />
          <h1 className="text-xl font-semibold text-gray-900">
            {workflow?.name || "New Workflow"}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={handleRunBatch}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Play className="w-4 h-4 mr-2" />
            Run Batch Process
          </Button>
          <Button 
            onClick={handleSettings}
            variant="outline" 
            className="border-gray-300"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Function Library */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <FunctionLibrary onAddFunction={handleAddFunction} />
        </div>

        {/* Middle Panel - Preview Canvas */}
        <div className="flex-1 bg-gray-100 flex items-center justify-center">
          <PreviewCanvas 
            workflowSteps={workflowSteps}
            selectedStep={selectedStep}
          />
        </div>

        {/* Right Panel - Workflow Steps */}
        <div className="w-60 bg-white border-l border-gray-200 flex flex-col">
          <WorkflowSteps 
            steps={workflowSteps}
            onDeleteStep={handleDeleteStep}
            onReorderSteps={handleReorderSteps}
            onSelectStep={setSelectedStep}
            selectedStep={selectedStep}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkflowBuilder;
