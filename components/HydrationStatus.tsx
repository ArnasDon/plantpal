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
        <div className="text-sm text-white">
          Hydration Status: <span className="font-bold">{clampedValue}%</span>
        </div>
      )}
      <div className="bg-dark-400 h-2 w-full overflow-hidden rounded-full">
        <div
          className="bg-progress h-full transition-all duration-300 ease-out"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
};

export default HydrationStatus;
