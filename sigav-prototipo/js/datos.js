const SIGAV = {
  estudiante: {
    nombre: 'Angelo',
    nombreCompleto: 'Angelo López',
    codigo: '20260001',
    programa: 'Pregrado en Ingeniería de Sistemas'
  },

  profesor: {
    nombre: 'Carlos',
    nombreCompleto: 'Carlos Ramírez',
    materias: [
      { codigo: 'MAT-202', nombre: 'Cálculo II', estudiantes: 30, notasRegistradas: 18, estado: 'En progreso' },
      { codigo: 'PRG-101', nombre: 'Programación I', estudiantes: 28, notasRegistradas: 17, estado: 'En progreso' },
      { codigo: 'BDD-201', nombre: 'Bases de datos', estudiantes: 25, notasRegistradas: 25, estado: 'Completo' }
    ]
  },

  materiasDisponibles: [
    { codigo: 'MAT-202', nombre: 'Cálculo II', creditos: 3, horario: 'Lunes 8:00–10:00', dias: ['Lunes'], inicio: '08:00', fin: '10:00', cupos: 5, valor: 350000 },
    { codigo: 'FIS-101', nombre: 'Física I', creditos: 4, horario: 'Martes 10:00–12:00', dias: ['Martes'], inicio: '10:00', fin: '12:00', cupos: 0, valor: 400000 },
    { codigo: 'BDD-201', nombre: 'Bases de datos', creditos: 3, horario: 'Lunes 9:00–11:00', dias: ['Lunes'], inicio: '09:00', fin: '11:00', cupos: 12, valor: 300000 },
    { codigo: 'ETI-102', nombre: 'Ética profesional', creditos: 2, horario: 'Jueves 14:00–16:00', dias: ['Jueves'], inicio: '14:00', fin: '16:00', cupos: 20, valor: 250000 },
    { codigo: 'PRG-202', nombre: 'Programación II', creditos: 4, horario: 'Miércoles 8:00–10:00', dias: ['Miércoles'], inicio: '08:00', fin: '10:00', cupos: 8, valor: 0 },
    { codigo: 'EST-201', nombre: 'Estadística', creditos: 3, horario: 'Viernes 8:00–10:00', dias: ['Viernes'], inicio: '08:00', fin: '10:00', cupos: 15, valor: 0 }
  ],

  materiasDelPeriodo: [
    { codigo: 'MAT-202', nombre: 'Cálculo II', creditos: 3, estado: 'En progreso' },
    { codigo: 'PRG-202', nombre: 'Programación II', creditos: 4, estado: 'En progreso' },
    { codigo: 'BDD-201', nombre: 'Bases de datos', creditos: 3, estado: 'Aprobado' },
    { codigo: 'ETI-102', nombre: 'Ética profesional', creditos: 2, estado: 'Aprobado' }
  ],

  limiteCreditos: 24,
  seleccionInicial: ['MAT-202', 'BDD-201', 'ETI-102', 'PRG-202'],
  periodoActivo: '2026-2',

  periodos: [
    { nombre: '2026-2', estado: 'Activo', inicio: '2026-08-01', fin: '2026-12-15', plazoInicio: '2026-07-15', plazoFin: '2026-11-28' },
    { nombre: '2026-1', estado: 'Finalizado', inicio: '2026-02-01', fin: '2026-06-30', plazoInicio: '2026-01-10', plazoFin: '2026-02-28' },
    { nombre: '2027-1', estado: 'Próximo', inicio: '2027-02-01', fin: '2027-06-30', plazoInicio: '2026-12-01', plazoFin: '2027-02-15' },
    { nombre: '2025-2', estado: 'Finalizado', inicio: '2025-08-01', fin: '2025-12-15', plazoInicio: '2025-07-10', plazoFin: '2025-08-30' },
    { nombre: '2025-1', estado: 'Finalizado', inicio: '2025-02-01', fin: '2025-06-30', plazoInicio: '2025-01-10', plazoFin: '2025-02-28' }
  ],

  estudiantesCalculo2: [
    { codigo: '20260001', nombre: 'Angelo López', nota: '4.5', observacion: 'Participación activa' },
    { codigo: '20260002', nombre: 'Valentina Ruiz', nota: '3.8', observacion: '' },
    { codigo: '20260003', nombre: 'Juan David Moreno', nota: '6.2', observacion: 'Revisar nota' },
    { codigo: '20260004', nombre: 'María Fernanda Ortiz', nota: '4.1', observacion: '' },
    { codigo: '20260005', nombre: 'Santiago Vargas', nota: '', observacion: '' },
    { codigo: '20260006', nombre: 'Camila Beltrán', nota: '', observacion: '' }
  ],

  configuracion: {
    plazoProximo: true,
    fechaLimiteMatricula: '28 de noviembre de 2026',
    fechaLimitePago: '28 de noviembre de 2026, 23:59',
    intentosRestantes: 2
  }
};

window.SIGAV = SIGAV;
