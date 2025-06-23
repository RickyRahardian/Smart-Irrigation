import React, { useEffect, useState } from 'react';
import { ref, onValue, update, set } from 'firebase/database';
import { database } from '../firebaseConfig';

interface RegionData {
  status: boolean;
  startTime: string | null;
}

interface Regions {
  [key: string]: RegionData;
}

const LEDControl: React.FC = () => {
  const [regions, setRegions] = useState<Regions>({});
  const [hargaSewa, setHargaSewa] = useState<number>(5000);

  const [showModal, setShowModal] = useState(false);
  const [hargaBaru, setHargaBaru] = useState<string>('');

  useEffect(() => {
    const regionRef = ref(database, 'irrigationSystem/regions');
    const hargaRef = ref(database, 'irrigationSystem/pricePerHour');

    const unsubRegion = onValue(regionRef, (snapshot) => {
      const data = snapshot.val() || {};
      setRegions(data);
    });

    const unsubHarga = onValue(hargaRef, (snapshot) => {
      const harga = snapshot.val();
      if (harga) setHargaSewa(harga);
    });

    return () => {
      unsubRegion();
      unsubHarga();
    };
  }, []);

  const toggleLED = (regionKey: string) => {
    const current = regions[regionKey];
    const isTurningOn = !current.status;

    if (isTurningOn && Object.values(regions).some(r => r.status)) {
      alert('Matikan sawah lain terlebih dahulu!');
      return;
    }

    const updates = {
      status: isTurningOn,
      // startTime: isTurningOn ? new Date().toISOString() : null,
    };

    update(ref(database, `irrigationSystem/regions/${regionKey}`), updates);
  };

  const handleSaveHarga = () => {
    const parsed = Number(hargaBaru);
    if (!isNaN(parsed)) {
      set(ref(database, 'irrigationSystem/pricePerHour'), parsed);
      setShowModal(false);
    } else {
      alert('Masukkan angka yang valid!');
    }
  };

  const resetAll = () => {
    if (Object.values(regions).some(r => r.status) && !confirm('Ada sawah aktif. Yakin reset semua?')) return;

    const resetData: { [key: string]: RegionData } = {};
    Object.keys(regions).forEach(key => {
      resetData[key] = { status: false, startTime: null };
    });

    set(ref(database, 'irrigationSystem/regions'), resetData);
  };

  const sortedRegionKeys = Object.keys(regions).sort((a, b) => {
    const numA = parseInt(a.replace('region', ''));
    const numB = parseInt(b.replace('region', ''));
    return numA - numB;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Kontrol Irigasi</h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {sortedRegionKeys.map((regionKey) => (
          <div key={regionKey} className="bg-white p-4 rounded-lg shadow text-center">
            <div className={`w-12 h-12 mx-auto rounded-full mb-2 ${
              regions[regionKey].status ? 'bg-green-500' : 'bg-gray-300'
            }`} />
            <p className="font-medium">{regionKey.toUpperCase()}</p>
            <button
              onClick={() => toggleLED(regionKey)}
              className={`mt-2 px-3 py-1 rounded text-sm ${
                regions[regionKey].status ? 'bg-red-500' : 'bg-green-500'
              } text-white`}
            >
              {regions[regionKey].status ? 'MATI' : 'NYALA'}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex justify-between items-center">
          <span className="font-semibold">
            Harga Sewa: Rp{hargaSewa.toLocaleString()}/jam
          </span>
          <button
            onClick={() => {
              setHargaBaru(hargaSewa.toString());
              setShowModal(true);
            }}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Edit Harga
          </button>
        </div>
      </div>

      <button
        onClick={resetAll}
        className="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Reset Semua
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-lg font-semibold mb-4">Edit Harga Sewa</h2>
            <input
              type="number"
              value={hargaBaru}
              onChange={(e) => setHargaBaru(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4"
              placeholder="Masukkan harga baru (Rp)"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Batal
              </button>
              <button
                onClick={handleSaveHarga}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LEDControl;
