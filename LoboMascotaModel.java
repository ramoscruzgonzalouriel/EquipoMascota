package com.buap.loboasistente;

public class LoboMascotaModel {
    private String nombre;
    private String estadoActual;
    private int energia;
    private int felicidad;
    private String mensajeInteractivo;
    private String rutaImagenActual;

    // Rutas de los recursos dentro del proyecto de NetBeans
    private final String IMG_FELIZ = "/com/buap/loboasistente/recursos/lobo_feliz.png";
    private final String IMG_ALERTA = "/com/buap/loboasistente/recursos/lobo_alerta.png";
    private final String IMG_ESTUDIO = "/com/buap/loboasistente/recursos/lobo_estudiando.png";
    private final String IMG_DORMIDO = "/com/buap/loboasistente/recursos/lobo_dormido.png";

    public LoboMascotaModel(String nombre) {
        this.nombre = nombre;
        this.energia = 85;
        this.felicidad = 90;
        actualizarEstado("FELIZ");
    }

    public void actualizarEstado(String nuevoEstado) {
        this.estadoActual = nuevoEstado;
        
        switch (nuevoEstado) {
            case "FELIZ":
                this.rutaImagenActual = IMG_FELIZ;
                this.mensajeInteractivo = "¡Listo para tus clases en CU2, Lobo!";
                this.energia = Math.min(this.energia + 5, 100);
                break;
            case "ALERTA":
                this.rutaImagenActual = IMG_ALERTA;
                this.mensajeInteractivo = "⚠️ ¡Es hora de moverse! Tu clase está por iniciar.";
                this.energia = Math.max(this.energia - 10, 0);
                break;
            case "ESTUDIO":
                this.rutaImagenActual = IMG_ESTUDIO;
                this.mensajeInteractivo = "Monitoreando activamente tu horario académico...";
                this.energia = Math.max(this.energia - 15, 0);
                break;
            case "DORMIDO":
                this.rutaImagenActual = IMG_DORMIDO;
                this.mensajeInteractivo = "Zzz... Recuperando energía en el Ecocampus.";
                this.energia = Math.min(this.energia + 25, 100);
                break;
        }
        
        // La felicidad se adapta dinámicamente según los niveles de energía escolar
        this.felicidad = (this.energia < 35) ? Math.max(this.felicidad - 15, 0) : Math.min(this.felicidad + 5, 100);
    }

    // Getters necesarios para el traspaso de información limpia hacia el Controlador
    public String getNombre() { return nombre; }
    public String getEstadoActual() { return estadoActual; }
    public int getEnergia() { return energia; }
    public int getFelicidad() { return felicidad; }
    public String getMensajeInteractivo() { return mensajeInteractivo; }
    public String getRutaImagenActual() { return rutaImagenActual; }
}