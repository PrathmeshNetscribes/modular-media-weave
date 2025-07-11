
import { useState } from "react";
import { Search, User, Image as ImageIcon, Wand2, Scissors, Palette, Zap, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FunctionLibraryProps {
  onAddFunction: (func: any) => void;
}

const FunctionLibrary = ({ onAddFunction }: FunctionLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const functions = [
    { id: 1, name: "Change Face", category: "Human", icon: User, description: "Replace or modify facial features" },
    { id: 2, name: "Change Ethnicity", category: "Human", icon: User, description: "Adjust ethnic characteristics" },
    { id: 3, name: "Clip to Subject", category: "Background", icon: Scissors, description: "Extract main subject from image" },
    { id: 4, name: "Color Background", category: "Background", icon: Palette, description: "Change background color" },
    { id: 5, name: "Gen AI Erase", category: "Background", icon: Wand2, description: "Remove unwanted elements" },
    { id: 6, name: "Style Transfer", category: "Image", icon: ImageIcon, description: "Apply artistic styles" },
    { id: 7, name: "Enhance Quality", category: "Image", icon: Zap, description: "Improve image resolution" },
    { id: 8, name: "Remove Background", category: "Background", icon: Scissors, description: "Complete background removal" }
  ];

  const filters = ["All", "Human", "Background", "Image"];

  const filteredFunctions = functions.filter(func => {
    const matchesSearch = func.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "All" || func.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getIconComponent = (IconComponent: any) => {
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Available Functions</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="w-6 h-6 p-0 hover:bg-gray-100 rounded-full">
                  <Info className="w-4 h-4 text-gray-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs">
                <p className="text-sm">Browse and select AI functions to add to your workflow. Functions will be executed in the order you add them.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search functions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          {filters.map(filter => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter)}
              className={`text-xs px-3 py-1 rounded-full transition-all duration-200 ${
                activeFilter === filter 
                  ? "bg-blue-600 text-white shadow-md" 
                  : "border-gray-300 text-gray-600 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      {/* Function List */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-2">
          {filteredFunctions.map(func => (
            <div
              key={func.id}
              className="group p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer bg-white hover:bg-blue-50 animate-fade-in hover-scale"
              onClick={() => onAddFunction(func)}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center group-hover:from-blue-200 group-hover:to-purple-200 transition-colors">
                  {getIconComponent(func.icon)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-gray-900 text-sm truncate">{func.name}</h3>
                    <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600">
                      {func.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 leading-tight">{func.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FunctionLibrary;
