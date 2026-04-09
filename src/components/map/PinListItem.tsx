import React from 'react';
import { MapPin, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function PinListItem({ pin, index, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200"
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
        <MapPin className="w-4 h-4 text-primary" />
      </div>

      <div className="flex-1 min-w-0">
        <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
          #{index + 1}
        </span>
        <p className="text-sm font-medium text-foreground mt-1.5">
          {pin.address === undefined || pin.address === null ? (
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Loader2 className="w-3 h-3 animate-spin" />
              Fetching address…
            </span>
          ) : pin.address === false ? (
            <span className="text-muted-foreground italic">Address unavailable</span>
          ) : (
            pin.address
          )}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 font-mono">
          {pin.lat.toFixed(5)}, {pin.lng.toFixed(5)}
        </p>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(pin.id)}
        className="flex-shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </motion.div>
  );
}