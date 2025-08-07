import React, { useState, useEffect, useCallback } from 'react';
// @ts-ignore
import { useParams, useNavigate } from 'react-router-dom';
import BarcodeDisplay from '../components/BarcodeDisplay';
import Footer from '../components/Footer';

const BarcodeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        <path d="M4 6V5a1 1 0 011-1h1m14 0h1a1 1 0 011 1v1m0 12v1a1 1 0 01-1 1h-1m-14 0h-1a1 1 0 01-1-1v-1" />
    </svg>
);


export default function BarcodeGeneratorPage() {
    const { barcodeValue } = useParams<{ barcodeValue: string }>();
    const navigate = useNavigate();
    
    const [inputValue, setInputValue] = useState<string>(barcodeValue || '');
    const [displayValue, setDisplayValue] = useState<string | undefined>(barcodeValue);

    useEffect(() => {
        // Sync state from URL parameter
        setDisplayValue(barcodeValue);
        setInputValue(barcodeValue || '');
    }, [barcodeValue]);

    const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (inputValue.trim()) {
            navigate(`/${inputValue.trim()}`);
        } else {
            navigate('/');
        }
    }, [inputValue, navigate]);

    return (
        <div className="min-h-screen flex flex-col font-sans">
            <main className="flex-grow flex items-center justify-center p-4">
                <div className="w-full max-w-2xl mx-auto">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 transition-shadow duration-300">
                        <div className="flex flex-col items-center text-center mb-8">
                            <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-full mb-4">
                                <BarcodeIcon />
                            </div>
                            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Codabar Generator</h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-2">Enter a value to generate a barcode. You can bookmark the page to save it.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-8">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Enter value for barcode"
                                className="flex-grow w-full px-4 py-3 text-lg bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                aria-label="Barcode value input"
                            />
                            <button 
                                type="submit"
                                className="px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-all transform hover:scale-105"
                            >
                                Generate
                            </button>
                        </form>

                        <div className="w-full bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 min-h-[150px] flex items-center justify-center">
                            {displayValue ? (
                                <BarcodeDisplay value={displayValue} />
                            ) : (
                                <p className="text-slate-400 dark:text-slate-500" aria-live="polite">Your barcode will appear here</p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}