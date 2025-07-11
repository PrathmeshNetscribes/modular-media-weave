import { ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";
import { Slider } from "./slider";

interface ZoomControlsProps {
  onValueChange: (zoom: number[]) => void;
}

export default function ZoomControls({ onValueChange }: ZoomControlsProps) {
  const [zoom, setZoom] = useState<number[]>([100]);

  const zoomStep = 25;
  const minZoom = 25;
  const maxZoom = 200;

  const updateZoom = (newZoom: number) => {
    const clamped = Math.min(Math.max(newZoom, minZoom), maxZoom);
    setZoom([clamped]);
    onValueChange([clamped]); // pass as array
  };

  const handleZoomOut = () => updateZoom(zoom[0] - zoomStep);
  const handleZoomIn = () => updateZoom(zoom[0] + zoomStep);
  const handleSliderChange = (value: number[]) => updateZoom(value[0]);

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" onClick={handleZoomOut}>
        <ZoomOut className="w-4 h-4" />
      </Button>
      <div className="w-20">
        <Slider
          value={zoom}
          onValueChange={handleSliderChange}
          min={minZoom}
          max={maxZoom}
          step={zoomStep}
          className="w-full"
        />
      </div>
      <span className="text-xs text-gray-600 w-12 text-center">
        {zoom[0]}%
      </span>
      <Button variant="ghost" size="sm" onClick={handleZoomIn}>
        <ZoomIn className="w-4 h-4" />
      </Button>
    </div>
  );
}
