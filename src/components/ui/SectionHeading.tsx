import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeading({ title, subtitle, centered = true, className, ...props }: SectionHeadingProps) {
  return (
    <div className={cn('mb-10', centered ? 'text-center' : 'text-left', className)} {...props}>
      <h2 className="text-3xl md:text-4xl font-serif text-text-dark font-bold tracking-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className={cn("h-1 w-24 bg-saffron mt-6 rounded-full", centered ? "mx-auto" : "")}></div>
    </div>
  );
}
