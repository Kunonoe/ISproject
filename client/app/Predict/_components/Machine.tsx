'use client';
import { useState } from 'react';
import { predictKNNModel,IKNN } from '@/actions/Action';
import Swal from 'sweetalert2';

interface FormData {
  Gender: string;
  Age: string;
  Hypertension: string;
  Heart_disease: string;
  Smoking_history: string;
  Bmi: string;
  HbA1c_level: string;
  Blood_glucose_level: string;
}

interface PredictionResponse {
  result: 'High Risk' | 'Low Risk';
}

export default function DiseaseForm() {
  const [formData, setFormData] = useState<FormData>({
    Gender: "",
    Age: "",
    Hypertension: "",
    Heart_disease: "",
    Smoking_history: "",
    Bmi: "",
    HbA1c_level: "",
    Blood_glucose_level: "",
  });

  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    try {
      console.log("Raw Data:", formData);
      const tyeSmoking : {
        [key: string]: number
    } = {
        "No Info" : 0,
        "current" : 1,
        "ever" : 2,
        "former" : 3,
        "never" : 4
    }

      const data : IKNN = {
        gender: formData.Gender === "Male" ? 1 : 0,  // แปลง Gender ให้เป็นตัวเลข
        age: Number(formData.Age),
        hypertension: Number(formData.Hypertension),
        heart_disease: Number(formData.Heart_disease),
        smoking_history: Number( tyeSmoking[formData.Smoking_history]),
        bmi: Number(formData.Bmi),
        HbA1c_level: Number(formData.HbA1c_level),
        blood_glucose_level: Number(formData.Blood_glucose_level),
      };

      console.log("Sending data to predictKNNModel:", data);

      const knnResult = await predictKNNModel(data) as PredictionResponse;

      console.log("KNN Prediction Result:", knnResult);

      if (!knnResult || typeof knnResult !== "object" || !knnResult.result) {
        console.error("Error: Invalid response from predictKNNModel:", knnResult);
        Swal.fire({
          title: "Error",
          text: "เกิดข้อผิดพลาดในการทำนาย โปรดลองใหม่",
          icon: "error",
        });
        return;
      }

      console.log("Showing Alert with result:", knnResult.result);

      await Swal.fire({
        title: knnResult.result === "High Risk" ? "⚠️ High Risk of Diabetes" : "✅ Low Risk of Diabetes",
        text: "การประเมินผลเสร็จสิ้น",
        icon: knnResult.result === "High Risk" ? "warning" : "success",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      setPrediction(knnResult);
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        title: "Error",
        text: "เกิดข้อผิดพลาด โปรดลองใหม่",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-6">กรอกข้อมูลสำหรับพยากรณ์โรคเบาหวาน</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="grid grid-cols-1 gap-4">
          <select
            name="Gender"
            value={formData.Gender}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input type="number" name="Age" placeholder="Age" value={formData.Age} onChange={handleChange} className="border p-2 rounded" />
          <input type="number" name="Hypertension" placeholder="Hypertension (0/1)" value={formData.Hypertension} onChange={handleChange} className="border p-2 rounded" />
          <input type="number" name="Heart_disease" placeholder="Heart Disease (0/1)" value={formData.Heart_disease} onChange={handleChange} className="border p-2 rounded" />
          <input type="text" name="Smoking_history" placeholder="Smoking History" value={formData.Smoking_history} onChange={handleChange} className="border p-2 rounded" />
          <input type="number" step="0.1" name="Bmi" placeholder="BMI" value={formData.Bmi} onChange={handleChange} className="border p-2 rounded" />
          <input type="number" step="0.1" name="HbA1c_level" placeholder="HbA1c Level" value={formData.HbA1c_level} onChange={handleChange} className="border p-2 rounded" />
          <input type="number" name="Blood_glucose_level" placeholder="Blood Glucose Level" value={formData.Blood_glucose_level} onChange={handleChange} className="border p-2 rounded" />
        </div>
        <button type="submit" className="mt-4 w-full bg-blue-500 text-white py-2 rounded">
          Predict
        </button>
      </form>

      {prediction && (
        <div className="mt-6 text-center text-lg font-semibold">
          <p>Prediction Result:</p>
          <p className={`text-xl font-bold ${prediction.result === 'High Risk' ? 'text-red-600' : 'text-green-600'}`}>
            {prediction.result === 'High Risk' ? '⚠️ High Risk of Diabetes' : '✅ Low Risk of Diabetes'}
          </p>
        </div>
      )}
    </div>
  );
}
