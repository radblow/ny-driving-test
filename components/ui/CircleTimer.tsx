// components/ui/CircleTimer.tsx
import { Timer } from 'lucide-react';

export default function CircleTimer({ seconds }: { seconds: number }) {
  return (
    <div className="flex items-center justify-end text-gray-600 text-sm mb-2">
      <Timer className="w-4 h-4 mr-1" />
      <span>{seconds}s</span>
    </div>
  );
}
