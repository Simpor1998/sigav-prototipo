const MENSAJE_NOTA = 'La nota debe estar entre 0.0 y 5.0';

function validarNota(valor) {
  const texto = String(valor).trim();

  if (!/^\d(\.\d)?$/.test(texto)) {
    return MENSAJE_NOTA;
  }

  const numero = Number(texto);
  if (!Number.isFinite(numero) || numero < 0 || numero > 5) {
    return MENSAJE_NOTA;
  }

  return true;
}

function validarRangoFechas(inicio, fin) {
  const fechaInicio = new Date(inicio);
  const fechaFin = new Date(fin);

  if (Number.isNaN(fechaInicio.getTime()) || Number.isNaN(fechaFin.getTime())) {
    return false;
  }

  return fechaFin > fechaInicio;
}

function validarPlazoMatricula(plazoInicio, plazoFin, inicio, fin) {
  const pi = new Date(plazoInicio);
  const pf = new Date(plazoFin);
  const i = new Date(inicio);
  const f = new Date(fin);

  if ([pi, pf, i, f].some((fecha) => Number.isNaN(fecha.getTime()))) {
    return false;
  }

  return pi >= i && pf <= f;
}

function resolverMateria(materia) {
  if (typeof materia === 'string') {
    return SIGAV.materiasDisponibles.find((item) => item.codigo === materia);
  }
  return SIGAV.materiasDisponibles.find((item) => item.codigo === materia.codigo);
}

function hayCruce(materiaA, materiaB) {
  const a = resolverMateria(materiaA);
  const b = resolverMateria(materiaB);

  if (!a || !b || a.codigo === b.codigo) {
    return false;
  }

  const diaComun = a.dias.some((dia) => b.dias.includes(dia));
  return diaComun && a.inicio < b.fin && b.inicio < a.fin;
}

function validarSeleccionMaterias(seleccion) {
  const errores = [];
  const materias = seleccion.map(resolverMateria).filter(Boolean);

  materias.forEach((materia) => {
    if (materia.cupos <= 0) {
      errores.push(`Sin cupo: ${materia.nombre}`);
    }
  });

  for (let i = 0; i < materias.length; i += 1) {
    for (let j = i + 1; j < materias.length; j += 1) {
      if (hayCruce(materias[i], materias[j])) {
        errores.push(`Cruce de horario entre ${materias[i].nombre} y ${materias[j].nombre}`);
      }
    }
  }

  const creditos = materias.reduce((total, materia) => total + materia.creditos, 0);
  if (creditos > SIGAV.limiteCreditos) {
    errores.push(`Supera el límite de ${SIGAV.limiteCreditos} créditos`);
  }

  return { valida: errores.length === 0, errores };
}

(function ejecutarPruebasDeValidacion() {
  const casos = [
    ['validarNota · caso válido', validarNota('4.5'), true],
    ['validarNota · caso inválido', validarNota('6.2'), MENSAJE_NOTA],
    ['validarRangoFechas · caso válido', validarRangoFechas('2026-08-01', '2026-12-15'), true],
    ['validarRangoFechas · caso inválido', validarRangoFechas('2026-12-15', '2026-08-01'), false],
    ['validarPlazoMatricula · caso válido', validarPlazoMatricula('2026-08-05', '2026-11-28', '2026-08-01', '2026-12-15'), true],
    ['validarPlazoMatricula · caso inválido', validarPlazoMatricula('2026-01-01', '2026-11-28', '2026-08-01', '2026-12-15'), false],
    ['hayCruce · caso válido', hayCruce('MAT-202', 'BDD-201'), true],
    ['hayCruce · caso inválido', hayCruce('MAT-202', 'EST-201'), false],
    ['validarSeleccionMaterias · caso válido', validarSeleccionMaterias(['ETI-102', 'EST-201']), { valida: true, errores: [] }],
    ['validarSeleccionMaterias · caso inválido', validarSeleccionMaterias(['MAT-202', 'BDD-201']).valida, false]
  ];

  console.group('SIGAV · pruebas de validación');
  casos.forEach(([nombre, obtenido, esperado]) => {
    const correcto = JSON.stringify(obtenido) === JSON.stringify(esperado);
    console[correcto ? 'log' : 'error'](`${correcto ? '✓' : '✗'} ${nombre}`, { obtenido, esperado });
  });
  console.groupEnd();
})();

window.validarNota = validarNota;
window.validarRangoFechas = validarRangoFechas;
window.validarPlazoMatricula = validarPlazoMatricula;
window.validarSeleccionMaterias = validarSeleccionMaterias;
window.hayCruce = hayCruce;
