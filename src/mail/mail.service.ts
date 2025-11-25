import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Reserva } from 'src/reserva/entities/reserva.entity';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    // Configuración del transporte
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', 
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER, 
        pass: process.env.MAIL_PASS, 
      },
    });
  }

  async enviarConfirmacion(destinatario: string, reserva: Reserva) {
    // Asegurarse de que todas las propiedades existan
    const hotelNombre = reserva.hotel?.nombre || 'No definido';
    const hotelDireccion = reserva.hotel?.direccion || 'No definida';
    const hotelPrecio = reserva.hotel?.precio ?? 'No definido';

    // Imagen: principal > url > placeholder
    const hotelImagen = reserva.hotel?.imagenPrincipal 
                        || reserva.hotel?.imagenUrl 
                        || 'https://via.placeholder.com/600x300?text=Hotel+Viaggio';

    const usuarioNombre = reserva.usuario?.nombre || 'Usuario';

    const actividadesHtml = reserva.actividades && reserva.actividades.length > 0
      ? reserva.actividades.map(act => `<li><b>${act.titulo || ''}</b>: ${act.descripcion || ''}</li>`).join('')
      : '<li>No seleccionaste actividades</li>';

    const fechaLlegada = reserva.fechaLlegada ? new Date(reserva.fechaLlegada).toLocaleDateString() : 'No definida';
    const fechaRegreso = reserva.fechaRegreso ? new Date(reserva.fechaRegreso).toLocaleDateString() : 'No definida';

    const html = `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; border:1px solid #ddd; border-radius:10px;">
        <h2 style="text-align:center; color:#333;">¡Tu reserva está confirmada!</h2>

        <p>Hola <b>${usuarioNombre}</b>, gracias por reservar con <b>Viaggio</b>. Aquí está el resumen de tu viaje:</p>

        <h3>Alojamiento</h3>
        <p><b>${hotelNombre}</b><br>
           Dirección: ${hotelDireccion}<br>
           Precio: $${hotelPrecio}</p>
        <img src="${hotelImagen}" alt="Imagen del hotel" style="width:100%; border-radius:8px; margin-bottom:15px;" />

        <h3>Fechas</h3>
        <p>Desde: ${fechaLlegada}<br>Hasta: ${fechaRegreso}</p>

        <h3>Actividades</h3>
        <ul>${actividadesHtml}</ul>

        <h3>Información de pago</h3>
        <p>Realizá la transferencia bancaria a:</p>
        <p>
          <b>Banco:</b> Banco Ejemplo<br>
          <b>CBU:</b> 1234567890123456789012<br>
          <b>Titular:</b> Viaggio SRL<br>
          <b>Monto:</b> $${hotelPrecio}
        </p>

        <p style="text-align:center; margin-top:20px;">¡Te deseamos un excelente viaje!</p>
      </div>
    `;

    const info = await this.transporter.sendMail({
      from: '"Viaggio" <no-reply@viaggio.com>',
      to: destinatario,
      subject: 'Resumen de tu reserva Viaggio',
      html,
    });

    console.log('Mensaje enviado: %s', info.messageId);
    return info;
  }
}
