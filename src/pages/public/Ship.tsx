import { useState } from 'react'
import { navigateTo } from '../../lib/navigation'
import { STL_ROUTES } from '../../routes/routes'

type ServiceLevel = 'EXPRESS' | 'STANDARD' | 'ECONOMY'
type PickupPreference = 'PICKUP' | 'DROP_OFF'

interface ShipFormState {
  originCity: string
  originCountry: string
  destinationCity: string
  destinationCountry: string
  packageCount: string
  lengthCm: string
  widthCm: string
  heightCm: string
  weightKg: string
  serviceLevel: ServiceLevel
  pickupPreference: PickupPreference
}

const INITIAL_STATE: ShipFormState = {
  originCity: '',
  originCountry: '',
  destinationCity: '',
  destinationCountry: '',
  packageCount: '1',
  lengthCm: '',
  widthCm: '',
  heightCm: '',
  weightKg: '',
  serviceLevel: 'STANDARD',
  pickupPreference: 'PICKUP',
}

function isFilled(value: string): boolean {
  return value.trim().length > 0
}

function isPositiveNumber(value: string): boolean {
  if (!isFilled(value)) return false
  const n = Number(value)
  return Number.isFinite(n) && n > 0
}

export function Ship() {
  const [form, setForm] = useState<ShipFormState>(INITIAL_STATE)

  const summaryReady =
    isFilled(form.originCity) &&
    isFilled(form.originCountry) &&
    isFilled(form.destinationCity) &&
    isFilled(form.destinationCountry) &&
    isPositiveNumber(form.packageCount) &&
    isPositiveNumber(form.lengthCm) &&
    isPositiveNumber(form.widthCm) &&
    isPositiveNumber(form.heightCm) &&
    isPositiveNumber(form.weightKg)

  function update<K extends keyof ShipFormState>(
    key: K,
    value: ShipFormState[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function continueToRates() {
    if (!summaryReady) return
    navigateTo(STL_ROUTES.rates)
  }

  return (
    <section className="tracking-page ship-page">
      <div className="tracking-heading">
        <div>
          <p className="eyebrow">SHIP A PARCEL</p>
          <h1>Create a shipment</h1>
          <p className="tracking-waybill">
            Provide shipment details to continue to the rate
            estimate.
          </p>
        </div>
      </div>

      <section className="public-panel ship-panel">
        <div className="tracking-panel-heading">
          <p className="eyebrow">ORIGIN</p>
          <h2>Where is the shipment coming from?</h2>
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
              placeholder="City"
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
              placeholder="Country"
              autoComplete="off"
              spellCheck={false}
            />
          </label>
        </div>
      </section>

      <section className="public-panel ship-panel">
        <div className="tracking-panel-heading">
          <p className="eyebrow">DESTINATION</p>
          <h2>Where is the shipment going?</h2>
        </div>

        <div className="ship-field-grid">
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
              placeholder="City"
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
              placeholder="Country"
              autoComplete="off"
              spellCheck={false}
            />
          </label>
        </div>
      </section>

      <section className="public-panel ship-panel">
        <div className="tracking-panel-heading">
          <p className="eyebrow">PACKAGE</p>
          <h2>Package dimensions and weight</h2>
        </div>

        <div className="ship-field-grid">
          <label className="ship-field">
            <span className="ship-field-label">
              Package count
            </span>
            <input
              className="ship-field-input"
              type="number"
              min="1"
              step="1"
              value={form.packageCount}
              onChange={(e) =>
                update('packageCount', e.target.value)
              }
            />
          </label>

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
      </section>

      <section className="public-panel ship-panel">
        <div className="tracking-panel-heading">
          <p className="eyebrow">SERVICE</p>
          <h2>Service level</h2>
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

        <div className="tracking-panel-heading ship-heading-spaced">
          <p className="eyebrow">PICKUP</p>
          <h2>Pickup preference</h2>
        </div>

        <div className="ship-choice-row">
          {(
            [
              { value: 'PICKUP', label: 'Schedule pickup' },
              { value: 'DROP_OFF', label: 'Drop off' },
            ] as const
          ).map((option) => (
            <button
              key={option.value}
              type="button"
              className={`ship-choice${
                form.pickupPreference === option.value
                  ? ' ship-choice-active'
                  : ''
              }`}
              onClick={() =>
                update('pickupPreference', option.value)
              }
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>

      <section className="public-panel ship-panel">
        <div className="tracking-panel-heading">
          <p className="eyebrow">SHIPMENT SUMMARY</p>
          <h2>Review</h2>
        </div>

        <dl className="tracking-facts">
          <div>
            <dt>ORIGIN</dt>
            <dd>
              {form.originCity || '—'}
              {form.originCountry
                ? `, ${form.originCountry}`
                : ''}
            </dd>
          </div>
          <div>
            <dt>DESTINATION</dt>
            <dd>
              {form.destinationCity || '—'}
              {form.destinationCountry
                ? `, ${form.destinationCountry}`
                : ''}
            </dd>
          </div>
          <div>
            <dt>PACKAGES</dt>
            <dd>{form.packageCount || '—'}</dd>
          </div>
          <div>
            <dt>WEIGHT</dt>
            <dd>
              {form.weightKg ? `${form.weightKg} kg` : '—'}
            </dd>
          </div>
          <div>
            <dt>DIMENSIONS</dt>
            <dd>
              {form.lengthCm && form.widthCm && form.heightCm
                ? `${form.lengthCm} × ${form.widthCm} × ${form.heightCm} cm`
                : '—'}
            </dd>
          </div>
          <div>
            <dt>SERVICE</dt>
            <dd>{form.serviceLevel}</dd>
          </div>
          <div>
            <dt>PICKUP</dt>
            <dd>
              {form.pickupPreference === 'PICKUP'
                ? 'Schedule pickup'
                : 'Drop off'}
            </dd>
          </div>
        </dl>

        <div className="ship-actions">
          <button
            type="button"
            className="btn-ember"
            disabled={!summaryReady}
            onClick={continueToRates}
          >
            Continue to rate estimate
          </button>

          {!summaryReady ? (
            <p className="ship-actions-note">
              Fill in origin, destination, dimensions, and
              weight to continue.
            </p>
          ) : null}
        </div>
      </section>
    </section>
  )
}