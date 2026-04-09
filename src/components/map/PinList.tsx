import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { MapPin, MousePointerClick } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import PinListItem from './PinListItem';

export default function PinList({ pins, onDeletePin }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-1 mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Saved Pins</h2>
        </div>
        {pins.length > 0 && (
          <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
            {pins.length} pin{pins.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {pins.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12">
          <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-4">
            <MousePointerClick className="w-7 h-7 text-primary/40" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">No pins yet</p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            Click anywhere on the map to drop a pin
          </p>
        </div>
      ) : (
        <ScrollArea className="flex-1 -mx-1 px-1">
          <div className="space-y-2 pb-2">
            <AnimatePresence mode="popLayout">
              {pins.map((pin, index) => (
                <PinListItem
                  key={pin.id}
                  pin={pin}
                  index={index}
                  onDelete={onDeletePin}
                />
              ))}
            </AnimatePresence>
          </div>
        </ScrollArea>
      )}
    </div>
  );
}