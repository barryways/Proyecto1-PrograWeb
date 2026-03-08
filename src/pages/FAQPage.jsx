import { SectionHeader } from '../components/common/SectionHeader'

const questions = [
  '¿Qué datos necesito para cotizar?',
  '¿Cuánto tarda en llegar un paquete?',
  '¿Cómo funciona el servicio de AeroPaq?',
  '¿Qué tipo de paquetes puedo enviar o recibir?',
  '¿Cómo sabré cuando mi paquete llegue a la bodega?',
  '¿Puedo rastrear mi paquete?',
  '¿Qué sucede si mi paquete llega dañado?',
  '¿Puedo consolidar varios paquetes en un solo envío?',
  '¿Cuáles son los métodos de pago disponibles?',
  '¿Cómo protegen mi información personal?',
  '¿Puedo modificar mi dirección o datos después de registrarme?',
  '¿Qué pasa si un paquete llega sin mi número de cliente?'
]

const answers = [
  'Para generar una cotización necesitamos algunos datos básicos del envío, como el país de origen, el destino en Guatemala, el peso aproximado del paquete y sus dimensiones. Si aún no tienes el peso exacto, puedes ingresar un estimado y posteriormente ajustarlo cuando el paquete llegue a nuestra bodega.',
  'El tiempo de entrega depende del país de origen y del método de envío seleccionado. En promedio, los paquetes provenientes de Estados Unidos tardan entre 3 y 7 días hábiles desde que llegan a nuestra bodega hasta su entrega en Guatemala.',
  'Primero te registras y obtienes una dirección internacional para realizar tus compras en línea. Cuando el paquete llega a nuestra bodega, lo registramos en tu cuenta, calculamos los costos de envío y te notificamos para que puedas pagar y programar la entrega.',
  'Puedes recibir la mayoría de productos comprados en línea como ropa, tecnología, accesorios, artículos del hogar y más. Sin embargo, existen restricciones para productos peligrosos, baterías especiales, líquidos inflamables o artículos prohibidos por regulaciones internacionales.',
  'Recibirás una notificación automática por correo electrónico y dentro de tu cuenta cuando tu paquete sea registrado en nuestra bodega. También podrás ver su estado actualizado desde el panel de seguimiento.',
  'Sí. Una vez que tu paquete sea procesado, podrás rastrear su estado en tiempo real desde tu cuenta. El sistema te mostrará si el paquete está en tránsito, en proceso de aduana o listo para entrega.',
  'Si tu paquete llega con daños visibles, debes reportarlo dentro de las primeras 24 horas después de recibirlo. Nuestro equipo evaluará el caso y te ayudará a iniciar el proceso correspondiente con el proveedor o el seguro de envío.',
  'Sí. Si tienes varios paquetes en nuestra bodega, podemos consolidarlos para enviarlos juntos. Esto puede ayudarte a reducir costos de envío al agrupar varios productos en un solo paquete.',
  'Aceptamos pagos con tarjeta de crédito, débito y otros métodos electrónicos disponibles en nuestra plataforma. Los pagos se procesan de forma segura a través de pasarelas certificadas.',
  'La seguridad de tu información es una prioridad para nosotros. Utilizamos protocolos de cifrado y sistemas seguros para proteger tus datos personales y de pago, cumpliendo con estándares internacionales de seguridad.',
  'Sí. Puedes actualizar tu información personal y direcciones desde tu panel de usuario en cualquier momento. Es importante mantener tus datos actualizados para evitar retrasos en la entrega.',
  'Si un paquete llega sin tu número de cliente, nuestro equipo intentará identificar al destinatario utilizando el nombre o la información disponible. Sin embargo, esto puede generar retrasos en el procesamiento, por lo que siempre recomendamos incluir correctamente tu identificador.'
]

export function FAQPage() {
  return (
    <section className="page section-faq">
      <div className="container">
        <SectionHeader
          title="Preguntas frecuentes"
          subtitle="Estructura lista para responder dudas comunes y aumentar confianza antes de conversion."
        />

        <div className="faq-list">
          {questions.map((question, index) => (
            <details key={question} className="faq-item">
              <summary>{question}</summary>
              <p>{answers[index]}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}