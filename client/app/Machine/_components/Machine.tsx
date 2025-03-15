import React from "react";
import Link from "next/link";
import Image from "next/image";


export default function Page1() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-12">
      <h1 className="text-5xl font-bold mb-8 text-red-500">Machine learning for Diabetes</h1>

      <p className="text-lg mb-8 text-center max-w-3xl leading-relaxed">
        โค้ด Python นี้ใช้สร้างโมเดล Machine Learning เพื่อพยากรณ์โรคเบาหวาน
        โดยใช้ K-Nearest Neighbors (KNN) และ Support Vector Machine (SVM)
        Dataset โดย <a href="https://www.kaggle.com/datasets/iammustafatz/diabetes-prediction-dataset/data" className="text-blue-500 underline">Kaggle Dataset</a>
      </p>

      {/* 🔹 รายการขั้นตอนการทำงาน */}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">กระบวนการทำงาน</h2>
        <ul className="list-disc pl-6 text-lg leading-relaxed">
          <li>โหลดชุดข้อมูลจากไฟล์ CSV</li>
          <li>ตรวจสอบข้อมูลและจัดการค่าที่หายไป</li>
          <li>เข้ารหัสค่าข้อมูลที่เป็นหมวดหมู่</li>
          <li>ปรับขนาดข้อมูลเพื่อทำให้โมเดลทำงานได้ดีขึ้น</li>
          <li>แบ่งข้อมูลเป็นชุดฝึกและชุดทดสอบ</li>
          <li>ฝึกโมเดล KNN และ SVM</li>
          <li>ประเมินผลลัพธ์ของโมเดล</li>
        </ul>
      </div>

      <p className="mt-8 text-lg text-center max-w-3xl leading-relaxed">
        หลังจากที่โมเดลถูกฝึกแล้ว จะสามารถคาดการณ์ว่าผู้ป่วยมีแนวโน้มเป็นโรคเบาหวานหรือไม่
      </p>

      {/* 🔹 แสดงข้อมูลแต่ละหัวข้อในกรอบ (Card) ใหญ่ขึ้น */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 w-full max-w-6xl">

        {/* 🔹 1. นำเข้าไลบรารีที่จำเป็น */}
        <div className="bg-white p-10 rounded-2xl shadow-lg flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-6">1. นำเข้าไลบรารีที่จำเป็น</h2>
          <Image src="/1.png" alt="นำเข้าไลบรารี" width={500} height={350} className="rounded-lg" />
          <p className="mt-6 text-lg text-center leading-relaxed">
            pandas → ใช้จัดการข้อมูลในรูปแบบ DataFrame <br />
            numpy → ใช้คำนวณค่าต่าง ๆ <br />
            plotly.express → ใช้สร้างกราฟ Visualization <br />
            sklearn.model_selection.train_test_split → ใช้แบ่งข้อมูลเป็นชุด Train และ Test <br />
            sklearn.ensemble.RandomForestClassifier → ใช้สร้างโมเดล Machine Learning ประเภท Random Forest <br />
            sklearn.metrics.accuracy_score → ใช้วัดค่าความแม่นยำของโมเดล <br />
            sklearn.metrics.classification_report → ใช้วิเคราะห์โมเดล เช่น Precision, Recall, F1-score <br />
            sklearn.preprocessing.LabelEncoder → ใช้แปลงค่าข้อมูลประเภทข้อความให้เป็นตัวเลข <br />
            joblib → ใช้บันทึกโมเดลที่เทรนเสร็จแล้วเป็นไฟล์ .pkl
          </p>
        </div>

        {/* 🔹 2. โหลดข้อมูล CSV */}
        <div className="bg-white p-10 rounded-2xl shadow-lg flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-6">2. โหลดข้อมูล CSV</h2>
          <Image src="/2.png" alt="โหลดข้อมูล CSV" width={500} height={350} className="rounded-lg" />
          <p className="mt-6 text-lg text-center leading-relaxed">
            file_path → กำหนดชื่อไฟล์ที่ต้องการโหลด <br />
            pd.read_csv(file_path) → โหลดข้อมูลจากไฟล์ .csv เข้ามาเป็น DataFrame
          </p>
        </div>

        {/* 🔹 3. ตรวจสอบข้อมูลเบื้องต้น */}
        <div className="bg-white p-10 rounded-2xl shadow-lg flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-6">3. ตรวจสอบข้อมูลเบื้องต้น</h2>
          <Image src="/3.png" alt="ตรวจสอบข้อมูล" width={500} height={350} className="rounded-lg" />
          <p className="mt-6 text-lg text-center leading-relaxed">
            df.info() → แสดงข้อมูลเกี่ยวกับ DataFrame เช่น จำนวนแถว คอลัมน์ และชนิดข้อมูล <br />
            df.head() → แสดง 5 แถวแรก ของ DataFrame เพื่อดูตัวอย่างข้อมูล
          </p>
        </div>

        <div className="bg-white p-10 rounded-2xl shadow-lg flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-6">🔹 4. ตรวจสอบค่าหายไปในข้อมูล</h2>
          <Image src="/4.png" alt="ตรวจสอบข้อมูล" width={500} height={350} className="rounded-lg" />
          <p className="mt-6 text-lg text-center leading-relaxed">
          df.isnull().sum() → เช็คว่ามี ค่า Missing (NaN) หรือไม่ในแต่ละคอลัมน์
          </p>
        </div>
        
        <div className="bg-white p-10 rounded-2xl shadow-lg flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-6">🔹 5. ผลลัพธ์จากการตรวจสอบค่าที่หายไป</h2>
          <Image src="/5.png" alt="ตรวจสอบข้อมูล" width={500} height={350} className="rounded-lg" />
          <p className="mt-6 text-lg text-center leading-relaxed">
          จำนวนข้อมูลทั้งหมด: 27,528 แถว 9 คอลัมน์
          ไม่มีค่า Missing (Non-Null Count = 27528 ทุกคอลัมน์) 
          </p>
        </div>

        <div className="bg-white p-10 rounded-2xl shadow-lg flex flex-col items-center">
          <Image src="/6.png" alt="ตรวจสอบข้อมูล" width={500} height={350} className="rounded-lg" />
          <Image src="/7.png" alt="ตรวจสอบข้อมูล" width={500} height={350} className="rounded-lg" />
          <p className="mt-6 text-lg text-center leading-relaxed">
          แสดงให้เห็นว่าไม่มีค่าMissing
          </p>
        </div>

        <div className="bg-white p-10 rounded-2xl shadow-lg flex flex-col items-center"> 
        <h2 className="text-2xl font-semibold mb-6">🔹 6. การกระจายของข้อมูลแต่ละตัวแปร</h2>
        <Image src="/8.png" alt="ตรวจสอบข้อมูล" width={500} height={350} className="rounded-lg" />
        <Image src="/9.png" alt="ตรวจสอบข้อมูล" width={500} height={350} className="rounded-lg" />
        <p className="mt-6 text-lg text-center leading-relaxed">
          ใช้ <code>df.hist()</code> เพื่อ สร้าง Histogram ของแต่ละคอลัมน์ใน DataFrame <br />
          <code>bins=20</code> → กำหนดให้แต่ละ Histogram แบ่งช่วงข้อมูลเป็น 20 ส่วน <br />
          <code>figsize=(12, 8)</code> → กำหนดขนาดของกราฟ <br />
          <code>plt.suptitle(&quot;Feature Distributions&quot;)</code> → ใส่ชื่อกราฟ
        </p>
      </div>


        <div className="bg-white p-10 rounded-2xl shadow-lg flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-6">🔹 7.  แปลงข้อมูล Categorical เป็นตัวเลข</h2>
          <Image src="/10.png" alt="" width={500} height={350} className="rounded-lg" />
          <p className="mt-6 text-lg text-left leading-relaxed">
          เปลี่ยนค่าข้อมูลข้อความเป็นตัวเลข เช่น <br />
          -gender (Male, Female) → (1, 0) <br />
          -smoking_history (never, former, current) → (0, 1, 2) <br />
          ใช้ LabelEncoder() กับคอลัมน์ gender และ smoking_history
          </p>
        </div>

        <div className="bg-white p-10 rounded-2xl shadow-lg flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-6">🔹 8. กำหนด Features (X) และ Target,ทำ Normalization และ แบ่งข้อมูลเป็น Train/Test(y)</h2>
          <Image src="/222.png" alt="" width={500} height={350} className="rounded-lg" />
          <p className="mt-6 text-left text-center leading-relaxed">
          1. <br />
          X → เลือกเฉพาะ Features (ตัวแปรอิสระ) โดย ตัดคอลัมน์ diabetes ออก <br />
          y → เลือกเฉพาะ Target Variable (diabetes) ซึ่งเป็นค่าที่โมเดลต้องทำนาย (0 = ไม่เป็นเบาหวาน, 1 = เป็นเบาหวาน) <br />
          2. <br />
          ใช้ StandardScaler() จาก sklearn.preprocessing เพื่อปรับค่าของข้อมูลให้มี Mean = 0 และ Standard Deviation = 1 <br />
          scaler.fit_transform(X) → ปรับค่าทุกฟีเจอร์ใน X ให้อยู่ในช่วงมาตรฐาน <br />
          3. <br />
          train_test_split() → แบ่งข้อมูลเป็น 80% Train และ 20% Test <br />
          X_scaled → ใช้ Features ที่ผ่านการ Normalize แล้ว <br />
          y → ค่าที่ต้องทำนาย (diabetes) <br />
          test_size=0.2 → แบ่ง 20% ของข้อมูลเป็นชุดทดสอบ <br />
          random_state=42 → กำหนดค่าเพื่อให้ผลลัพธ์เหมือนกันทุกครั้งที่รัน <br />
          </p>
        </div>

        <div className="bg-white p-10 rounded-2xl shadow-lg flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-6">🔹 9. เทรนโมเดล KNNและ ประเมินผลลัพธ์ของโมเดล</h2>
          <Image src="/555.png" alt="" width={500} height={350} className="rounded-lg" />
          <p className="mt-6 text-lg text-left leading-relaxed">
          KNeighborsClassifier(n_neighbors=5) → กำหนดให้ ใช้ KNN กับ k=5 (ใช้เพื่อนบ้าน 5 คนในการทำนาย) <br />
          knn_model.fit(X_train, y_train) → เทรนโมเดล โดยใช้ชุดข้อมูล Train <br /> 
          y_pred_knn = knn_model.predict(X_test) → ทำนายผลลัพธ์ (diabetes) จากข้อมูล Test <br />
          accuracy_score(y_test, y_pred_knn) → คำนวณ Accuracy (ค่าความแม่นยำของโมเดล) <br />
          classification_report(y_test, y_pred_knn) → แสดงค่า Precision, Recall, F1-score สำหรับแต่ละคลาส (0 และ 1)
          </p>
        </div>

        <div className="bg-white p-10 rounded-2xl shadow-lg flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-6">🔹 10. ค่าความแม่นยำของโมเดลและรายงานผลลัพธ์ </h2>
          <Image src="/78.png" alt="" width={500} height={350} className="rounded-lg" />
          <p className="mt-6 text-lg text-left leading-relaxed">
          KNeighborsClassifier(n_neighbors=5) → กำหนดให้ ใช้ KNN กับ k=5 (ใช้เพื่อนบ้าน 5 คนในการทำนาย) <br />
          knn_model.fit(X_train, y_train) → เทรนโมเดล โดยใช้ชุดข้อมูล Train <br />
          y_pred_knn = knn_model.predict(X_test) → ทำนายผลลัพธ์ (diabetes) จากข้อมูล Test <br />
          accuracy_score(y_test, y_pred_knn) → คำนวณ Accuracy (ค่าความแม่นยำของโมเดล) <br />
          classification_report(y_test, y_pred_knn) → แสดงค่า Precision, Recall, F1-score สำหรับแต่ละคลาส (0 และ 1)
          </p>
        </div>

        <div className="bg-white p-10 rounded-2xl shadow-lg flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-6">🔹 11. ดาวน์โหลดไฟล์โมเดลจาก Colab ลงเครื่อง </h2>
          <Image src="/55.png" alt="" width={500} height={350} className="rounded-lg" />
          <p className="mt-6 text-lg text-left leading-relaxed">
          oblib.dump(knn_model, &quot;knn_model.pkl&quot;) → บันทึกโมเดล KNN ที่ฝึกเสร็จแล้ว ลงไฟล์ knn_model.pkl <br />
          ใช้ joblib ซึ่งเป็นไลบรารีสำหรับบันทึกโมเดล Machine Learning <br />
          from google.colab import files → นำเข้าโมดูล files เพื่อจัดการไฟล์ใน Google Colab <br />
          files.download(&quot;knn_model.pkl&quot;) → ดาวน์โหลดไฟล์โมเดล knn_model.pkl ลงเครื่อง
          </p>
        </div>

        <div className="bg-white p-10 rounded-2xl shadow-lg flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-6">🔹 12. เทรนโมเดล SVM และ ประเมินผลลัพธ์ของโมเดล </h2>
          <Image src="/90.png" alt="" width={500} height={350} className="rounded-lg" />
          <p className="mt-6 text-lg text-left leading-relaxed">
          SVC(kernel=&quot;rbf&quot;) → ใช้โมเดล Support Vector Machine (SVM) และเลือก Kernel แบบ RBF (Radial Basis Function) <br />
          svm_model.fit(X_train, y_train) → ฝึกโมเดล SVM ด้วยชุดข้อมูล Train <br />
          svm_model.predict(X_test) → ใช้โมเดลทำนายค่า (y_pred_svm) จากชุดข้อมูล Test <br />
          accuracy_score(y_test, y_pred_svm) → คำนวณ ค่าความแม่นยำ (Accuracy) ของโมเดล SVM <br />
          classification_report(y_test, y_pred_svm) → แสดง Precision, Recall, F1-score ของโมเดล
          </p>
        </div>
        
        <div className="bg-white p-10 rounded-2xl shadow-lg flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-6">🔹 13. ค่าความแม่นยำของโมเดลและบันทึกและดาวน์โหลดโมเดล  </h2>
          <Image src="/100.png" alt="" width={500} height={350} className="rounded-lg" />
          <p className="mt-6 text-lg text-left leading-relaxed">
          Accuracy = 96.55% → หมายความว่าโมเดลสามารถพยากรณ์ได้ถูกต้อง 96.55% ของข้อมูลทั้งหมดในชุดทดสอบ (X_test) <br />
          โมเดลมี ความแม่นยำสูงมาก <br />
          False Negative (FN = 176) ค่อนข้างสูง → หมายความว่าโมเดลพลาดการวินิจฉัยคนเป็นเบาหวาน 176 คน <br />
          False Positive (FP = 36) ต่ำมาก → แสดงว่าโมเดลแทบจะไม่ทำนายผิดว่าคนปกติเป็นเบาหวาน <br />
          joblib.dump(svm_model, &quot;svm_model.pkl&quot;) → บันทึกโมเดล SVM ลงไฟล์ .pkl <br />
          files.download(&quot;svm_model.pkl&quot;) → ดาวน์โหลดโมเดลที่ฝึกแล้วลงเครื่อง
          </p>
        </div>
      </div>
    </div>
  );
}
