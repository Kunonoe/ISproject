import React from "react";
import Link from "next/link";

export default function Page2() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-12 ">
      <h1 className="text-5xl font-bold mb-8 text-blue-600">Neural Network for Image Classification Dog and Cat</h1>
      
      <p className="text-lg mb-8 text-center max-w-3xl leading-relaxed">
        โมเดลนี้ใช้ Convolutional Neural Network (CNN) เพื่อจำแนกภาพแมวและสุนัข โดยใช้ TensorFlow และ Keras
        Dataset โดย https://www.kaggle.com/datasets/arpitjain007/dog-vs-cat-fastai
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {/* 🔹 ขั้นตอนที่ 1: โหลดข้อมูลและทำ Data Augmentation */}
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col items-center">
          <h2 className="text-xl font-semibold mt-4">1. Data Augmentation</h2>
          <p className="text-gray-600 text-center mt-2">ใช้ ImageDataGenerator เพื่อเพิ่มความหลากหลายของข้อมูลโดยการหมุนภาพ, flip และ crop</p>
          <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto w-full text-sm mt-4">
            <code>
{`from tensorflow.keras.preprocessing.image import ImageDataGenerator
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=30,
    width_shift_range=0.3,
    height_shift_range=0.3,
    horizontal_flip=True,
    fill_mode='nearest')

validation_datagen = ImageDataGenerator(rescale=1./255)`}
            </code>
          </pre>
        </div>
        
        {/* 🔹 ขั้นตอนที่ 2: โหลดข้อมูลและเตรียม Dataset */}
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col items-center">
          <h2 className="text-xl font-semibold mt-4">2. Load Dataset</h2>
          <p className="text-gray-600 text-center mt-2">โหลดข้อมูลภาพสำหรับการฝึกโมเดล โดยใช้ ImageDataGenerator</p>
          <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto w-full text-sm mt-4">
            <code>
{`train_generator = train_datagen.flow_from_directory(
    'dataset/train/',
    target_size=(64, 64),
    batch_size=32,
    class_mode='binary')

validation_generator = validation_datagen.flow_from_directory(
    'dataset/valid/',
    target_size=(64, 64),
    batch_size=32,
    class_mode='binary')`}
            </code>
          </pre>
        </div>

        {/* 🔹 ขั้นตอนที่ 3: สร้างโมเดล CNN */}
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col items-center">
          <h2 className="text-xl font-semibold mt-4">3. CNN Model</h2>
          <p className="text-gray-600 text-center mt-2">โมเดลประกอบด้วย Conv2D, MaxPooling2D และ Dropout layers เพื่อเพิ่มประสิทธิภาพการเรียนรู้</p>
          <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto w-full text-sm mt-4">
            <code>
{`from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout

model = Sequential([
    Conv2D(32, (3,3), activation='relu', input_shape=(64, 64, 3)),
    MaxPooling2D(pool_size=(2,2)),
    Conv2D(64, (3,3), activation='relu'),
    MaxPooling2D(pool_size=(2,2)),
    Flatten(),
    Dense(128, activation='relu'),
    Dropout(0.5),
    Dense(1, activation='sigmoid')
])`}
            </code>
          </pre>
        </div>

        {/* 🔹 ขั้นตอนที่ 4: บันทึกและโหลดโมเดล */}
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col items-center">
          <h2 className="text-xl font-semibold mt-4">4. Save & Load Model</h2>
          <p className="text-gray-600 text-center mt-2">บันทึกโมเดลและโหลดมาใช้ในภายหลัง</p>
          <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto w-full text-sm mt-4">
            <code>
{`import tensorflow as tf

model.save("cnn_model.h5")

# โหลดโมเดลที่บันทึกไว้
loaded_model = tf.keras.models.load_model("cnn_model.h5")`}
            </code>
          </pre>
        </div>
      </div>

      {/* 🔹 ปุ่มกลับหน้าแรก */}
      <Link href="/">
        <button className="mt-10 px-8 py-3 bg-blue-500 text-white rounded-xl shadow-md text-lg hover:bg-blue-600 transition">
          กลับหน้าแรก
        </button>
      </Link>
    </div>
  );
}
