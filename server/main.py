import numpy as np
import tensorflow as tf
import base64
import os
import io
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from tensorflow.keras.preprocessing import image
from PIL import Image
import joblib
import gdown
import re

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# URLs สำหรับดาวน์โหลดโมเดล
url_KNN = "https://drive.google.com/uc?export=download&id=1KKW9AfjhtDP6PLrydNSGMa5ae-_Htyjp"
url_CNN = "https://drive.google.com/uc?export=download&id=1fuYaRCDSYNgAr8oCR3mzmwDmNUFcOq25"
url_SVM = "https://drive.google.com/uc?export=download&id=1n9m3hCCL4adrxPVsSSxB2BkTuu8VRIo2"


# ตรวจสอบและโหลดโมเดล KNN
knn_model_path = "knn_model.pkl"
if not os.path.exists(knn_model_path):
    gdown.download(url_KNN, knn_model_path, quiet=False)
knn_model = joblib.load(knn_model_path)

# ตรวจสอบและโหลดโมเดล SVM
svm_model_path = "svm_model.pkl"
if not os.path.exists(svm_model_path):
    gdown.download(url_SVM, svm_model_path, quiet=False)
svm_model = joblib.load(svm_model_path)

# ตรวจสอบและโหลดโมเดล CNN
DogVsCat_model_path = "DogVsCat_type.h5"
if not os.path.exists(DogVsCat_model_path):
    gdown.download(url_CNN, DogVsCat_model_path, quiet=False)
DogVscat_model = tf.keras.models.load_model(DogVsCat_model_path)

class_labels = ["Dog", "Cat"]

class DiabetesData(BaseModel):
    Age: int
    Sex: int
    Hypertension: int
    Heart_disease: int
    Smoking_history: int
    Bmi: int
    HbA1c_level: int
    Blood_glucose_level: int
    Diabetes: int


class ImageData(BaseModel):
    image_base64: str

# ทำนายภาวะหัวใจ (KNN)
@app.post("/predict/KNN") 
def predict_Disease_knn(data: DiabetesData):
    input_data = np.array([[data.Age, data.Sex, data.Hypertension, data.Heart_disease, data.Smoking_history,
                            data.Bmi, data.HbA1c_level, data.Blood_glucose_level, data.Diabetes,]])
    prediction = knn_model.predict(input_data)[0]
    return {"result": "High Risk" if prediction == 1 else "Low Risk"}

# ทำนายภาวะหัวใจ (SVM)
@app.post("/predict/SVM") 
def predict_Disease_svm(data: DiabetesData):
    input_data = np.array([[data.Age, data.Sex, data.Hypertension, data.Heart_disease, data.Smoking_history,
                            data.Bmi, data.HbA1c_level, data.Blood_glucose_level, data.Diabetes,]])
    prediction = svm_model.predict(input_data)[0]
    return {"result": "High Risk" if prediction == 1 else "Low Risk"}

# ทำนายดอกไม้
@app.post("/predict/DogVsCat")
async def predict_DogVsCat(image_data: ImageData):
    try:
        base64_data = re.sub(r'^data:image/[^;]+;base64,', '', image_data.image_base64)
        image_bytes = base64.b64decode(base64_data)
        img = Image.open(io.BytesIO(image_bytes))
        
        if img.mode != "RGB":
            img = img.convert("RGB")
        
        img = img.resize((224, 224))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)  
        img_array = img_array / 127.5 - 1  

        predictions = DogVsCat_model.predict(img_array)
        predicted_class = np.argmax(predictions, axis=1)[0]
        predicted_label = class_labels[predicted_class]

        return JSONResponse(content={"prediction": predicted_label})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)