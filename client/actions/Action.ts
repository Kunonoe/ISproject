"use server"
import axios from 'axios';

export interface IKNN {
    gender: number;
    age: number;
    hypertension: number; 
    heart_disease: number;
    smoking_history: number;
    bmi: number; 
    HbA1c_level: number; 
    blood_glucose_level: number;
}

export const predictCNNModel = async (Base64: string) => {
    try{

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_END_POINT}/predict/CNN`, {
            image: Base64
        });

        if (!response) {
            throw new Error('Error');
        }

        return response.data;
    }catch(error){
        console.log(error);
    }
};

// ทำนายภาวะโรคเบาหวาน (KNN)
export const predictKNNModel = async (form : IKNN) => {
    try{

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_END_POINT}/predict/KNN`,  form);

        if (!response) {
            throw new Error('Error');
        }

        return response.data;
    }catch(error){
        console.log(error);
    }
}

// ทำนายภาวะโรคเบาหวาน (SVM)
export const predictSVMModel = async (form : IKNN) => {
    try{

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_END_POINT}/predict/SVM`,  form);

        if (!response) {
            throw new Error('Error');
        }

        return response.data;
    }catch(error){
        console.log(error);
    }
}

// ทำนาย DogVsCat
export const predictLRModel = async (Base64: string) => {
    try{

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_END_POINT}/predict/LR`, {
            image: Base64
        });

        if (!response) {
            throw new Error('Error');
        }

        return response.data;
    }catch(error){
        console.log(error);
    }
}