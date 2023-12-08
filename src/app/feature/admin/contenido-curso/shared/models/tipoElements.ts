export interface TodoItem {
    type: string;
    label: string,
    icon: string,
  };

  export const todo: TodoItem[] = [
    {
      type: 'text',
      label: 'Texto',
      icon: 'text-icon',
    },
    {
      type: 'video',
      label: 'Video tuturial',
      icon: 'video-icon',
    },
    {
      type: 'image',
      label: 'Imagen',
      icon: 'image-icon',
    },
  
  ];