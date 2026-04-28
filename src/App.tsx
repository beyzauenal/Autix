import React, { useState } from "react";

import Step1 from "./components/steps/Step1";
import Step2 from "./components/steps/Step2";
import Step3 from "./components/steps/Step3";
import Step4 from "./components/steps/Step4";
import Step5 from "./components/steps/Step5";

import type { Step, Brand } from "./types/types";

const App: React.FC = () => {
  const [step, setStep] = useState<Step>(1);

  const [brand, setBrand] = useState<Brand | "">("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState<number | "">("");

  const [color, setColor] = useState("");
  const [rim, setRim] = useState("");
  const [light, setLight] = useState("");

  const reset = () => {
    setStep(1);
    setBrand("");
    setModel("");
    setPrice("");
    setColor("");
    setRim("");
    setLight("");
  };

  return (
    <div className="max-w-5xl mx-auto p-10 space-y-10">

      {/* HEADER */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">MERCEDES-KONFIGURATOR AUTIX</h1>
        <p className="text-gray-600">Dein Wunschfahrzeug erstellen</p>
      </div>

      {/* TITLE */}
      <h2 className="text-2xl font-semibold">Jetzt Wunschmodell konfigurieren</h2>

      {/* STEP BAR */}
      <div className="flex justify-between border-b pb-4 text-sm font-medium">
        {["Modell & Preis", "Farbe", "Felgen", "Licht", "Übersicht"].map(
          (label, index) => {
            const id = index + 1;
            const active = step === id;
            const done = step > id;

            return (
              <div
                key={id}
                className={`flex items-center gap-2 ${
                  active ? "text-black" : "text-gray-400"
                }`}
              >
                <div
                  className={`h-7 w-7 flex items-center justify-center rounded-full border
                    ${active ? "bg-black text-white" : ""}
                    ${done ? "bg-green-500 text-white" : ""}
                  `}
                >
                  {id}
                </div>
                <span>{label}</span>
              </div>
            );
          }
        )}
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-3 gap-10">

        {/* LEFT: FORM */}
        <div className="col-span-2">
          {step === 1 && (
            <Step1
              brand={brand}
              setBrand={setBrand}
              model={model}
              setModel={setModel}
              price={price}
              setPrice={setPrice}
              next={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <Step2
              color={color}
              setColor={setColor}
              next={() => setStep(3)}
              back={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <Step3
              rim={rim}
              setRim={setRim}
              next={() => setStep(4)}
              back={() => setStep(2)}
            />
          )}

          {step === 4 && (
            <Step4
              light={light}
              setLight={setLight}
              next={() => setStep(5)}
              back={() => setStep(3)}
            />
          )}

          {step === 5 && (
            <Step5
              brand={brand}
              model={model}
              price={price}
              color={color}
              rim={rim}
              light={light}
              reset={reset}
            />
          )}
        </div>

        {/* RIGHT: LIVE PREVIEW */}
        <div className="bg-black text-white p-5 rounded-xl space-y-3">
          <h3 className="text-lg font-semibold">LIVE-VORSCHAU</h3>

          {brand && model ? (
            <>
              <p>{brand} {model}</p>
              <p>{price ? price + " €" : "-"}</p>
              <p>{color || "-"}</p>
              <p>{rim || "-"}</p>
              <p>{light || "-"}</p>
            </>
          ) : (
            <p className="text-gray-400">Noch kein Modell gewählt</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
