import { format, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export const fDate = (date: string | number | Date) => {
  return format(new Date(date), 'dd MMMM yyyy');
};

export const fDateTime = (date: string | number | Date) => {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
};

export const fDateTimeSuffix = (date: string | number | Date) => {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
};

export const fToNow = (date: string | number | Date) => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
};
