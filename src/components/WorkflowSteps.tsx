/** @format */

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Play } from "lucide-react";
import InputOutput from "./InputOutput";

interface WorkflowStepsProps {
  steps: any[];
  onDeleteStep: (stepId: string) => void;
  onReorderSteps: (dragIndex: number, hoverIndex: number) => void;
  onSelectStep: (stepId: string) => void;
  selectedStep: string | null;
}

const WorkflowSteps = ({
  steps,
  onDeleteStep,
  onReorderSteps,
  onSelectStep,
  selectedStep,
}: WorkflowStepsProps) => {
  const { toast } = useToast();

  const handleRunWorkflow = () => {
    const functionSteps = steps.filter((step) => step.type === "function");
    if (functionSteps.length === 0) {
      toast({
        title: "No Functions",
        description: "Please add functions to your workflow before running.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Workflow Started",
      description: `Running workflow with ${functionSteps.length} steps...`,
    });
  };

  const handleReorderFunctionSteps = (dragIndex: number, hoverIndex: number) => {
    const functionSteps = steps.filter((step) => step.type === "function");

    const draggedStepId = functionSteps[dragIndex]?.id;
    const hoveredStepId = functionSteps[hoverIndex]?.id;

    const fromIndex = steps.findIndex((s) => s.id === draggedStepId);
    const toIndex = steps.findIndex((s) => s.id === hoveredStepId);

    if (fromIndex === -1 || toIndex === -1) return;

    const updatedSteps = [...steps];
    const [moved] = updatedSteps.splice(fromIndex, 1);
    updatedSteps.splice(toIndex, 0, moved);

    // onReorderSteps(updatedSteps);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-2 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-900">Workflow Steps</h2>
          </div>
          <Button
            onClick={handleRunWorkflow}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Play className="w-4 h-4 mr-2" />
            Run
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <div className="space-y-3">
          <InputOutput
            steps={steps.filter((step) => step.type === "input")}
            onDeleteStep={onDeleteStep}
            onReorderSteps={onReorderSteps}
            onSelectStep={onSelectStep}
            selectedStep={selectedStep}
          />

          {steps.some((step) => step.type === "function") ? (
            <InputOutput
              steps={steps.filter((step) => step.type === "function")}
              onDeleteStep={onDeleteStep}
              onReorderSteps={onReorderSteps}
              onSelectStep={onSelectStep}
              selectedStep={selectedStep}
              // isFunction={true}
            />
          ) : (
            <div className="flex items-center justify-center border-dashed border-gray-300 border-2 rounded-md p-4">
              <div className="h-6 w-6 border-dashed border-gray-300 border-2 rounded-full mr-3" />
              <span className="text-gray-600">Drag functions here</span>
            </div>
          )}

          <InputOutput
            steps={steps.filter((step) => step.type === "output")}
            onDeleteStep={onDeleteStep}
            onReorderSteps={onReorderSteps}
            onSelectStep={onSelectStep}
            selectedStep={selectedStep}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkflowSteps;
