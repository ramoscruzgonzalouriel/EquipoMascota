/* =========================================
   MASCOTA VIRTUAL ACADEMICA
   ========================================= */


/* =========================================
   1. NAVEGACION
   ========================================= */

const botonesMenu = document.querySelectorAll(".opcion");

function mostrarSeccion(nombre) {
    document.querySelectorAll(".seccion").forEach(seccion => {
        seccion.classList.remove("activa");
    });

    botonesMenu.forEach(boton => {
        boton.classList.remove("activa");
    });

    const seccion = document.getElementById(nombre);
    if (seccion) {
        seccion.classList.add("activa");
    }

    const boton = document.querySelector(`.opcion[data-seccion="${nombre}"]`);
    if (boton) {
        boton.classList.add("activa");
    }

    if (nombre === "notificaciones") {
        mostrarNotificaciones();
    }
}

botonesMenu.forEach(boton => {
    boton.addEventListener("click", () => {
        mostrarSeccion(boton.dataset.seccion);
    });
});


/* =========================================
   2. FECHA ACTUAL
   ========================================= */

const hoy = new Date();

const elemFechaActual = document.getElementById("fechaActual");
if (elemFechaActual) {
    elemFechaActual.textContent = hoy.toLocaleDateString("es-MX", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}


/* =========================================
   3. DATOS DE LA MASCOTA
   ========================================= */

let mascota = JSON.parse(
    localStorage.getItem("mascotaAcademica")
) || {
    nombre: "Lobito",
    accesorio: "",
    experiencia: 0,
    nivel: 1,
    emocion: "Feliz"
};

function guardarDatosMascota() {
    localStorage.setItem("mascotaAcademica", JSON.stringify(mascota));
}

function calcularNivel() {
    mascota.nivel = Math.floor(mascota.experiencia / 100) + 1;
}

function obtenerEmojiEmocion() {
    switch (mascota.emocion) {
        case "Feliz":
            return "😊";
        case "Emocionado":
            return "🤩";
        case "Cansado":
            return "😴";
        case "Triste":
            return "😢";
        default:
            return "🐺";
    }
}

function obtenerMensaje() {
    switch (mascota.emocion) {
        case "Feliz":
            return "¡Estoy listo para acompañarte en tus actividades!";
        case "Emocionado":
            return "¡Estoy muy orgulloso de ti! ¡Sigamos avanzando!";
        case "Cansado":
            return "Un pequeño descanso también es importante.";
        case "Triste":
            return "No te rindas, mañana será una nueva oportunidad.";
        default:
            return "¡Vamos a estudiar juntos!";
    }
}

function actualizarMascota() {
    calcularNivel();

    const xpActual = mascota.experiencia % 100;

    document.getElementById("nombreInicio").textContent = mascota.nombre;
    document.getElementById("nombrePersonalizacion").textContent = mascota.nombre;
    document.getElementById("lobitoInicio").textContent = "🐺" + mascota.accesorio;
    document.getElementById("lobitoPersonalizacion").textContent = "🐺" + mascota.accesorio;
    document.getElementById("emocionInicio").textContent = obtenerEmojiEmocion() + " " + mascota.emocion;
    document.getElementById("emocionPersonalizacion").textContent = obtenerEmojiEmocion() + " " + mascota.emocion;
    document.getElementById("mensajeMascota").textContent = obtenerMensaje();
    document.getElementById("nivelInicio").textContent = mascota.nivel;
    document.getElementById("nivelProgreso").textContent = mascota.nivel;
    document.getElementById("experienciaInicio").textContent = mascota.experiencia + " XP";
    document.getElementById("experienciaProgreso").textContent = mascota.experiencia + " XP";
    document.getElementById("textoXPInicio").textContent = `${xpActual} / 100 XP`;
    document.getElementById("textoXPProgreso").textContent = `${xpActual} / 100 XP`;
    document.getElementById("barraXPInicio").style.width = xpActual + "%";
    document.getElementById("barraXPProgreso").style.width = xpActual + "%";

    guardarDatosMascota();
}


/* =========================================
   4. SISTEMA DE EXPERIENCIA
   ========================================= */

function agregarExperiencia(cantidad) {
    const nivelAnterior = mascota.nivel;
    mascota.experiencia += cantidad;
    calcularNivel();
    mascota.emocion = "Emocionado";

    if (mascota.nivel > nivelAnterior) {
        alert(`¡Felicidades! ${mascota.nombre} subió al nivel ${mascota.nivel} 🏆`);
    }

    actualizarMascota();
}


/* =========================================
   5. PERSONALIZACION DE LA MASCOTA
   ========================================= */

document.getElementById("guardarMascota").addEventListener("click", () => {
    const nombre = document.getElementById("nombreMascota").value.trim();
    const accesorio = document.getElementById("accesorioMascota").value;

    if (nombre !== "") {
        mascota.nombre = nombre;
    }

    mascota.accesorio = accesorio;
    actualizarMascota();
    alert("¡Tu lobito ahora tiene una nueva apariencia! 💙");
});

document.getElementById("botonDescansar").addEventListener("click", () => {
    mascota.emocion = "Feliz";
    actualizarMascota();
    alert(`${mascota.nombre} ha descansado. ¡Está feliz otra vez! 🐺`);
});


/* =========================================
   6. DATOS DE ACTIVIDADES
   ========================================= */

let actividades = JSON.parse(
    localStorage.getItem("actividadesAcademicas")
) || [];

actividades = actividades.map(actividad => ({
    ...actividad,
    id: actividad.id || Date.now() + Math.random(),
    completada: actividad.completada === true,
    importancia: actividad.importancia || "Casual"
}));

function guardarActividades() {
    localStorage.setItem("actividadesAcademicas", JSON.stringify(actividades));
}

function obtenerFechaLocal(fecha) {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    return `${anio}-${mes}-${dia}`;
}


/* =========================================
   7. CALENDARIO
   ========================================= */

let fechaCalendario = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
let fechaSeleccionada = obtenerFechaLocal(hoy);

function mostrarCalendario() {
    const anio = fechaCalendario.getFullYear();
    const mes = fechaCalendario.getMonth();

    document.getElementById("mesActual").textContent =
        fechaCalendario.toLocaleDateString("es-MX", {
            month: "long",
            year: "numeric"
        });

    const primerDia = new Date(anio, mes, 1);
    const ultimoDia = new Date(anio, mes + 1, 0);

    let inicio = primerDia.getDay();
    inicio = inicio === 0 ? 6 : inicio - 1;

    const totalDias = ultimoDia.getDate();
    const diasMesAnterior = new Date(anio, mes, 0).getDate();
    const contenedor = document.getElementById("diasCalendario");
    contenedor.innerHTML = "";

    for (let i = 0; i < 42; i++) {
        let fecha;
        let otroMes = false;

        if (i < inicio) {
            const dia = diasMesAnterior - inicio + i + 1;
            fecha = new Date(anio, mes - 1, dia);
            otroMes = true;
        } else if (i >= inicio + totalDias) {
            const dia = i - inicio - totalDias + 1;
            fecha = new Date(anio, mes + 1, dia);
            otroMes = true;
        } else {
            const dia = i - inicio + 1;
            fecha = new Date(anio, mes, dia);
        }

        const fechaTexto = obtenerFechaLocal(fecha);
        const boton = document.createElement("button");
        boton.className = "dia-calendario";
        boton.textContent = fecha.getDate();

        if (otroMes) boton.classList.add("otro-mes");
        if (fechaTexto === obtenerFechaLocal(hoy)) boton.classList.add("hoy");
        if (fechaTexto === fechaSeleccionada) boton.classList.add("seleccionado");

        const tieneActividad = actividades.some(actividad => actividad.fecha === fechaTexto);
        if (tieneActividad) {
            const punto = document.createElement("span");
            punto.className = "marca-actividad";
            boton.appendChild(punto);
        }

        boton.addEventListener("click", () => {
            fechaSeleccionada = fechaTexto;
            if (otroMes) {
                fechaCalendario = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
            }
            mostrarCalendario();
            mostrarActividadesDia();
        });

        contenedor.appendChild(boton);
    }
}


/* =========================================
   8. ACTIVIDADES DEL DIA
   ========================================= */

function mostrarActividadesDia() {
    const lista = document.getElementById("listaActividadesDia");
    const fecha = new Date(fechaSeleccionada + "T12:00:00");

    document.getElementById("tituloDia").textContent =
        fecha.toLocaleDateString("es-MX", {
            weekday: "long",
            day: "numeric",
            month: "long"
        });

    lista.innerHTML = "";

    const actividadesDia = actividades.filter(actividad => actividad.fecha === fechaSeleccionada);

    if (actividadesDia.length === 0) {
        lista.innerHTML = `
            <div class="mensaje-vacio">
                <span>🐺</span>
                <p>No tienes actividades para este día.</p>
            </div>
        `;
        return;
    }

    actividadesDia.forEach(actividad => {
        const elemento = document.createElement("div");
        elemento.className = "actividad-item";
        if (actividad.completada) elemento.classList.add("completada");

        const titulo = document.createElement("h3");
        titulo.textContent = actividad.nombre;

        const tipo = document.createElement("p");
        tipo.textContent = "Tipo: " + actividad.tipo + " | Importancia: " + (actividad.importancia || "Casual");

        const descripcion = document.createElement("p");
        descripcion.textContent = actividad.descripcion || "Sin descripción.";

        elemento.appendChild(titulo);
        elemento.appendChild(tipo);
        elemento.appendChild(descripcion);

        const acciones = document.createElement("div");
        acciones.className = "acciones-actividad";

        if (!actividad.completada) {
            const completar = document.createElement("button");
            completar.className = "boton-completar";
            completar.textContent = "✓ Completar";
            completar.addEventListener("click", () => completarActividad(actividad.id));
            acciones.appendChild(completar);
        } else {
            const etiqueta = document.createElement("span");
            etiqueta.textContent = "✅ Completada";
            acciones.appendChild(etiqueta);
        }

        const eliminar = document.createElement("button");
        eliminar.className = "boton-eliminar";
        eliminar.textContent = "Eliminar";
        eliminar.addEventListener("click", () => eliminarActividad(actividad.id));
        acciones.appendChild(eliminar);

        elemento.appendChild(acciones);
        lista.appendChild(elemento);
    });
}


/* =========================================
   9. FORMULARIO DE ACTIVIDADES Y NOTIFICACIONES
   ========================================= */

let notificaciones = JSON.parse(
    localStorage.getItem("notificacionesAcademicas")
) || [];

function guardarNotificaciones() {
    localStorage.setItem("notificacionesAcademicas", JSON.stringify(notificaciones));
}

function generarNotificacionAutomatica(act) {
    let mensaje = "";
    if (act.importancia === "Alta importancia") {
        mensaje = `🚨 [ALTA IMPORTANCIA] Recordatorio diario: Tienes pendiente urgente "${act.nombre}" programado para el ${act.fecha}.`;
    } else if (act.importancia === "Importante") {
        mensaje = `⚠️ [Importante] No olvides tu actividad: "${act.nombre}" (Fecha límite: ${act.fecha}).`;
    } else {
        mensaje = `📌 [Casual] Nueva actividad agregada: "${act.nombre}" para el ${act.fecha}.`;
    }

    notificaciones.unshift({
        id: Date.now() + Math.random(),
        texto: mensaje,
        fecha: obtenerFechaLocal(new Date())
    });
    guardarNotificaciones();
}

function obtenerAlertasPendientes() {
    const fechaHoy = obtenerFechaLocal(new Date());
    const pendientes = actividades
        .filter(act => !act.completada)
        .sort((a, b) => a.fecha.localeCompare(b.fecha));

    if (pendientes.length === 0) {
        return [];
    }

    const alertas = [];

    const urgentesHoy = pendientes.filter(act => act.fecha <= fechaHoy);
    if (urgentesHoy.length > 0) {
        alertas.push({
            clase: "alta-importancia",
            titulo: `⏰ Tienes ${urgentesHoy.length} ${urgentesHoy.length === 1 ? "tarea pendiente para hoy o vencida" : "tareas pendientes para hoy o vencidas"}`,
            detalle: urgentesHoy.map(act => `${act.nombre} (${act.fecha})`).join(" • "),
            fecha: fechaHoy
        });
    }

    const altaImp = pendientes.filter(act => act.importancia === "Alta importancia");
    if (altaImp.length > 0) {
        alertas.push({
            clase: "alta-importancia",
            titulo: `🚨 ${altaImp.length} ${altaImp.length === 1 ? "tarea de alta importancia pendiente" : "tareas de alta importancia pendientes"}`,
            detalle: altaImp.map(act => `${act.nombre} — entrega ${act.fecha}`).join(" • "),
            fecha: fechaHoy
        });
    }

    alertas.push({
        clase: "importante",
        titulo: `📚 Recordatorio: Tienes ${pendientes.length} ${pendientes.length === 1 ? "tarea pendiente" : "tareas pendientes"} en total`,
        detalle: `Próxima entrega: "${pendientes[0].nombre}" el ${pendientes[0].fecha} (${pendientes[0].importancia || "Casual"}).`,
        fecha: fechaHoy
    });

    return alertas;
}

function actualizarIndicadorNotificaciones(totalAlertas) {
    const botonNotif = document.querySelector('.opcion[data-seccion="notificaciones"]');
    if (!botonNotif) return;

    let badge = botonNotif.querySelector(".badge-notif");
    if (!badge) {
        badge = document.createElement("span");
        badge.className = "badge-notif";
        botonNotif.appendChild(badge);
    }

    if (totalAlertas > 0) {
        badge.textContent = totalAlertas;
        badge.style.display = "inline-flex";
    } else {
        badge.style.display = "none";
    }
}

function mostrarNotificaciones() {
    const contenedor = document.getElementById("listaNotificaciones");
    if (!contenedor) return;

    const alertasPendientes = obtenerAlertasPendientes();
    actualizarIndicadorNotificaciones(alertasPendientes.length + notificaciones.length);

    if (alertasPendientes.length === 0 && notificaciones.length === 0) {
        contenedor.innerHTML = `
            <div class="mensaje-vacio">
                <span>🔔</span>
                <h3>¡Todo tranquilo por ahora!</h3>
                <p>No tienes tareas pendientes ni avisos nuevos.</p>
            </div>
        `;
        return;
    }

    contenedor.innerHTML = "";

    alertasPendientes.forEach(alerta => {
        const item = document.createElement("div");
        item.className = `actividad-item ${alerta.clase}`;
        item.innerHTML = `
            <h3>${alerta.titulo}</h3>
            <p>${alerta.detalle}</p>
            <p>📅 Aviso activo al ${alerta.fecha}</p>
        `;
        contenedor.appendChild(item);
    });

    notificaciones.forEach(notif => {
        const item = document.createElement("div");
        item.className = "actividad-item casual";
        item.innerHTML = `
            <h3>${notif.texto}</h3>
            <p>📅 Registrada el: ${notif.fecha}</p>
        `;
        contenedor.appendChild(item);
    });
}

const formulario = document.getElementById("formularioActividad");

function abrirFormulario() {
    formulario.classList.remove("oculto");
    document.getElementById("fechaActividad").value = fechaSeleccionada;
    formulario.scrollIntoView({ behavior: "smooth", block: "start" });
}

function cerrarFormulario() {
    formulario.classList.add("oculto");
}

document.getElementById("abrirFormulario").addEventListener("click", abrirFormulario);
document.getElementById("cerrarFormulario").addEventListener("click", cerrarFormulario);
document.getElementById("cancelarActividad").addEventListener("click", cerrarFormulario);

function irAgregarActividad() {
    mostrarSeccion("calendario");
    abrirFormulario();
}

document.getElementById("guardarActividad").addEventListener("click", () => {
    const nombre = document.getElementById("nombreActividad").value.trim();
    const fecha = document.getElementById("fechaActividad").value;
    const descripcion = document.getElementById("descripcionActividad").value.trim();
    const tipo = document.getElementById("tipoActividad").value;
    const importancia = document.getElementById("importanciaActividad").value;

    if (nombre === "" || fecha === "") {
        alert("Por favor, escribe el nombre y la fecha de la actividad.");
        return;
    }

    const nuevaActividad = {
        id: Date.now(),
        nombre: nombre,
        fecha: fecha,
        descripcion: descripcion,
        tipo: tipo,
        importancia: importancia,
        completada: false
    };

    actividades.push(nuevaActividad);
    generarNotificacionAutomatica(nuevaActividad);
    guardarActividades();

    fechaSeleccionada = fecha;
    const fechaNueva = new Date(fecha + "T12:00:00");
    fechaCalendario = new Date(fechaNueva.getFullYear(), fechaNueva.getMonth(), 1);

    document.getElementById("nombreActividad").value = "";
    document.getElementById("fechaActividad").value = "";
    document.getElementById("descripcionActividad").value = "";
    document.getElementById("tipoActividad").value = "Tarea";
    document.getElementById("importanciaActividad").value = "Casual";

    cerrarFormulario();
    actualizarTodo();
    alert("¡Tu actividad se agregó correctamente y se programaron sus avisos! 💙");
});


/* =========================================
   10. COMPLETAR ACTIVIDADES
   ========================================= */

function completarActividad(id) {
    const actividad = actividades.find(actividad => actividad.id === id);
    if (!actividad || actividad.completada) return;

    actividad.completada = true;
    guardarActividades();
    agregarExperiencia(20);
    actualizarTodo();
    alert(`¡Excelente trabajo! Ganaste 20 XP para ${mascota.nombre}. 🐺`);
}


/* =========================================
   11. ELIMINAR ACTIVIDADES
   ========================================= */

function eliminarActividad(id) {
    const confirmar = confirm("¿Estás seguro de que deseas eliminar esta actividad?");
    if (!confirmar) return;

    actividades = actividades.filter(actividad => actividad.id !== id);
    guardarActividades();
    actualizarTodo();
}


/* =========================================
   12. LISTA GENERAL DE TAREAS (Ordenadas por cercanía)
   ========================================= */

function crearElementoTarea(actividad) {
    const elemento = document.createElement("div");

    let claseImp = "actividad-item ";
    if (actividad.importancia === "Alta importancia") {
        claseImp += "alta-importancia";
    } else if (actividad.importancia === "Importante") {
        claseImp += "importante";
    } else {
        claseImp += "casual";
    }

    elemento.className = claseImp;
    if (actividad.completada) elemento.classList.add("completada");

    const titulo = document.createElement("h3");
    titulo.textContent = actividad.nombre;

    const fecha = document.createElement("p");
    fecha.textContent = "📅 Fecha límite: " + actividad.fecha;

    const tipo = document.createElement("p");
    tipo.textContent = "Tipo: " + actividad.tipo + " | ⚡ Importancia: " + (actividad.importancia || "Casual");

    elemento.appendChild(titulo);
    elemento.appendChild(fecha);
    elemento.appendChild(tipo);

    if (actividad.descripcion) {
        const descripcion = document.createElement("p");
        descripcion.textContent = actividad.descripcion;
        elemento.appendChild(descripcion);
    }

    if (!actividad.completada) {
        const boton = document.createElement("button");
        boton.className = "boton-completar";
        boton.textContent = "✓ Completar";
        boton.addEventListener("click", () => completarActividad(actividad.id));
        elemento.appendChild(boton);
    } else {
        const etiqueta = document.createElement("p");
        etiqueta.textContent = "✅ Actividad completada";
        elemento.appendChild(etiqueta);
    }

    return elemento;
}

function mostrarListaTareas() {
    const pendientes = document.getElementById("listaPendientes");
    const completadas = document.getElementById("listaCompletadas");

    pendientes.innerHTML = "";
    completadas.innerHTML = "";

    const tareasPendientes = actividades
        .filter(actividad => !actividad.completada)
        .sort((a, b) => a.fecha.localeCompare(b.fecha));

    const tareasCompletadas = actividades.filter(actividad => actividad.completada);

    if (tareasPendientes.length === 0) {
        pendientes.innerHTML = `
            <div class="mensaje-vacio">
                <span>🎉</span>
                <p>¡No tienes actividades pendientes!</p>
            </div>
        `;
    }

    if (tareasCompletadas.length === 0) {
        completadas.innerHTML = `
            <div class="mensaje-vacio">
                <span>💙</span>
                <p>Todavía no has completado actividades.</p>
            </div>
        `;
    }

    tareasPendientes.forEach(actividad => pendientes.appendChild(crearElementoTarea(actividad)));
    tareasCompletadas.forEach(actividad => completadas.appendChild(crearElementoTarea(actividad)));
}


/* =========================================
   13. PROXIMAS ACTIVIDADES
   ========================================= */

function mostrarProximasActividades() {
    const contenedor = document.getElementById("proximasActividades");
    contenedor.innerHTML = "";

    const fechaHoy = obtenerFechaLocal(hoy);

    const proximas = actividades
        .filter(actividad => !actividad.completada && actividad.fecha >= fechaHoy)
        .sort((a, b) => a.fecha.localeCompare(b.fecha))
        .slice(0, 3);

    if (proximas.length === 0) {
        contenedor.innerHTML = `
            <div class="mensaje-vacio">
                <span>✨</span>
                <p>No tienes actividades próximas.</p>
            </div>
        `;
        return;
    }

    proximas.forEach(actividad => {
        const elemento = document.createElement("div");
        elemento.className = "actividad-item";

        const titulo = document.createElement("h3");
        titulo.textContent = actividad.nombre;

        const fecha = document.createElement("p");
        fecha.textContent = "📅 " + actividad.fecha;

        const tipo = document.createElement("p");
        tipo.textContent = actividad.tipo + " (" + (actividad.importancia || "Casual") + ")";

        elemento.appendChild(titulo);
        elemento.appendChild(fecha);
        elemento.appendChild(tipo);

        contenedor.appendChild(elemento);
    });
}


/* =========================================
   14. RESUMEN Y ESTADISTICAS
   ========================================= */

function actualizarResumen() {
    const pendientes = actividades.filter(actividad => !actividad.completada);
    const completadas = actividades.filter(actividad => actividad.completada);

    document.getElementById("totalTareas").textContent = pendientes.length;
    document.getElementById("totalActividades").textContent = actividades.length;
    document.getElementById("completadasProgreso").textContent = completadas.length;
}


/* =========================================
   15. SISTEMA DE HORARIOS ACADEMICOS
   ========================================= */

let horarios = JSON.parse(
    localStorage.getItem("horariosAcademicos")
) || [];

horarios = horarios.map(horario => ({
    ...horario,
    id: horario.id || Date.now() + Math.random(),
    nombre: horario.nombre || "",
    dia: horario.dia || "Lunes",
    horaInicio: horario.horaInicio || "",
    horaFin: horario.horaFin || "",
    aula: horario.aula || "",
    edificio: horario.edificio || "",
    profesor: horario.profesor || ""
}));

let horarioEditandoId = null;

const diasSemana = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo"
];

