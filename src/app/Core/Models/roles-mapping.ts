export const rolesMapping: Record<string, string[]> = {
    'admin': ['', 'clients', 'topics'],  // El rol 'admin' tiene acceso a estos módulos
    'Client': ['mis datos', 'mi aprendizaje', 'topic', 'subtemas', 'examen', 'puntaje'],  // El rol 'Client' tiene acceso a estos módulos  
  };