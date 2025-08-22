import React from "react";

interface HydrationStatusProps {
  value: number; // 0-100
  showPercentage?: boolean;
  className?: string;
}

const HydrationStatus: React.FC<HydrationStatusProps> = ({
  value,
  showPercentage = true,
  className = "",
}) => {
  // Ensure value is between 0 and 100
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {showPercentage && (
        <div className="text-white text-sm">
          Hydration Status: <span className="font-bold">{clampedValue}%</span>
        </div>
      )}
      <div className="w-full bg-dark-400 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-progress transition-all duration-300 ease-out"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
};

export default HydrationStatus;