function guardarHorarios() {
    localStorage.setItem("horariosAcademicos", JSON.stringify(horarios));
}

const formularioHorario = document.getElementById("formularioHorario");

function abrirFormularioHorario() {
    if (!formularioHorario) return;
    formularioHorario.classList.remove("oculto");
    formularioHorario.scrollIntoView({ behavior: "smooth", block: "start" });
}

function limpiarFormularioHorario() {
    document.getElementById("nombreMateria").value = "";
    document.getElementById("diaMateria").value = "Lunes";
    document.getElementById("horaInicio").value = "";
    document.getElementById("horaFin").value = "";
    document.getElementById("aulaMateria").value = "";
    document.getElementById("edificioMateria").value = "";
    document.getElementById("profesorMateria").value = "";

    horarioEditandoId = null;
    document.getElementById("tituloFormularioHorario").textContent = "Registrar materia 📚";
    document.getElementById("guardarHorario").textContent = "Guardar materia";
}

function cerrarFormularioHorario() {
    if (!formularioHorario) return;
    formularioHorario.classList.add("oculto");
    limpiarFormularioHorario();
}

document.getElementById("abrirFormularioHorario").addEventListener("click", () => {
    limpiarFormularioHorario();
    abrirFormularioHorario();
});

document.getElementById("cerrarFormularioHorario").addEventListener("click", cerrarFormularioHorario);
document.getElementById("cancelarHorario").addEventListener("click", cerrarFormularioHorario);

