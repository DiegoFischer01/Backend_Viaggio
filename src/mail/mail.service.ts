import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { Reserva } from 'src/reserva/entities/reserva.entity';

@Injectable()
export class MailService {
  private resend: Resend;

  constructor() {
    // Inicializamos el cliente de Resend
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async enviarConfirmacion(destinatario: string, reserva: Reserva) {
    // Asegurarse de que todas las propiedades existan
    const hotelNombre = reserva.hotel?.nombre || 'No definido';
    const hotelDireccion = reserva.hotel?.direccion || 'No definida';
    const hotelPrecio = reserva.hotel?.precio ?? 0;

    const hotelImagen =
      reserva.hotel?.imagenPrincipal ||
      reserva.hotel?.imagenUrl ||
      'https://via.placeholder.com/600x300?text=Hotel+Viaggio';

    const usuarioNombre = reserva.usuario?.nombre || 'Usuario';

    const actividadesHtml =
      reserva.actividades && reserva.actividades.length > 0
        ? reserva.actividades
            .map(
              (act) =>
                `<li><b>${act.titulo || ''}</b>: ${act.descripcion || ''}</li>`
            )
            .join('')
        : '<li>No seleccionaste actividades</li>';

    const fechaLlegada = reserva.fechaLlegada
      ? new Date(reserva.fechaLlegada).toLocaleDateString()
      : 'No definida';

    const fechaRegreso = reserva.fechaRegreso
      ? new Date(reserva.fechaRegreso).toLocaleDateString()
      : 'No definida';

    // CALCULAR NOCHES
    let noches = 1;
    if (reserva.fechaLlegada && reserva.fechaRegreso) {
      const inicio = new Date(reserva.fechaLlegada).getTime();
      const fin = new Date(reserva.fechaRegreso).getTime();
      const diff = (fin - inicio) / (1000 * 60 * 60 * 24);
      noches = diff >= 1 ? diff : 1;
    }

    const total = hotelPrecio * noches;

    // HTML DEL MAIL
    const html = `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; border:1px solid #ddd; border-radius:10px;">
        <h2 style="text-align:center; color:#333;">¡Tu reserva está confirmada!</h2>

        <p>Hola <b>${usuarioNombre}</b>, gracias por reservar con <b>Viaggio</b>. Aquí está el resumen de tu viaje:</p>

        <h3>Alojamiento</h3>
        <p><b>${hotelNombre}</b><br>
            Dirección: ${hotelDireccion}<br>
            Precio por noche: $${hotelPrecio}<br>
            Noches: ${noches}<br>
            <b>Total: $${total}</b>
        </p>

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
          <b>Monto total:</b> $${total}
        </p>

        <p style="text-align:center; margin-top:20px;">¡Te deseamos un excelente viaje!</p>
      </div>
    `;

    // ENVÍO DEL MAIL CON RESEND
    const { data, error } = await this.resend.emails.send({
      from: "Viaggio <onboarding@resend.dev>",
      to: destinatario,
      subject: "Resumen de tu reserva Viaggio",
      html,
    });

    if (error) {
      console.error("Error al enviar correo:", error);
      throw error;
    }
  
    console.log("Correo enviado correctamente:", data?.id);
    return data;
  }
}
