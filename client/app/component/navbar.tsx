import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <main className="w-full p-4 flex items-center bg-purple-800">
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center px-24">
          <span className="text-[15px] font-semibold text-white font-Head ml-2">
            ISPROJECT
          </span>
        </div>

        <div className="flex w-1/3 justify-between px-20">
          <Link href="/Machine" className="text-[18px] font-semibold text-white">
            Page 1
          </Link>
          <Link href="/Neuron" className="text-[18px] font-semibold text-white">
            Page 2
          </Link>
          <Link href="/Predict" className="text-[18px] font-semibold text-white">
            Page 3
          </Link>
          <Link href="/Predict_Neuron" className="text-[18px] font-semibold text-white">
            Page 4
          </Link>
        </div>
      </div>
    </main>
  );
}
