'use client'; 
import React, { useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";

export default function ImageUpload() {
  const [image, setImage] = useState<string | null>(null);
  // const [prediction, setPrediction] = useState<string | null>(null);

  // 📌 ฟังก์ชันสำหรับปรับขนาดภาพเป็น 800x800
  const resizeImage = (file: File, callback: (resizedImage: string) => void) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new window.Image(); // สร้าง image object
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = 800;
        canvas.height = 800;
        ctx?.drawImage(img, 0, 0, 800, 800);
        callback(canvas.toDataURL("image/jpeg"));
      };
    };
  };

  // 📌 ฟังก์ชันสำหรับอัปโหลดภาพ
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      resizeImage(file, (resizedImage) => {
        setImage(resizedImage);
      });
    }
  };

  // 📌 ฟังก์ชันส่งภาพไปยังโมเดล AI
  const handlePredict = async () => {
    if (!image) {
      Swal.fire("Error", "กรุณาอัปโหลดรูปก่อน", "error");
      return;
    }

    // 📌 จำลองการพยากรณ์ (สุ่มผลลัพธ์ หมา หรือ แมว)
    const randomPrediction = Math.random() < 0.5 ? "Dog" : "Cat";
    // setPrediction(randomPrediction);

    // 📌 แสดงผลลัพธ์ด้วย SweetAlert2
    await Swal.fire({
      title: randomPrediction === "Dog" ? "🐶 This is a Dog!" : "🐱 This is a Cat!",
      text: randomPrediction === "Dog"
        ? "ระบบคาดการณ์ว่าเป็นสุนัข"
        : "ระบบคาดการณ์ว่าเป็นแมว",
      icon: "info",
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="flex flex-col items-center bg-pink-100 p-10 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">Neural Network Models</h1>

      {/* 📌 อัปโหลดรูปภาพ */}
      <label
        className="w-64 h-64 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer bg-white"
      >
        <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
        {image ? (
          <Image
            src={image}
            alt="Uploaded"
            width={800}
            height={800}
            unoptimized // ✅ ป้องกันข้อผิดพลาดของ next/image
            className="rounded-lg"
          />
        ) : (
          <span className="text-gray-500">Click to upload an image</span>
        )}
      </label>

      {/* 📌 ปุ่ม Predict */}
      <button
        onClick={handlePredict}
        className="mt-4 px-6 py-3 bg-pink-500 text-white rounded-lg shadow-md hover:bg-pink-600 transition"
      >
        Predict
      </button>
    </div>
  );
}
