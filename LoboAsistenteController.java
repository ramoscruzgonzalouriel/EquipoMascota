package com.buap.loboasistente;

import javax.swing.SwingUtilities;

public class LoboAsistenteController {
    private LoboMascotaModel modelo;
    private MascotaVistaView vista;

    public LoboAsistenteController(LoboMascotaModel modelo, MascotaVistaView vista) {
        this.modelo = modelo;
        this.vista = vista;
    }

    /**
     * Sincroniza de manera segura el estado del modelo con los componentes visuales de la vista.
     */
    public void sincronizarComponentesVisuales() {
        SwingUtilities.invokeLater(() -> {
            vista.actualizarPantalla(
                modelo.getNombre(),
                modelo.getEnergia(),
                modelo.getFelicidad(),
                modelo.getMensajeInteractivo(),
                modelo.getRutaImagenActual()
            );
        });
    }

    /**
     * Módulo del asistente de horarios que recibe alertas de clases e interactúa con el alumno.
     */
    public void procesarAlertaClase(String asignatura, String aula, String edificio) {
        System.out.println("[SISTEMA BUAP]: Notificación detectada por reloj interno...");
        
        // Cambiar el comportamiento de la mascota al modo de alerta
        modelo.actualizarEstado("ALERTA");
        sincronizarComponentesVisuales();

        // Lanzar una ventana de diálogo emergente nativa con la información detallada del aula
        SwingUtilities.invokeLater(() -> {
            javax.swing.JOptionPane.showMessageDialog(
                vista,
                "📚 Materia: " + asignatura + "\n" +
                "🏫 Campus: Ecocampus Valsequillo (CU2)\n" +
                "📍 Ubicación: Edificio " + edificio + ", Aula " + aula,
                "LoboAsistente - ¡Alerta de Clase!",
                javax.swing.JOptionPane.INFORMATION_MESSAGE
            );
        });
    }

    /**
     * Método de inicio (Main) que arranca el software completo en Apache NetBeans.
     */
    public static void main(String[] args) {
        // Inicializar los componentes siguiendo el patrón MVC
        LoboMascotaModel modeloLobo = new LoboMascotaModel("LoboAsistente BUAP");
        MascotaVistaView vistaLobo = new MascotaVistaView();
        LoboAsistenteController controlador = new LoboAsistenteController(modeloLobo, vistaLobo);

        // Desplegar la interfaz gráfica de forma segura
        SwingUtilities.invokeLater(() -> {
            vistaLobo.setVisible(true);
            controlador.sincronizarComponentesVisuales();
        });

        // Simulación de una alerta de clase automática en CU2 después de 4 segundos de uso
        try {
            Thread.sleep(4000);
            controlador.procesarAlertaClase("Ingeniería de Software", "Aulas 102", "CU2-Multiaulas");
        } catch (InterruptedException e) {
            System.err.println("[ERROR SISTEMA]: Hilo de tiempo interrumpido.");
        }
    }
}