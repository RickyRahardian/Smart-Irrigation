import { useState } from 'react';
import Dashboard from './Dashboard';
import LEDControl from './LEDControl';
import SawahSidebar from './SawahSideBar';
import { WILAYAH_LED } from '../types/types';

const MainLayout: React.FC = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [sawahName, setSawahName] = useState('Sawah 1');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  function getRegionKeyFromSawahName(sawahName: string): string | null {
  const index = WILAYAH_LED.findIndex(name => name === sawahName);
  return index !== -1 ? `region${index + 1}` : null;
}

console.log("Sawah Name",sawahName)

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'led-control':
        return <LEDControl 
        />;
      default:
        if (activePage.startsWith('sawah-')) {
          return <SawahSidebar 
            regionKey={getRegionKeyFromSawahName(sawahName)}
          />;
        }
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`bg-gray-800 text-white ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-blue-600 rounded-full"
        >
          {isSidebarOpen ? '◄' : '►'}
        </button>
        <nav>
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'led-control', label: 'Kontrol LED' },
            ...WILAYAH_LED.map((_, i) => ({ 
              id: `sawah-${i+1}`, 
              label: `Sawah ${i+1}` 
            }))
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {setActivePage(item.id); setSawahName(item.label)}}
              className={`p-4 w-full text-left ${activePage === item.id ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-100">
        {renderContent()}
      </div>
    </div>
  );
};

export default MainLayout;