import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_verification_email(receiver_email: str, code: str):
    sender_email = "avlomov07@gmail.com"
    app_password = "lealqlqdixgzptys"       

    message = MIMEMultipart("alternative")
    message["Subject"] = "Код подтверждения TASKER 🚀"
    message["From"] = sender_email
    message["To"] = receiver_email

    html = f"""\
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #0f172a; color: white; padding: 20px; border-radius: 10px;">
        <h2 style="color: #a855f7;">Добро пожаловать в TASKER!</h2>
        <p>Твой код подтверждения для завершения регистрации:</p>
        <h1 style="background: rgba(255,255,255,0.1); display: inline-block; padding: 10px 20px; border-radius: 8px; letter-spacing: 5px; color: #38bdf8;">{code}</h1>
        <p style="color: #94a3b8; font-size: 12px; margin-top: 20px;">Никому не сообщай этот код. Если ты не регистрировался, просто проигнорируй письмо.</p>
      </body>
    </html>
    """
    message.attach(MIMEText(html, "html"))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(sender_email, app_password)
        server.sendmail(sender_email, receiver_email, message.as_string())