document.getElementById("guardarHorario").addEventListener("click", () => {
    const nombre = document.getElementById("nombreMateria").value.trim();
    const dia = document.getElementById("diaMateria").value;
    const horaInicio = document.getElementById("horaInicio").value;
    const horaFin = document.getElementById("horaFin").value;
    const aula = document.getElementById("aulaMateria").value.trim();
    const edificio = document.getElementById("edificioMateria").value.trim();
    const profesor = document.getElementById("profesorMateria").value.trim();

    if (
        nombre === "" ||
        horaInicio === "" ||
        horaFin === "" ||
        aula === "" ||
        edificio === ""
    ) {
        alert("Completa el nombre, horario, aula y edificio.");
        return;
    }

    if (horaFin <= horaInicio) {
        alert("La hora de finalización debe ser posterior a la hora de inicio.");
        return;
    }

    const datosHorario = {
        nombre: nombre,
        dia: dia,
        horaInicio: horaInicio,
        horaFin: horaFin,
        aula: aula,
        edificio: edificio,
        profesor: profesor
    };

    if (horarioEditandoId !== null) {
        horarios = horarios.map(horario => {
            if (horario.id === horarioEditandoId) {
                return {
                    ...horario,
                    ...datosHorario
                };
            }
            return horario;
        });
        alert("¡El horario se actualizó correctamente! 💙");
    } else {
        horarios.push({
            id: Date.now() + Math.random(),
            ...datosHorario
        });
        alert("¡Tu materia se registró correctamente! 📚");
    }

    guardarHorarios();
    cerrarFormularioHorario();
    mostrarHorarios();
});

