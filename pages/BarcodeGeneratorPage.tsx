import React, { useState, useEffect, useCallback } from 'react';
// @ts-ignore
import { useParams, useNavigate } from 'react-router-dom';
import BarcodeDisplay from '../components/BarcodeDisplay';
import Footer from '../components/Footer';

const encodeNameForUrl = (name: string): string => {
    if (!name) return '';
    const trimmedName = name.trim();
    if (!trimmedName) return '';
    // URL-safe base64 encoding
    return btoa(trimmedName)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
};

const decodeNameFromUrl = (encoded?: string): string => {
    if (!encoded) return '';
    try {
        let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) {
            base64 += '=';
        }
        return atob(base64);
    } catch (e) {
        console.error("Failed to decode name from URL:", e);
        return '';
    }
};

const isValidCodabar = (value: string): boolean => {
    if (!value) return true; // Empty is not considered invalid for typing purposes
    // Codabar allows digits (0-9) and the following symbols: - $ : / . +
    const codabarRegex = /^[0-9-/:.$+]+$/;
    return codabarRegex.test(value);
};


export default function BarcodeGeneratorPage() {
    const { barcodeValue, encodedName } = useParams<{ barcodeValue: string; encodedName: string }>();
    const navigate = useNavigate();
    
    const [inputValue, setInputValue] = useState<string>('');
    const [nameValue, setNameValue] = useState<string>('');
    const [validationError, setValidationError] = useState<string>('');
    
    const [displayValue, setDisplayValue] = useState<string | undefined>();
    const [displayName, setDisplayName] = useState<string | undefined>();

    useEffect(() => {
        const decodedName = decodeNameFromUrl(encodedName);
        setDisplayValue(barcodeValue);
        setDisplayName(decodedName);
        setInputValue(barcodeValue || '');
        setNameValue(decodedName || '');
        // Clear validation error on initial load from URL
        setValidationError('');
    }, [barcodeValue, encodedName]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        if (!isValidCodabar(value)) {
            setValidationError('Invalid characters. Use only 0-9 and symbols: - / : . $ +');
        } else {
            setValidationError('');
        }
    };

    const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmedValue = inputValue.trim();

        if (!isValidCodabar(trimmedValue)) {
            setValidationError('Invalid characters. Use only 0-9 and symbols: - / : . $ +');
            return;
        }

        if (!trimmedValue) {
            navigate('/');
            return;
        }
        
        setValidationError('');
        const newEncodedName = encodeNameForUrl(nameValue);
        const path = newEncodedName ? `/${trimmedValue}/${newEncodedName}` : `/${trimmedValue}`;
        navigate(path);

    }, [inputValue, nameValue, navigate]);

    return (
        <div className="min-h-screen flex flex-col font-sans">
            <main className="flex-grow flex items-center justify-center p-4">
                <div className="w-full max-w-2xl mx-auto">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 transition-shadow duration-300">
                        <div className="flex flex-col items-center text-center mb-8">
                            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Library Codabar Generator</h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-2">Enter a value and an optional label to generate a barcode. You can bookmark the page to save it.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                            <div>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        placeholder="Enter value for barcode"
                                        className={`flex-grow w-full px-4 py-3 text-lg bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border-2 rounded-lg focus:outline-none transition-all ${validationError ? 'border-red-500 focus:ring-red-500' : 'border-transparent focus:ring-blue-500'}`}
                                        aria-label="Barcode value input"
                                        aria-invalid={!!validationError}
                                        aria-describedby="barcode-error"
                                        required
                                    />
                                    <button 
                                        type="submit"
                                        className="px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-all transform hover:scale-105"
                                    >
                                        Generate
                                    </button>
                                </div>
                                {validationError && (
                                    <p id="barcode-error" className="text-red-500 text-sm mt-2" aria-live="assertive">
                                        {validationError}
                                    </p>
                                )}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    value={nameValue}
                                    onChange={(e) => setNameValue(e.target.value)}
                                    placeholder="Enter a label (optional)"
                                    className="w-full px-4 py-3 text-lg bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    aria-label="Barcode label input"
                                />
                            </div>
                        </form>

                        <div className="w-full bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 min-h-[150px] flex flex-col items-center justify-center">
                            {displayName && (
                                <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-4" id="barcode-label-display">
                                    {displayName}
                                </h2>
                            )}
                            {displayValue ? (
                                <div role="group" aria-labelledby={displayName ? 'barcode-label-display' : undefined}>
                                    <BarcodeDisplay value={displayValue} />
                                </div>
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