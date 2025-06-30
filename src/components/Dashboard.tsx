import React, { useMemo  } from 'react';
import { useFirebase } from '../contexts/FirebaseContext';


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


const formatDuration = (durasi: { minutes: number; seconds: number }) => {
  const { minutes, seconds } = durasi
  return `${minutes}m ${seconds}s`
}

const Dashboard: React.FC = () => {
  const { data } = useFirebase()

  

  if (!data) return <p>Memuat data...</p>

  const sortedRegions = Object.entries(data.regions).sort(([a], [b]) => {
    const numA = parseInt(a.replace('region', ''))
    const numB = parseInt(b.replace('region', ''))
    return numA - numB
  })

  const history: HistoryItem[] = useMemo(() => {
    if (!data?.regions) return []

    const result: HistoryItem[] = []

    Object.entries(data.regions).forEach(([regionKey, regionData]: any) => {
      const historyItems = regionData.history ?? {}

      Object.entries(historyItems).forEach(([_, item]: any) => {
        result.push({
          sawah: regionKey.toUpperCase(),
          mulai: new Date(regionData.startTime), // asumsi waktu mulai dari data utama
          selesai: new Date(item.endTime),
          durasi: {
            minutes: item.durationMinutes || 0,
            seconds: item.durationSeconds || 0,
          },
          biaya: item.biaya || 0,
        })
      })
    })

    // Urutkan berdasarkan waktu selesai terbaru
    return result.sort((a, b) => b.selesai.getTime() - a.selesai.getTime())
  }, [data])

  console.log("fata history dashbord", data.regions)

  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Irigasi</h1>

      {/* Statistik Ringkas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold">Status Saat Ini</h3>
          {sortedRegions.find(([_, region]) => region.status) ? (
        sortedRegions
          .filter(([_, region]) => region.status)
          .slice(0, 1) // hanya ambil 1 yang aktif
          .map(([regionKey]) => (
            <div
              key={regionKey}
              className="p-3 rounded-lg text-center bg-green-100"
            >
              <p className="font-medium text-lg">{regionKey.toUpperCase()}</p>
              <div className="w-8 h-8 mx-auto my-2 rounded-full bg-green-500" />
              <p className="text-sm text-green-800 font-semibold">Aktif</p>
            </div>
          ))
      ) : (
        <p className="text-center text-gray-600">Tidak ada sawah yang aktif</p>
      )}
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold">Harga Sewa</h3>
          <p className="text-xl mt-2">Rp{data.pricePerHour.toLocaleString()}/jam</p>
        </div>
      </div>

      {/* Status Sawah */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">Status Sawah</h2>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {sortedRegions.map(([regionKey, region]) => (
          <div
            key={regionKey}
            className={`p-3 rounded-lg text-center ${
              region.status ? 'bg-green-100' : 'bg-gray-100'
            }`}
          >
            <p className="font-medium">{regionKey.toUpperCase()}</p>
            <div
              className={`w-8 h-8 mx-auto my-2 rounded-full ${
                region.status ? 'bg-green-500' : 'bg-gray-400'
              }`}
            />
            <p className="text-sm">
              {region.status ? 'Aktif' : 'Non-aktif'}
            </p>
          </div>
        ))}
      </div>
    </div>

      {/* Tabel Riwayat */}
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
  );
};

export default Dashboard;