function mostrarHorarios() {
    const lista = document.getElementById("listaHorarios");
    if (!lista) return;

    lista.innerHTML = "";

    const filtroSelect = document.getElementById("filtroDia");
    const filtro = filtroSelect ? filtroSelect.value : "Todos";

    const horariosFiltrados = horarios
        .filter(horario => filtro === "Todos" || horario.dia === filtro)
        .sort((a, b) => {
            const diferenciaDia = diasSemana.indexOf(a.dia) - diasSemana.indexOf(b.dia);
            if (diferenciaDia !== 0) {
                return diferenciaDia;
            }
            return (a.horaInicio || "").localeCompare(b.horaInicio || "");
        });

    const totalMateriasElem = document.getElementById("totalMaterias");
    if (totalMateriasElem) {
        totalMateriasElem.textContent = horarios.length;
    }

    const edificios = new Set(
        horarios
            .map(horario => (horario.edificio || "").trim().toLowerCase())
            .filter(ed => ed !== "")
    );

    const totalEdificiosElem = document.getElementById("totalEdificios");
    if (totalEdificiosElem) {
        totalEdificiosElem.textContent = edificios.size;
    }

    if (horariosFiltrados.length === 0) {
        lista.innerHTML = `
            <div class="mensaje-vacio">
                <span>📚</span>
                <h3>No hay clases registradas</h3>
                <p>Agrega una materia para comenzar a organizar tu horario.</p>
            </div>
        `;
        return;
    }

    const diasMostrar = filtro === "Todos" ? diasSemana : [filtro];

    diasMostrar.forEach(dia => {
        const clasesDia = horariosFiltrados.filter(horario => horario.dia === dia);
        if (clasesDia.length === 0) return;

        const grupo = document.createElement("div");
        grupo.className = "grupo-dia";

        const titulo = document.createElement("h3");
        titulo.textContent = "📅 " + dia;
        grupo.appendChild(titulo);

        clasesDia.forEach(horario => {
            const tarjeta = document.createElement("div");
            tarjeta.className = "clase-item";

            const informacion = document.createElement("div");
            informacion.className = "clase-informacion";

            const nombre = document.createElement("h4");
            nombre.textContent = horario.nombre;

            const hora = document.createElement("div");
            hora.className = "clase-hora";
            hora.textContent = horario.horaInicio + " - " + horario.horaFin;

            const aula = document.createElement("p");
            aula.textContent = "📍 Aula: " + horario.aula;

            const edificio = document.createElement("p");
            edificio.textContent = "🏫 Edificio: " + horario.edificio;

            informacion.appendChild(nombre);
            informacion.appendChild(hora);
            informacion.appendChild(aula);
            informacion.appendChild(edificio);

            if (horario.profesor) {
                const profesor = document.createElement("p");
                profesor.textContent = "👩‍🏫 Profesor: " + horario.profesor;
                informacion.appendChild(profesor);
            }

            const acciones = document.createElement("div");
            acciones.className = "acciones-clase";

            const botonEditar = document.createElement("button");
            botonEditar.className = "boton-editar";
            botonEditar.textContent = "✏️ Editar";
            botonEditar.addEventListener("click", () => editarHorario(horario.id));

            const botonEliminar = document.createElement("button");
            botonEliminar.className = "boton-borrar-clase";
            botonEliminar.textContent = "🗑 Eliminar";
            botonEliminar.addEventListener("click", () => eliminarHorario(horario.id));

            acciones.appendChild(botonEditar);
            acciones.appendChild(botonEliminar);

            tarjeta.appendChild(informacion);
            tarjeta.appendChild(acciones);

            grupo.appendChild(tarjeta);
        });

        lista.appendChild(grupo);
    });
}

