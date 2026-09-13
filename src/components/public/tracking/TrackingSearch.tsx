
import { useState } from 'react'
import { navigateTo } from '../../../lib/navigation'

export function TrackingSearch() {
  const [trackingNumber, setTrackingNumber] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const value = trackingNumber.trim()

    if (!value) {
      return
    }

    navigateTo(`/track/${encodeURIComponent(value)}`)
  }

  return (
    <form className="tracking-search" onSubmit={handleSubmit}>
      <label htmlFor="tracking-number">
        Enter your tracking number
      </label>

      <div className="tracking-search-row">
        <input
          id="tracking-number"
          name="trackingNumber"
          type="text"
          value={trackingNumber}
          onChange={(event) => setTrackingNumber(event.target.value)}
          placeholder="Enter tracking number"
          autoComplete="off"
          spellCheck={false}
        />

        <button type="submit">
          Track parcel
        </button>
      </div>

      <small>
        Your tracking number can be found on your shipment receipt.
      </small>
    </form>
  )
}

