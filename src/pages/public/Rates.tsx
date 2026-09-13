import { useState } from 'react'

type ServiceLevel = 'EXPRESS' | 'STANDARD' | 'ECONOMY'

interface RatesFormState {
  originCity: string
  originCountry: string
  destinationCity: string
  destinationCountry: string
  weightKg: string
  lengthCm: string
  widthCm: string
  heightCm: string
  serviceLevel: ServiceLevel
}

const INITIAL_STATE: RatesFormState = {
  originCity: '',
  originCountry: '',
  destinationCity: '',
  destinationCountry: '',
  weightKg: '',
  lengthCm: '',
  widthCm: '',
  heightCm: '',
  serviceLevel: 'STANDARD',
}

function isFilled(value: string): boolean {
  return value.trim().length > 0
}

function isPositiveNumber(value: string): boolean {
  if (!isFilled(value)) return false
  const n = Number(value)
  return Number.isFinite(n) && n > 0
}

export function Rates() {
  const [form, setForm] = useState<RatesFormState>(INITIAL_STATE)

  const ready =
    isFilled(form.originCity) &&
    isFilled(form.originCountry) &&
    isFilled(form.destinationCity) &&
    isFilled(form.destinationCountry) &&
    isPositiveNumber(form.weightKg)

  function update<K extends keyof RatesFormState>(
    key: K,
    value: RatesFormState[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <section className="tracking-page rates-page">
      <div className="tracking-heading">
        <div>
          <p className="eyebrow">RATES &amp; TRANSIT TIMES</p>
          <h1>Estimate a shipment</h1>
          <p className="tracking-waybill">
            Enter shipment details to prepare a rate estimate.
          </p>
        </div>
      </div>

      <section className="public-panel rates-panel">
        <div className="tracking-panel-heading">
          <p className="eyebrow">ROUTE</p>
          <h2>Origin and destination</h2>
        </div>

        <div className="ship-field-grid">
          <label className="ship-field">
            <span className="ship-field-label">Origin city</span>
            <input
              className="ship-field-input"
              type="text"
              value={form.originCity}
              onChange={(e) =>
                update('originCity', e.target.value)
              }
              autoComplete="off"
              spellCheck={false}
            />
          </label>

          <label className="ship-field">
            <span className="ship-field-label">
              Origin country
            </span>
            <input
              className="ship-field-input"
              type="text"
              value={form.originCountry}
              onChange={(e) =>
                update('originCountry', e.target.value)
              }
              autoComplete="off"
              spellCheck={false}
            />
          </label>

          <label className="ship-field">
            <span className="ship-field-label">
              Destination city
            </span>
            <input
              className="ship-field-input"
              type="text"
              value={form.destinationCity}
              onChange={(e) =>
                update('destinationCity', e.target.value)
              }
              autoComplete="off"
              spellCheck={false}
            />
          </label>

          <label className="ship-field">
            <span className="ship-field-label">
              Destination country
            </span>
            <input
              className="ship-field-input"
              type="text"
              value={form.destinationCountry}
              onChange={(e) =>
                update('destinationCountry', e.target.value)
              }
              autoComplete="off"
              spellCheck={false}
            />
          </label>
        </div>
      </section>

      <section className="public-panel rates-panel">
        <div className="tracking-panel-heading">
          <p className="eyebrow">SHIPMENT</p>
          <h2>Weight and dimensions</h2>
        </div>

        <div className="ship-field-grid">
          <label className="ship-field">
            <span className="ship-field-label">Weight (kg)</span>
            <input
              className="ship-field-input"
              type="number"
              min="0.1"
              step="0.1"
              value={form.weightKg}
              onChange={(e) =>
                update('weightKg', e.target.value)
              }
            />
          </label>

          <label className="ship-field">
            <span className="ship-field-label">Length (cm)</span>
            <input
              className="ship-field-input"
              type="number"
              min="1"
              step="1"
              value={form.lengthCm}
              onChange={(e) =>
                update('lengthCm', e.target.value)
              }
            />
          </label>

          <label className="ship-field">
            <span className="ship-field-label">Width (cm)</span>
            <input
              className="ship-field-input"
              type="number"
              min="1"
              step="1"
              value={form.widthCm}
              onChange={(e) =>
                update('widthCm', e.target.value)
              }
            />
          </label>

          <label className="ship-field">
            <span className="ship-field-label">Height (cm)</span>
            <input
              className="ship-field-input"
              type="number"
              min="1"
              step="1"
              value={form.heightCm}
              onChange={(e) =>
                update('heightCm', e.target.value)
              }
            />
          </label>
        </div>

        <div className="tracking-panel-heading ship-heading-spaced">
          <p className="eyebrow">SERVICE LEVEL</p>
          <h2>Select service</h2>
        </div>

        <div className="ship-choice-row">
          {(
            [
              { value: 'EXPRESS', label: 'Express' },
              { value: 'STANDARD', label: 'Standard' },
              { value: 'ECONOMY', label: 'Economy' },
            ] as const
          ).map((option) => (
            <button
              key={option.value}
              type="button"
              className={`ship-choice${
                form.serviceLevel === option.value
                  ? ' ship-choice-active'
                  : ''
              }`}
              onClick={() =>
                update('serviceLevel', option.value)
              }
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>

      <section className="public-panel rates-panel">
        <div className="tracking-panel-heading">
          <p className="eyebrow">ESTIMATE</p>
          <h2>Rate estimate status</h2>
        </div>

        {ready ? (
          <div className="rates-estimate">
            <p className="rates-estimate-lead">
              Shipment details received.
            </p>
            <p className="rates-estimate-body">
              Rate calculation requires the STL Rate Engine to
              be connected. No monetary estimate is issued from
              this screen.
            </p>
            <p className="rates-estimate-note">
              Final rates depend on shipment details, service
              level, and origin-to-destination routing.
            </p>
          </div>
        ) : (
          <div className="rates-estimate rates-estimate-empty">
            <p className="rates-estimate-note">
              Provide origin, destination, and weight to
              prepare an estimate.
            </p>
          </div>
        )}
      </section>
    </section>
  )
}