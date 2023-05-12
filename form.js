from flask import Flask, request, render_template
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage

app = Flask(_name_)

@app.route('/')
def index():
    return render_template('index.html')

def enviar_correo(destinatario, asunto, mensaje, imagen):
    remitente = 'saboreandocodoacodo@gmail.com'
    contraseña = 'codoacodo2023'
    
    msg = MIMEMultipart()
    msg['Subject'] = asunto
    msg['From'] = remitente
    msg['To'] = destinatario
    
    # Adjuntar mensaje de texto
    texto = MIMEText(mensaje)
    msg.attach(texto)
    
    # Adjuntar imagen
    imagen_adjunta = MIMEImage(open(imagen, 'rb').read())
    imagen_adjunta.add_header('Content-Disposition', 'attachment', filename='plato_sano.jpg')
    msg.attach(imagen_adjunta)

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as servidor_smtp:
        servidor_smtp.login(remitente, contraseña)
        servidor_smtp.send_message(msg)

def enviar_correo_bienvenida(destinatario):
    asunto = '¡Bienvenido a nuestro boletín de novedades!'
    mensaje = '''
    ¡Hola!
    
    Gracias por suscribirte a nuestro boletín de novedades. Estamos emocionados de tenerte a bordo y compartir contigo deliciosas recetas y consejos sobre comida saludable.
    
    En nuestra página web encontrarás una amplia variedad de platos nutritivos y sabrosos, que te ayudarán a mantener un estilo de vida saludable.
    
    Adjunto a este correo, te enviamos una imagen inspiradora de uno de nuestros platos saludables para que te animes a probarlo.
    
    Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos. ¡Estamos aquí para ayudarte!
    
    ¡Esperamos que disfrutes de nuestros correos y que encuentres la inspiración que necesitas para llevar una vida sana y equilibrada!
    
    Saludos,
    El equipo de Comida Saludable
    '''
    imagen = 'ruta/a/tu/imagen/plato_sano.jpg'
    
    enviar_correo(destinatario, asunto, mensaje, imagen)

@app.route('/suscribir', methods=['POST'])
def suscribir():
    email = request.form['email']
    
    enviar_correo_bienvenida(email)
    
    return '¡Gracias por suscribirte! Se ha enviado un correo de bienvenida a tu dirección.'

if _name_ == '_main_':
    app.run()