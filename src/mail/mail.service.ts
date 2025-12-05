import { Injectable } from '@nestjs/common';
import { Reserva } from 'src/reserva/entities/reserva.entity';

@Injectable()
export class MailService {

  async enviarConfirmacion(destinatario: string, reserva: Reserva) {
    const hotelNombre = reserva.hotel?.nombre || 'No definido';
    const hotelDireccion = reserva.hotel?.direccion || 'No definida';
    const hotelPrecio = reserva.hotel?.precio ?? 0;

    const hotelImagen =
      reserva.hotel?.imagenPrincipal ||
      reserva.hotel?.imagenUrl ||
      'https://via.placeholder.com/600x300?text=Hotel+Viaggio';

    const usuarioNombre = reserva.usuario?.nombre || 'Usuario';

    const actividadesHtml =
      reserva.actividades?.length
        ? reserva.actividades.map(
            act => `<li><b>${act.titulo || ''}</b>: ${act.descripcion || ''}</li>`
          ).join('')
        : '<li>No seleccionaste actividades</li>';

    const fechaLlegada = reserva.fechaLlegada
      ? new Date(reserva.fechaLlegada).toLocaleDateString()
      : 'No definida';

    const fechaRegreso = reserva.fechaRegreso
      ? new Date(reserva.fechaRegreso).toLocaleDateString()
      : 'No definida';

    let noches = 1;
    if (reserva.fechaLlegada && reserva.fechaRegreso) {
      const inicio = new Date(reserva.fechaLlegada).getTime();
      const fin = new Date(reserva.fechaRegreso).getTime();
      const diff = (fin - inicio) / (1000 * 60 * 60 * 24);
      noches = diff >= 1 ? diff : 1;
    }

    const total = hotelPrecio * noches;

    const html = `
      <div style="font-family: Arial; max-width:600px; margin:auto; padding:20px; border:1px solid #ddd; border-radius:10px;">
        <h2 style="text-align:center;">¡Tu reserva está confirmada!</h2>
        <p>Hola <b>${usuarioNombre}</b>, gracias por reservar con <b>Viaggio</b>.</p>

        <h3>Alojamiento</h3>
        <p><b>${hotelNombre}</b><br>
        Dirección: ${hotelDireccion}<br>
        Precio por noche: $${hotelPrecio}<br>
        Noches: ${noches}<br>
        <b>Total: $${total}</b></p>

        <img src="${hotelImagen}" style="width:100%; border-radius:8px; margin-bottom:15px;" />

        <h3>Fechas</h3>
        <p>Desde: ${fechaLlegada}<br>Hasta: ${fechaRegreso}</p>

        <h3>Actividades</h3>  
        <ul>${actividadesHtml}</ul>

        <h3>Información de pago</h3>
        <p><b>Monto total:</b> $${total}</p>
      </div>
    `;

    // ----------------------------
    // ENVÍO DEL MAIL CON BREVO API 
    // ----------------------------
    try {
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": process.env.BREVO_API_KEY!,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sender: {
            name: "Viaggio",
            email: "proyectoviaggio@gmail.com"
          },
          to: [{ email: destinatario }],
          subject: "Resumen de tu reserva Viaggio",
          htmlContent: html,
        }),
      });

      const data = await response.json();
      console.log("📩 Email enviado:", data);
      return data;

    } catch (error) {
      console.error(" Error enviando correo:", error);
      throw error;
    }
  }
}
