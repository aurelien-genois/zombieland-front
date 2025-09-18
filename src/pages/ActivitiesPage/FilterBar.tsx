import { useState } from 'react';

export default function FilterBar(){

  const [frousse, setFrousse] = useState<0 | 1 | 2 | 3>(0);
  const [intensite, setIntensite] = useState(false);
  const [pmr, setPmr] = useState(false);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {/* Niveau de frousse : 0 1 2 3 */}
        <div className="relative">
          <select
            id="frousse"
            value={frousse}
            onChange={(e) => {
            const v = Number(e.target.value) as 0 | 1 | 2 | 3;
            setFrousse(v);
            }}
            className="appearance-none px-4 pr-9 py-1.5 rounded-xl border border-green-border-filter bg-green-bg-filter text-green-text
                    hover:border-red-border-filter-focus transition outline-none
                    focus-visible:ring-red-100/0"
          >
            <option value={0}>FROUSSE</option>
            <option value={1}>léger</option>
            <option value={2}>tendu</option>
            <option value={3}>très flippant</option>
          </select> 
        </div>

        {/* Intensité (toggle) */}
        <button
          type="button"
          aria-pressed={intensite}
          onClick={() => {
            const v = !intensite;
            setIntensite(v);
          }}
          className={`px-4 py-1.5 rounded-xl border transition inline-flex items-center gap-2
                outline-none focus-visible:ring-2 focus-visible:ring-brand/60  
                ${intensite ? " bg-red-bg-btn border-red-border-filter-focus text-white" : "bg-green-bg-filter border-green-border-filter hover:border-red-border-filter-focus text-green-text"}`}
        >
          INTENSITÉ
        </button>

        {/* PMR (toggle) */}
        <button
          type="button"
          aria-pressed={pmr}
          onClick={() => {
            const v = !pmr;
            setPmr(v);
          }}
          className={`px-4 py-1.5 rounded-xl border transition inline-flex items-center gap-2
                outline-none focus-visible:ring-2 focus-visible:ring-brand/60 bg-green-bg-filter text-green-text
                ${pmr ?  "bg-red-bg-btn border-red-border-filter-focus text-white" : "bg-green-bg-filter border-green-border-filter hover:border-red-border-filter-focus text-green-text"}`}
        >
          PMR
        </button>
        {/* Reset */}
        <button
          type="button"
          onClick={() => {
            setFrousse(0);
            setIntensite(false);
            setPmr(false);
          }}
          className="px-3 py-1.5 rounded-xl bg-red-bg-btn hover:brightness-110 font-semibold"
        >
          RÉINITIALISER
        </button>
      </div>
    </>    
  )
}