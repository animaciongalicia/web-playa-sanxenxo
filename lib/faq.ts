// Preguntas frecuentes por página (también como datos estructurados FAQPage). Solo datos ya publicados en la web.
export type Pregunta = { q: string; a: string };

export const FAQ: Record<string, Pregunta[]> = {
  '/cuando-ir/': [
    { q: '¿Cuándo es la temporada fuerte en Sanxenxo?', a: 'Del 20 de junio al 29 o 30 de agosto. Del 1 al 15 de junio es el calentamiento, y mayo y septiembre son meses flojos.' },
    { q: '¿Se hacen despedidas en julio y agosto?', a: 'Sí: son los meses con más despedidas. Es más complicado encontrar sitio para grupos, así que conviene reservar con antelación. Hoteles y apartamentos suelen pedir estancias de 3 o 4 noches.' },
    { q: '¿Cómo es Sanxenxo en mayo y en septiembre?', a: 'Mayo es tranquilo: hace fresquito y hay poco abierto. En septiembre hay algunos grupos hasta el 15, unos 3 o 4 cada sábado, y a partir del 20 casi nadie.' },
    { q: '¿Qué pasa de octubre a abril?', a: 'El pueblo está casi cerrado. Es destino del Imserso, con eventos de empresa y turismo gastronómico. No es época de despedidas de mar y fiesta.' },
    { q: '¿Se puede ir disfrazado a los locales?', a: 'Las despedidas se aceptan, pero los locales no permiten los disfraces. Para salir de noche conviene parecer un grupo de amigos y dejar el disfraz para el barco, la playa o una actividad de día.' },
  ],
  '/despedidas/': [
    { q: '¿Qué se puede hacer en una despedida en Sanxenxo?', a: 'Playa, barco privado, actividades como motos de agua, paddle surf o kayak, comidas de grupo, terraceo, tardeo y copas por el puerto de Sanxenxo y Portonovo.' },
    { q: '¿Cuánto cuesta cenar en grupo?', a: 'Hay menús desde unos 25 € por persona y mariscadas de unos 50 € por persona.' },
    { q: '¿Cuándo hay que reservar?', a: 'Con tiempo, sobre todo en julio y agosto, cuando hay más grupos. Di desde el principio que sois un grupo y ten un plan B.' },
    { q: '¿Se aceptan despedidas en los locales?', a: 'Sí. Lo que los locales no permiten son los disfraces.' },
  ],
  '/paraisos/mar/': [
    { q: '¿Cuánto se tarda en llegar a Ons?', a: 'Desde Combarro, Sanxenxo o Portonovo, aproximadamente una hora de ida y otra de vuelta.' },
    { q: '¿Y a las islas Cíes?', a: 'Desde la ría de Pontevedra, unos 90 minutos de ida y otros 90 de vuelta. Pide el día entero.' },
    { q: '¿Hace falta permiso para visitar Ons y Cíes?', a: 'Sí, en Semana Santa y del 15 de mayo al 15 de septiembre. Es una autorización gratuita y personal de la Xunta, que se pide antes de comprar el billete. Fuera de esas fechas, las visitas se hacen con grupos con guía.' },
    { q: 'Si alquilo un barco privado, ¿quién pide el permiso?', a: 'El permiso de fondeo lo solicita el patrón a la Xunta y se concede al barco, así que no hace falta que cada persona saque el suyo.' },
  ],
  '/barcos/': [
    { q: '¿Cuánto dura el alquiler de un barco?', a: 'Los veleros se alquilan por medio día, de 4 horas, o por día entero, de 8 horas. Los yates también, y el yate con motora, por 4 u 8 horas.' },
    { q: '¿Qué incluye el precio?', a: 'El barco, los seguros y el patrón. En los veleros, además, el combustible. En los yates depende, así que conviene preguntarlo al pedir presupuesto.' },
    { q: '¿Desde dónde salen los barcos?', a: 'Casi todos, desde Sanxenxo o Portonovo, y alguno desde Combarro.' },
    { q: '¿Hay fiestas en el barco con otros grupos?', a: 'No. El barco es solo para tu grupo, con música a bordo. No se puede ir ebrio a bordo.' },
  ],
};
