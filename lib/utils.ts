import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function groupBy<T>(array: T[], keyFn: (item: T) => string): Record<string, T[]> {
  return array.reduce((result, item) => {
    const key = keyFn(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

export function formatDate(date: string | Date, formatStr: string = 'MMM d, yyyy') {
  return format(new Date(date), formatStr);
}

export function groupByMonth<T extends { date: string }>(items: T[]): Record<string, T[]> {
  const grouped = groupBy(items, (item) => {
    const date = new Date(item.date);
    return format(date, 'MMMM yyyy');
  });
  
  return Object.fromEntries(
    Object.entries(grouped).sort(([a], [b]) => {
      const dateA = new Date(a + ' 1');
      const dateB = new Date(b + ' 1');
      return dateA.getTime() - dateB.getTime();
    })
  );
}