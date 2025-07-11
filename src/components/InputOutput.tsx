/** @format */

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Download, Edit, Info, Play, Trash2, Upload } from "lucide-react";
import { useState } from "react";

interface InputOutputProps {
  steps: any[];
  onDeleteStep: (stepId: string) => void;
  onReorderSteps: (dragIndex: number, hoverIndex: number) => void;
  onSelectStep: (stepId: string) => void;
  selectedStep: string | null;
}

const InputOutput = ({
  steps,
  onDeleteStep,
  onReorderSteps,
  onSelectStep,
  selectedStep,
}: InputOutputProps) => {
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (
      draggedItem !== null &&
      draggedItem !== index &&
      steps[draggedItem].type === "function" &&
      steps[index].type === "function"
    ) {
      onReorderSteps(draggedItem, index);
      setDraggedItem(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const getStepIcon = (step: any) => {
    switch (step.type) {
      case "input":
        return <Upload className="w-4 h-4 text-green-600" />;
      case "output":
        return <Download className="w-4 h-4 text-blue-600" />;
      default:
        return <Play className="w-4 h-4 text-purple-600" />;
    }
  };
  new Promise(resolve => setTimeout(() => {return resolve}, 1000));

  const getStepBadgeColor = (step: any) => {
    switch (step.type) {
      case "input":
        return "bg-green-100 text-green-800";
      case "output":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-purple-100 text-purple-800";
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-2">
          {steps.map((step, index) => (
            <Card
              key={step.id}
              className={`group transition-all duration-300 cursor-pointer border overflow-hidden ${
                selectedStep === step.id
                  ? "border-blue-500 shadow-md bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              } ${draggedItem === index ? "opacity-50" : ""}`}
              draggable={step.type === "function"}
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              onClick={() => onSelectStep(step.id)}
            >
              <CardContent className="p-1">
                <div className="flex justify-between items-start gap-4 transition-all duration-300 ease-in-out">
                  {/* Right column for function */}
                  <div className="flex flex-col flex-1">
                    {/* Hidden initially; expands on hover */}
                    <div className="transition-all duration-300 max-h-0 overflow-hidden opacity-0 group-hover:max-h-20 group-hover:opacity-100">
                      <div className="flex gap-1 justify-end mt-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-6 h-6 p-0 hover:bg-gray-100 rounded-full"
                              >
                                <Info className="w-4 h-4 text-gray-500" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="max-w-xs">
                              <Badge
                                className={`text-xs px-2 py-0.5 ${getStepBadgeColor(
                                  step
                                )}`}
                              >
                                {step.type}
                              </Badge>
                              {step.function?.description && (
                                <p className="text-xs text-gray-500 mt-1">
                                  {step.function.description}
                                </p>
                              )}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-7 h-7 p-0 hover:bg-blue-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            // handle edit
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
                    </div>

                    {/* Icon + name (always visible) */}
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                        {getStepIcon(step)}
                      </div>
                      <h3 className="font-medium text-sm text-gray-900 truncate">
                        {step.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            // <Card
            //   key={step.id}
            //   className={`group transition-all cursor-pointer border ${
            //     selectedStep === step.id
            //       ? "border-blue-500 shadow-md bg-blue-50"
            //       : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
            //   } ${draggedItem === index ? "opacity-50" : ""}`}
            //   draggable={step.type === "function"}
            //   onDragStart={() => handleDragStart(index)}
            //   onDragOver={(e) => handleDragOver(e, index)}
            //   onDragEnd={handleDragEnd}
            //   onClick={() => onSelectStep(step.id)}
            // >
            //   <CardContent className="p-1">
            //     {(step.type === "input" || step.type === "output") ? (
            //       // Input/Output layout
            //       <div className="flex gap-2">
            //         <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
            //           {getStepIcon(step)}
            //         </div>
            //         <h3 className="font-medium text-sm text-gray-900 truncate">
            //           {step.name}
            //         </h3>
            //         <TooltipProvider>
            //           <Tooltip>
            //             <TooltipTrigger asChild>
            //               <Button
            //                 variant="ghost"
            //                 size="sm"
            //                 className="w-6 h-6 p-0 hover:bg-gray-100 rounded-full"
            //               >
            //                 <Info className="w-4 h-4 text-gray-500" />
            //               </Button>
            //             </TooltipTrigger>
            //             <TooltipContent side="bottom" className="max-w-xs">
            //               <Badge
            //                 className={`text-xs px-2 py-0.5 ${getStepBadgeColor(
            //                   step
            //                 )}`}
            //               >
            //                 {step.type}
            //               </Badge>
            //             </TooltipContent>
            //           </Tooltip>
            //         </TooltipProvider>
            //       </div>
            //     ) : (
            //       // Function layout
            //       <div className="flex justify-between items-start gap-4">
            //         {/* Drag handle */}
            //         {/* <div className="opacity-0 flex justify-center items-center group-hover:opacity-100 cursor-grab active:cursor-grabbing transition-opacity" style={{height:"-webkit-fill-available"}}>
            //           <GripVertical className="w-4 h-4 text-gray-400 mt-1" />
            //         </div> */}

            //         {/* Right column */}
            //         <div className="flex flex-col flex-1">
            //           {/* Action buttons */}
            //           <div className="flex gap-1 justify-end opacity-0  group-hover:opacity-100 cursor-grab active:cursor-grabbing transition-opacity">
            //              <TooltipProvider>
            //               <Tooltip>
            //                 <TooltipTrigger asChild>
            //                   <Button
            //                     variant="ghost"
            //                     size="sm"
            //                     className="w-6 h-6 p-0 hover:bg-gray-100 rounded-full"
            //                   >
            //                     <Info className="w-4 h-4 text-gray-500" />
            //                   </Button>
            //                 </TooltipTrigger>
            //                 <TooltipContent side="bottom" className="max-w-xs">
            //                   <Badge
            //                     className={`text-xs px-2 py-0.5 ${getStepBadgeColor(
            //                       step
            //                     )}`}
            //                   >
            //                     {step.type}
            //                   </Badge>
            //                   {step.function?.description && (
            //                     <p className="text-xs text-gray-500 mt-1">
            //                       {step.function.description}
            //                     </p>
            //                   )}
            //                 </TooltipContent>
            //               </Tooltip>
            //             </TooltipProvider>
            //             <div className="flex gap-1">
            //             <Button
            //               variant="ghost"
            //               size="sm"
            //               className="w-7 h-7 p-0 opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing transition-opacity hover:bg-blue-100"
            //               onClick={(e) => {
            //                 e.stopPropagation();
            //                 // handle edit
            //               }}
            //             >
            //               <Edit className="w-3 h-3" />
            //             </Button>
            //             <Button
            //               variant="ghost"
            //               size="sm"
            //               className="w-7 h-7 p-0 hover:bg-red-100 text-red-600 p-0 opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing transition-opacity"
            //               onClick={(e) => {
            //                 e.stopPropagation();
            //                 onDeleteStep(step.id);
            //               }}
            //             >
            //               <Trash2 className="w-3 h-3" />
            //             </Button>
            //             </div>
            //           </div>

            //           {/* Icon + name + tooltip */}
            //           <div className="flex items-center gap-2">
            //             <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
            //               {getStepIcon(step)}
            //             </div>
            //             <h3 className="font-medium text-sm text-gray-900 truncate">
            //               {step.name}
            //             </h3>
            //           </div>
            //         </div>
            //       </div>
            //     )}
            //   </CardContent>
            // </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InputOutput;
