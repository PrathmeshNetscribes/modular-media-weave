
import { useState } from "react";
import { Maximize2, Download, RotateCcw, RotateCw, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface PreviewCanvasProps {
  workflowSteps: any[];
  selectedStep: string | null;
}

const PreviewCanvas = ({ workflowSteps, selectedStep }: PreviewCanvasProps) => {
  const [zoom, setZoom] = useState([100]);
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonSlider, setComparisonSlider] = useState([50]);

  const inputStep = workflowSteps.find(step => step.type === 'input');
  const currentImage = inputStep?.thumbnail || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop';

  return (
    <div className="w-full h-full flex flex-col bg-gray-100">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Preview</span>
          <div className="h-4 w-px bg-gray-300" />
          <span className="text-sm text-gray-900 font-medium">1024x1024</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowComparison(!showComparison)}
            className={showComparison ? "bg-blue-50 border-blue-300 text-blue-700" : ""}
          >
            Before/After
          </Button>
          <div className="h-4 w-px bg-gray-300" />
          <Button variant="ghost" size="sm">
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <RotateCw className="w-4 h-4" />
          </Button>
          <div className="h-4 w-px bg-gray-300" />
          <Button variant="ghost" size="sm">
            <ZoomOut className="w-4 h-4" />
          </Button>
          <div className="w-20">
            <Slider
              value={zoom}
              onValueChange={setZoom}
              min={25}
              max={200}
              step={25}
              className="w-full"
            />
          </div>
          <span className="text-xs text-gray-600 w-12">{zoom[0]}%</span>
          <Button variant="ghost" size="sm">
            <ZoomIn className="w-4 h-4" />
          </Button>
          <div className="h-4 w-px bg-gray-300" />
          <Button variant="ghost" size="sm">
            <Maximize2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 p-8 flex items-center justify-center overflow-hidden">
        <div className="relative max-w-full max-h-full">
          {showComparison ? (
            <div className="relative">
              <div className="relative overflow-hidden rounded-lg shadow-xl bg-white p-2">
                <div className="relative" style={{ transform: `scale(${zoom[0] / 100})` }}>
                  <img 
                    src={currentImage}
                    alt="Preview"
                    className="max-w-full max-h-[600px] object-contain"
                  />
                  <div 
                    className="absolute top-0 left-0 h-full bg-black/20 border-r-2 border-white transition-all duration-200"
                    style={{ width: `${comparisonSlider[0]}%` }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-white/90 px-2 py-1 rounded text-xs font-medium">Before</span>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 h-full flex items-center justify-center" style={{ width: `${100 - comparisonSlider[0]}%` }}>
                    <span className="bg-white/90 px-2 py-1 rounded text-xs font-medium">After</span>
                  </div>
                  <div 
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize"
                    style={{ left: `${comparisonSlider[0]}%`, transform: 'translateX(-50%)' }}
                  />
                </div>
              </div>
              <div className="mt-4">
                <Slider
                  value={comparisonSlider}
                  onValueChange={setComparisonSlider}
                  min={0}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-xl p-2">
              <img 
                src={currentImage}
                alt="Preview"
                className="max-w-full max-h-[600px] object-contain rounded"
                style={{ transform: `scale(${zoom[0] / 100})` }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-white border-t border-gray-200 px-4 py-2 flex items-center justify-between text-xs text-gray-600">
        <span>Ready</span>
        <span>{workflowSteps.length - 1} steps configured</span>
      </div>
    </div>
  );
};

export default PreviewCanvas;
