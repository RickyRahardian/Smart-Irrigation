import React, {useMemo} from 'react';
import { IconPower } from '@tabler/icons-react';
import { useFirebase } from '../contexts/FirebaseContext';
import { WILAYAH_LED } from '../types/types';

interface RegionSidebarProps {
  regionKey: string | null; // misalnya "region1"
}

type HistoryItem = {
  sawah: string
  mulai: Date
  selesai: Date
  durasi: {
    minutes: number
    seconds: number
  }
  biaya: number
}

const RegionSidebar: React.FC<RegionSidebarProps> = ({ regionKey }) => {
  const { data, updateRegionStatus } = useFirebase();

  function getSawahNameFromRegionKey(regionKey: string): string | null {
  // regionKey diasumsikan formatnya "region1", "region2", dst.
  const match = regionKey.match(/^region(\d+)$/);
  if (!match) return null;

  const index = parseInt(match[1], 10) - 1; // karena indeks array mulai 0
  return WILAYAH_LED[index] ?? null;
}

  if (!data?.regions || !data.regions[regionKey ?? 'region1']) {
    return <div className="p-6">Region tidak ditemukan</div>;
  }

  const formatDuration = (durasi: { minutes: number; seconds: number }) => {
  const { minutes, seconds } = durasi
  return `${minutes}m ${seconds}s`
}

console.log("data", data)
console.log("regionKey", data.regions[regionKey ?? 0])


  const history: HistoryItem[] = useMemo(() => {
  if (!data?.regions || !data.regions[regionKey ?? 0]) return []

  const regionData = data.regions[regionKey ?? 0]
  const historyItems = regionData.history ?? {}

  const result: HistoryItem[] = Object.entries(historyItems).map(([_, item]: any) => ({
    sawah: regionKey ?? 'Region 1',
    mulai: new Date(regionData.startTime ?? 0), // pakai item.startTime, bukan dari regionData
    selesai: new Date(item.endTime),
    durasi: {
      minutes: item.durationMinutes || 0,
      seconds: item.durationSeconds || 0,
    },
    biaya: item.biaya || 0,
  }))

  return result.sort((a, b) => b.selesai.getTime() - a.selesai.getTime())
}, [data, regionKey])

  console.log("historydata",data.regions)
  const region = data.regions[regionKey ?? 'region1'];
  const status = region.status;
  const startTime = region.startTime;

  // Cek apakah ada region lain yang aktif
  const activeRegionKey = Object.keys(data.regions).find(
    (key) => data.regions[key].status === true && key !== regionKey
  );

  const toggleStatus = () => {
    if (!status && activeRegionKey) {
      alert(`Matikan ${activeRegionKey.toUpperCase()} terlebih dahulu!`);
      return;
    }

    // Update ke Firebase
    updateRegionStatus(regionKey ?? 'region1', !status);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        {(getSawahNameFromRegionKey(regionKey ?? 'region1') ?? 'UNKNOWN').toUpperCase()}
      </h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-semibold">Status</p>
            <p className={`text-xl ${status ? 'text-green-600' : 'text-gray-600'}`}>
              {status ? 'AKTIF' : 'NON-AKTIF'}
            </p>
          </div>

          <button
            onClick={toggleStatus}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              status ? 'bg-red-500' : 'bg-green-500'
            } text-white`}
          >
            <IconPower size={20} />
            {status ? 'Matikan' : 'Nyalakan'}
          </button>
        </div>

        {status && startTime && (
          <p className="text-sm text-gray-600">
            Menyala sejak:{' '}
            {new Date(startTime).toLocaleTimeString('id-ID', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })}
          </p>
        )}

        <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Riwayat Penggunaan</h2>
      {history.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada riwayat penggunaan</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border text-left">Sawah</th>
                <th className="p-2 border text-left">Waktu Mulai</th>
                <th className="p-2 border text-left">Waktu Selesai</th>
                <th className="p-2 border text-left">Durasi</th>
                <th className="p-2 border text-left">Biaya</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-2 border">{item.sawah}</td>
                  <td className="p-2 border">
                    {item.mulai.toLocaleString('id-ID', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="p-2 border">
                    {item.selesai?.toLocaleString('id-ID', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    }) || '-'}
                  </td>
                  <td className="p-2 border">{formatDuration(item.durasi)}</td>
                  <td className="p-2 border">
                    Rp{item.biaya.toLocaleString('id-ID')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
      </div>
    </div>
  );
};

export default RegionSidebar;
