
import { useState } from "react";
import { GripVertical, Edit, Trash2, Upload, Download, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface WorkflowStepsProps {
  steps: any[];
  onDeleteStep: (stepId: string) => void;
  onReorderSteps: (dragIndex: number, hoverIndex: number) => void;
  onSelectStep: (stepId: string) => void;
  selectedStep: string | null;
}

const WorkflowSteps = ({ steps, onDeleteStep, onReorderSteps, onSelectStep, selectedStep }: WorkflowStepsProps) => {
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedItem !== null && draggedItem !== index) {
      onReorderSteps(draggedItem, index);
      setDraggedItem(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const getStepIcon = (step: any) => {
    switch (step.type) {
      case 'input':
        return <Upload className="w-4 h-4 text-green-600" />;
      case 'output':
        return <Download className="w-4 h-4 text-blue-600" />;
      default:
        return <Play className="w-4 h-4 text-purple-600" />;
    }
  };

  const getStepBadgeColor = (step: any) => {
    switch (step.type) {
      case 'input':
        return 'bg-green-100 text-green-800';
      case 'output':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-purple-100 text-purple-800';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Steps</h2>
          <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200">
            <Play className="w-4 h-4 mr-2" />
            Run
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <div className="space-y-3">
          {steps.map((step, index) => (
            <Card
              key={step.id}
              className={`group transition-all duration-200 cursor-pointer border ${
                selectedStep === step.id 
                  ? 'border-blue-500 shadow-md bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              } ${draggedItem === index ? 'opacity-50' : ''}`}
              draggable={step.type !== 'input' && step.type !== 'output'}
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              onClick={() => onSelectStep(step.id)}
            >
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  {/* Drag Handle */}
                  {step.type !== 'input' && step.type !== 'output' && (
                    <div className="opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing transition-opacity">
                      <GripVertical className="w-4 h-4 text-gray-400" />
                    </div>
                  )}

                  {/* Step Icon */}
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    {getStepIcon(step)}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-sm text-gray-900 truncate">{step.name}</h3>
                      <Badge className={`text-xs px-2 py-0.5 ${getStepBadgeColor(step)}`}>
                        {step.type}
                      </Badge>
                    </div>
                    
                    {step.type === 'input' && step.thumbnail && (
                      <div className="mt-2">
                        <img 
                          src={step.thumbnail} 
                          alt="Input"
                          className="w-full h-20 object-cover rounded border"
                        />
                      </div>
                    )}
                    
                    {step.function && (
                      <p className="text-xs text-gray-500 truncate">{step.function.description}</p>
                    )}
                  </div>

                  {/* Step Actions */}
                  {step.type !== 'input' && step.type !== 'output' && (
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="w-7 h-7 p-0 hover:bg-blue-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle edit
                        }}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="w-7 h-7 p-0 hover:bg-red-100 text-red-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteStep(step.id);
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Step Number Indicator */}
                <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
                  {index + 1}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Output Settings */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Output Settings</h3>
        <div className="text-xs text-gray-600 space-y-1">
          <div>Format: PNG</div>
          <div>Quality: High</div>
          <div>Resolution: 1024x1024</div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowSteps;
