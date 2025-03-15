"use server"
import axios from 'axios';

interface FormData {
    Age: number;
    Sex: number;  // 0 = Female, 1 = Male
    Hypertension: number; 
    Heart_disease: number;
    Smoking_history: number;
    Bmi: number; 
    HbA1c_level: number; 
    Blood_glucose_level: number;
    Diabetes: number; 
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
export const predictKNNModel = async (form : any) => {
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
export const predictSVMModel = async (form : FormData) => {
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