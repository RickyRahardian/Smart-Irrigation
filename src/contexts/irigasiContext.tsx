// src/contexts/irigasiContext.tsx
import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';

interface LEDState {
    isOn: boolean;
    startTime: Date | null;
}

interface HistoryItem {
    id?: string;
    sawah: string;
    mulai: Date;
    selesai: Date | null;
    durasi: number;
    biaya: number;
}

interface IrigasiContextType {
    ledStates: LEDState[];
    hargaSewa: number;
    riwayat: HistoryItem[];
    toggleLED: (index: number) => void;
    setHargaSewa: (harga: number) => void;
    resetSemuaLED: () => void;
}

const IrigasiContext = createContext<IrigasiContextType | undefined>(undefined);

const JUMLAH_SAWAH = 10;
const NAMA_SAWAH = Array.from({ length: JUMLAH_SAWAH }, (_, i) => `Sawah ${i + 1}`);
const LOCAL_STORAGE_KEY = 'riwayatIrigasi';

export const IrigasiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [ledStates, setLedStates] = useState<LEDState[]>(
        Array(JUMLAH_SAWAH).fill(null).map(() => ({ isOn: false, startTime: null }))
    );
    const [hargaSewa, setHargaSewaState] = useState<number>(5000);
    const [riwayat, setRiwayatState] = useState<HistoryItem[]>([]);

    // Load riwayat dari localStorage
    useEffect(() => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved).map((item: any) => ({
                    ...item,
                    mulai: new Date(item.mulai),
                    selesai: item.selesai ? new Date(item.selesai) : null,
                }));
                setRiwayatState(parsed);
            } catch (e) {
                console.error('Gagal parse riwayat dari localStorage', e);
            }
        }
    }, []);

    const setHargaSewa = useCallback((harga: number) => {
        setHargaSewaState(harga);
    }, []);

    const simpanRiwayatKeLocalStorage = useCallback((riwayatBaru: HistoryItem[]) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(riwayatBaru));
    }, []);

    const toggleLED = useCallback((index: number) => {
        const newLedStates = [...ledStates];
        const activeIndex = newLedStates.findIndex(led => led.isOn);

        if (activeIndex !== -1 && activeIndex !== index) return;

        const ledState = newLedStates[index];
        ledState.isOn = !ledState.isOn;

        if (ledState.isOn) {
            ledState.startTime = new Date();
        } else if (ledState.startTime) {
            const selesai = new Date();
            const durasiJam = (selesai.getTime() - ledState.startTime.getTime()) / (1000 * 60 * 60);
            const biaya = durasiJam * hargaSewa;

            const newItem: HistoryItem = {
                sawah: NAMA_SAWAH[index],
                mulai: ledState.startTime,
                selesai,
                durasi: durasiJam,
                biaya,
            };

            const updatedRiwayat = [newItem, ...riwayat];
            setRiwayatState(updatedRiwayat);
            simpanRiwayatKeLocalStorage(updatedRiwayat);

            ledState.startTime = null;
        }

        setLedStates(newLedStates);
    }, [ledStates, hargaSewa, riwayat, simpanRiwayatKeLocalStorage]);

    const resetSemuaLED = useCallback(() => {
        const resetStates = Array(JUMLAH_SAWAH).fill(null).map(() => ({ isOn: false, startTime: null }));
        setLedStates(resetStates);
    }, []);

    const value = {
        ledStates,
        hargaSewa,
        riwayat,
        toggleLED,
        setHargaSewa,
        resetSemuaLED,
    };

    return (
        <IrigasiContext.Provider value={value}>
            {children}
        </IrigasiContext.Provider>
    );
};

export const useIrigasi = () => {
    const context = useContext(IrigasiContext);
    if (!context) {
        throw new Error('useIrigasi harus digunakan di dalam IrigasiProvider');
    }
    return context;
};