function editarHorario(id) {
    const horario = horarios.find(elemento => elemento.id === id);
    if (!horario) return;

    horarioEditandoId = id;

    document.getElementById("nombreMateria").value = horario.nombre;
    document.getElementById("diaMateria").value = horario.dia;
    document.getElementById("horaInicio").value = horario.horaInicio;
    document.getElementById("horaFin").value = horario.horaFin;
    document.getElementById("aulaMateria").value = horario.aula;
    document.getElementById("edificioMateria").value = horario.edificio;
    document.getElementById("profesorMateria").value = horario.profesor || "";

    document.getElementById("tituloFormularioHorario").textContent = "Editar materia ✏️";
    document.getElementById("guardarHorario").textContent = "Guardar cambios";

    abrirFormularioHorario();
}

function eliminarHorario(id) {
    const confirmar = confirm("¿Estás seguro de que deseas eliminar esta materia?");
    if (!confirmar) return;

    horarios = horarios.filter(horario => horario.id !== id);
    guardarHorarios();
    mostrarHorarios();
}

document.getElementById("filtroDia").addEventListener("change", mostrarHorarios);


/* =========================================
   16. ACTUALIZAR TODA LA APLICACION
   ========================================= */

function actualizarTodo() {
    mostrarCalendario();
    mostrarActividadesDia();
    mostrarListaTareas();
    mostrarProximasActividades();
    actualizarResumen();
    actualizarMascota();
    mostrarHorarios();
    mostrarNotificaciones();
}


/* =========================================
   17. CAMBIAR DE MES
   ========================================= */

document.getElementById("mesAnterior").addEventListener("click", () => {
    fechaCalendario = new Date(
        fechaCalendario.getFullYear(),
        fechaCalendario.getMonth() - 1,
        1
    );
    mostrarCalendario();
});

document.getElementById("mesSiguiente").addEventListener("click", () => {
    fechaCalendario = new Date(
        fechaCalendario.getFullYear(),
        fechaCalendario.getMonth() + 1,
        1
    );
    mostrarCalendario();
});


/* =========================================
   18. INICIAR APLICACION
   ========================================= */

guardarActividades();
guardarHorarios();
actualizarTodo();