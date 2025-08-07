
import React from 'react';
// @ts-ignore
import Barcode from 'react-barcode';

interface BarcodeDisplayProps {
  value: string;
}

const BarcodeDisplay: React.FC<BarcodeDisplayProps> = ({ value }) => {
  if (!value) {
    return null;
  }

  return (
    <div className="p-4 bg-white rounded-md shadow-inner w-full flex justify-center">
      <Barcode 
        value={value}
        format="codabar"
        width={2}
        height={80}
        displayValue={true}
        fontOptions="bold"
        fontSize={18}
        lineColor="#0f172a" // slate-900
        background="#ffffff"
      />
    </div>
  );
};

export default BarcodeDisplay;
