from picamera import PiCamera
import time
from datetime import datetime
from firebase import firebase
from tensorflow.keras.models import load_model
import numpy as np
import qrcode
import cv2
import RPi.GPIO as GPIO
from gpiozero import LED
from tensorflow.keras.models import load_model

# Variable global que indica el lugar donde se guarda la foto de la persona
PATH = "/home/pi/Pictures/new_capture.jpg"


class DistanceSensor:
    def __init__(self, trig_pin, echo_pin):
        self.trig_pin = trig_pin
        self.echo_pin = echo_pin
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(trig_pin, GPIO.OUT)
        GPIO.setup(echo_pin, GPIO.IN)

    def get_distance(self):
        GPIO.output(self.trig_pin, True)
        time.sleep(0.00001)
        GPIO.output(self.trig_pin, False)
        start_time = time.time()
        stop_time = time.time()
        while GPIO.input(self.echo_pin) == 0:
            start_time = time.time()
        while GPIO.input(self.echo_pin) == 1:
            stop_time = time.time()
        time_elapsed = stop_time - start_time
        distance = 34300 * time_elapsed / 2  # centimeters
        return distance


def get_qr() -> str:
    """
    Lee el codigo qr y regresa los datos almacenados en el
    """
    camera = cv2.VideoCapture(0)
    detector = cv2.QRCodeDetector()
    while True:
        print('Taking picture')
        _, img = camera.read()
        data, bbox, _ = detector.detectAndDecode(img)
        if (bbox is not None) and (len(data) > 0):
            print('QRCode detected')
            print('Data found: ' + data)
            cv2.destroyAllWindows()
            camera.release()
            return data
        time.sleep(0.5)


def new_capture():
    """
    Toma la fotografía de la persona para comprobar el uso de cubrebocas
    """
    global PATH
    camera = cv2.VideoCapture(0)
    print('Taking picture in')
    print('3...')
    time.sleep(1)
    print('2...')
    time.sleep(1)
    print('1...')
    time.sleep(1)
    cv2.namedWindow("Test")
    ret, img = camera.read()
    if not ret:
        print("Failed to grab frame")
        return
    img = cv2.resize(img, (120, 120), interpolation=cv2.INTER_AREA)
    cv2.imwrite(PATH, img)
    print('Picture saved at ', PATH)
    cv2.destroyAllWindows()
    camera.release()
    return img


def predict() -> bool:
    """
    Indica si la persona hace uso de cubrebocas para otorgar el ingreso
    """
    global PATH
    image_size = (180, 180)
    image = cv2.imread(PATH)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faceCascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
    faces = faceCascade.detectMultiScale(
            gray,
            scaleFactor=1.3,
            minNeighbors=3,
            minSize=(30, 30)
    )
    x, y, w, h = faces[0]
    image = image[y:y+h, x:x+w]
    resized = cv2.resize(image, image_size, interpolation=cv2.INTER_AREA)
    new_image = resized[:, :,[2,1,0]]
    input_arr = np.array([new_image], dtype="uint8")
    predictions = model.predict(input_arr)
    score = (1 - predictions[0][0]) * 100
    return score > 0.5


def post_log(userid: str) -> bool:
    """
    Funcion que agrega un log a la base de datos
    uid: el id del user que se esta tratando de registrar
    return: True si el acceso es valido, False si es invalido
    """

    now = datetime.now()
    enter = predict()

    log = {
        "uid": userid,
        "location": "Puerta 01",
        "date": now.strftime("%d/%m/%Y | %H:%M"),
        "enter": enter
    }

    db_url = 'https://sano-ingreso.firebaseio.com/'
    firebase_db = firebase.FirebaseApplication(db_url, None)
    firebase_db.post('/logs', log)
    print('Log posted to database')
    return enter


# Load AI model
model = load_model('el_bueno.h5')

# Declare pins
led_pin = 4
red_led = LED(led_pin)
distance_sensor = DistanceSensor(17, 27)

while True:
    red_led.blink()
    distance = distance_sensor.get_distance()
    print('Distance: %.2f' % distance, 'cm')
    treshold = 130
    if distance < treshold:
        red_led.on()
        print('Person detected!')
        uid = get_qr()
        if len(uid) > 0:
            valid = post_log(userid=uid)
        new_capture()
    time.sleep(3)

