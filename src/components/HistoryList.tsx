// src/components/HistoryList.tsx
import React from 'react';
import { useIrigasi } from '../contexts/irigasiContext';

const HistoryList: React.FC = () => {
  const { riwayat } = useIrigasi();

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">Riwayat Penggunaan</h2>
      <div className="overflow-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Sawah</th>
              <th className="border px-2 py-1">Mulai</th>
              <th className="border px-2 py-1">Selesai</th>
              <th className="border px-2 py-1">Durasi (jam)</th>
              <th className="border px-2 py-1">Biaya (Rp)</th>
            </tr>
          </thead>
          <tbody>
            {riwayat.length === 0 ? (
              <tr>
                <td className="border px-2 py-1 text-center" colSpan={5}>Belum ada riwayat.</td>
              </tr>
            ) : (
              riwayat.map((item, index) => (
                <tr key={index}>
                  <td className="border px-2 py-1">{item.sawah}</td>
                  <td className="border px-2 py-1">{new Date(item.mulai).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}</td>
                  <td className="border px-2 py-1">{item.selesai ? new Date(item.selesai).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }) : '-'}</td>
                  <td className="border px-2 py-1">{item.durasi.toFixed(2)}</td>
                  <td className="border px-2 py-1">{item.biaya.toLocaleString('id-ID')}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryList;
