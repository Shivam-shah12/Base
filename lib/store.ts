import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreState {
  dataArray: any[];
  fileName: string | null;
  setDataArray: (newDataArray: any[]) => void;
  setfileName: (name: string | null) => void;
  removeData: () => void;
  close : boolean;
  setClose:(val : boolean)=> void;
  mode:string;
  setMode:(str : string)=> void
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      dataArray: [],
      fileName: null,
      mode:"dark",
      close:true,
      setClose:(val) => set({close : val}),
      setMode: (str)=> set({mode : str}),

    

      setDataArray: (newDataArray) => set({ dataArray: newDataArray }),

      setfileName: (name) => set({ fileName: name }),

      removeData: () => set({ dataArray: [], fileName: null }),
    }),
    {
      name: 'upload-storage', // Key in localStorage
      getStorage: () => localStorage, // Use localStorage
    }
  )
);

export default useStore;
