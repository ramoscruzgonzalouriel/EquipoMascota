package com.buap.loboasistente;

import javax.swing.*;
import java.awt.*;
import java.net.URL;

public class MascotaVistaView extends JFrame {
    private JLabel lblNombre;
    private JLabel lblImagenMascota;
    private JLabel lblMensaje;
    private JProgressBar barEnergia;
    private JProgressBar barFelicidad;

    public MascotaVistaView() {
        // Configuración estructural de la ventana principal de escritorio
        setTitle("LoboAsistente BUAP - Control de Horarios");
        setSize(360, 480);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setResizable(false);
        setLayout(new BorderLayout(10, 10));
        getContentPane().setBackground(new Color(244, 246, 249));

        // 1. Cabecera (Nombre de la mascota)
        lblNombre = new JLabel("Cargando...", SwingConstants.CENTER);
        lblNombre.setFont(new Font("Arial", Font.BOLD, 22));
        lblNombre.setForeground(new Color(0, 59, 70));
        add(lblNombre, BorderLayout.NORTH);

        // 2. Panel Central (Contenedor de la Mascota Virtual)
        JPanel panelCentral = new JPanel(new BorderLayout());
        panelCentral.setBackground(Color.WHITE);
        panelCentral.setBorder(BorderFactory.createLineBorder(new Color(220, 224, 230), 2));
        
        lblImagenMascota = new JLabel("", SwingConstants.CENTER);
        panelCentral.add(lblImagenMascota, BorderLayout.CENTER);
        add(panelCentral, BorderLayout.CENTER);

        // 3. Panel Inferior (Métricas de Gamificación y Mensajes)
        JPanel panelInferior = new JPanel();
        panelInferior.setLayout(new BoxLayout(panelInferior, BoxLayout.Y_AXIS));
        panelInferior.setBorder(BorderFactory.createEmptyBorder(15, 20, 15, 20));
        panelInferior.setBackground(new Color(244, 246, 249));

        lblMensaje = new JLabel("Inicializando sistema...", SwingConstants.CENTER);
        lblMensaje.setFont(new Font("Arial", Font.ITALIC, 12));
        lblMensaje.setAlignmentX(Component.CENTER_ALIGNMENT);

        // Barra de Progreso: Energía
        JLabel lblEnergia = new JLabel("Energía de tu Asistente:");
        lblEnergia.setFont(new Font("Arial", Font.BOLD, 11));
        barEnergia = new JProgressBar(0, 100);
        barEnergia.setForeground(new Color(7, 87, 91));
        barEnergia.setStringPainted(true);

        // Barra de Progreso: Felicidad
        JLabel lblFelicidad = new JLabel("Felicidad Académica:");
        lblFelicidad.setFont(new Font("Arial", Font.BOLD, 11));
        barFelicidad = new JProgressBar(0, 100);
        barFelicidad.setForeground(new Color(102, 165, 173));
        barFelicidad.setStringPainted(true);

        // Ensamblado secuencial del panel inferior
        panelInferior.add(lblMensaje);
        panelInferior.add(Box.createVerticalStrut(12));
        panelInferior.add(lblEnergia);
        panelInferior.add(barEnergia);
        panelInferior.add(Box.createVerticalStrut(8));
        panelInferior.add(lblFelicidad);
        panelInferior.add(barFelicidad);
        
        add(panelInferior, BorderLayout.SOUTH);
    }

    /**
     * Recibe los datos actualizados del controlador y redibuja la interfaz al instante.
     */
    public void actualizarPantalla(String nombre, int energia, int felicidad, String mensaje, String rutaImagen) {
        lblNombre.setText(nombre);
        lblMensaje.setText(mensaje);
        barEnergia.setValue(energia);
        barFelicidad.setValue(felicidad);

        // Carga de forma segura la imagen desde la carpeta de recursos de NetBeans
        try {
            URL url = getClass().getResource(rutaImagen);
            if (url != null) {
                ImageIcon iconoOriginal = new ImageIcon(url);
                // Escalado suavizado de imagen de alta calidad para el cuadro de la mascota
                Image imagenEscalada = iconoOriginal.getImage().getScaledInstance(220, 220, Image.SCALE_SMOOTH);
                lblImagenMascota.setIcon(new ImageIcon(imagenEscalada));
            } else {
                lblImagenMascota.setText("[Imagen No Encontrada]");
            }
        } catch (Exception e) {
            System.err.println("[ERROR GRÁFICO]: No se pudo procesar el archivo de imagen: " + rutaImagen);
        }
    }
}
