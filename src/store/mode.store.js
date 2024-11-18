import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useModeState = create(
  persist(
    (set, get) => ({
      _hasHydrated: false,
      backdarkmode: null,
      darkmode: null,
      containdarkmode: null,
      buttdarkmode:null,
      hbackdarkmode: null,
      hdarkmode: null,
      hcontaindarkmode: null,
      hbuttdarkmode:null,
      setbackDarkmode: (backdarkmode) => set({ backdarkmode }),
      setcontainDarkmode: (containdarkmode) => set({ containdarkmode }),
      setDark: (darkmode) => set({ darkmode }),
      setButtondarkmode: (buttdarkmode) => set({buttdarkmode }),
      sethbackDarkmode: (hbackdarkmode) => set({ hbackdarkmode }),
      sethcontainDarkmode: (hcontaindarkmode) => set({ hcontaindarkmode }),
      sethDark: (hdarkmode) => set({ hdarkmode }),
      sethButtondarkmode: (hbuttdarkmode) => set({hbuttdarkmode}),

      
      changeLightMode: (isdark) => {
        console.log(isdark);
        const { darkmode, backdarkmode,containdarkmode, buttdarkmode,hbackdarkmode,hdarkmode,hcontaindarkmode,hbuttdarkmode, } = get();
        console.log(darkmode, backdarkmode)

        if (isdark === true) {
          set({ darkmode: '#ffffff' });
          set({ backdarkmode: '#222831' });
          set({ containdarkmode: '#000' });
          set({ buttdarkmode: '#F1F1F1' });
          set({ hdarkmode: '#000000' });
          set({ hbackdarkmode: '#F1F1F1' });
          set({ hcontaindarkmode: '#000'});
          set({ hbuttdarkmode: '#4A628A' });
          document.getElementById('root').style.color=darkmode
          document.getElementById('root').style.backgroundColor=backdarkmode
          
        }
        else{
          set({ darkmode: '#000000' });
          set({ backdarkmode: '#FEFEFE' });
          set({ containdarkmode: '#EEE' });
          set({ buttdarkmode: '#4A628A' });
          set({ hdarkmode: '#FFF' });
          set({ hbackdarkmode: '#222831' });
          set({ hcontaindarkmode: '#FFF' });
          set({ hbuttdarkmode: '#EEEEEE' });
          document.getElementById('root').style.color=darkmode
          document.getElementById('root').style.backgroundColor=backdarkmode
          
        }

       

          
      },
    }),
    {
      name: 'mode-store',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state._hasHydrated = true;
      },
    }
  )
);
