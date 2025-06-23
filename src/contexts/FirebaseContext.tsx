import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onValue, ref, update } from 'firebase/database';
import { database } from '../firebaseConfig';

/* -----------------------------------------
  DEFINISI TIPE DATA SESUAI DENGAN STRUKTUR FIREBASE
----------------------------------------- */

export interface HistoryItem {
  biaya: number;
  durationMinutes: number;
  durationSeconds: number;
  endTime: string;
}

export interface RegionData {
  currentBiaya: number;
  currentDurationMinutes: number;
  currentDurationSeconds: number;
  startTime: string | null;
  status: boolean;
  history: Record<string, HistoryItem>;
}

export interface IrrigationData {
  lastUpdate: string;
  pumpStatus: boolean;
  pricePerHour: number;
  regions: Record<string, RegionData>;
}

interface FirebaseContextType {
  data: IrrigationData | null;
  updateRegionStatus: (regionKey: string, status: boolean) => void;
}

/* -----------------------------------------
  INISIALISASI CONTEXT
----------------------------------------- */

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

interface FirebaseProviderProps {
  children: ReactNode;
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children }) => {
  const [data, setData] = useState<IrrigationData | null>(null);

  useEffect(() => {
    const databaseRealtime = ref(database, 'irrigationSystem/');

    const unsubscribe = onValue(databaseRealtime, (snapshot) => {
      const dbData = snapshot.val();
      setData(dbData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const updateRegionStatus = (regionKey: string, status: boolean) => {
    // const updates: Record<string, any> = {
    //   [`irrigationSystem/regions/${regionKey}/status`]: status,
    // };

    // if (status) {
    //   updates[`irrigationSystem/regions/${regionKey}/startTime`] = new Date().toISOString();
    //   // Saat dinyalakan, hapus endTime karena mungkin ada sisa sebelumnya
    //   updates[`irrigationSystem/regions/${regionKey}/endTime`] = null;
    // } else {
    //   updates[`irrigationSystem/regions/${regionKey}/endTime`] = new Date().toISOString();
    //   // Saat dimatikan, startTime bisa dibiarkan atau dihapus sesuai kebutuhan
    //   // updates[`irrigationSystem/regions/${regionKey}/startTime`] = null;
    // }

    // update(ref(database), updates)
    //   .catch((error) => {
    //     console.error('Gagal update status region:', error);
    //   });

     const updates: Record<string, any> = {
    [`irrigationSystem/regions/${regionKey}/status`]: status,
  };

  update(ref(database), updates)
    .then(() => {
      console.log("Status berhasil diperbarui");
    })
    .catch((err) => {
      console.error("Gagal memperbarui status:", err);
    });
  };

  return (
    <FirebaseContext.Provider value={{ data, updateRegionStatus }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = (): FirebaseContextType => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
