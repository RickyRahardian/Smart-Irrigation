export interface HistoryItem {
  sawah: string;
  mulai: Date;
  selesai: Date;
  durasi: number;
  biaya: number;
}
  
  export interface LEDState {
    isOn: boolean;
    startTime: Date | null;
  }
  
  export const WILAYAH_LED = [
    'Sawah 1', 'Sawah 2', 'Sawah 3', 'Sawah 4', 'Sawah 5',
    'Sawah 6', 'Sawah 7', 'Sawah 8', 'Sawah 9', 'Sawah 10'
  ];