import { useState } from 'react'

type EnquiryKind =
  | 'CUSTOMER_SERVICE'
  | 'SHIPMENT_ASSISTANCE'
  | 'GENERAL'
  | 'BUSINESS'

interface ContactFormState {
  kind: EnquiryKind
  name: string
  email: string
  subject: string
  message: string
}

const INITIAL_STATE: ContactFormState = {
  kind: 'CUSTOMER_SERVICE',
  name: '',
  email: '',
  subject: '',
  message: '',
}

const ENQUIRY_OPTIONS: { value: EnquiryKind; label: string }[] = [
  {
    value: 'CUSTOMER_SERVICE',
    label: 'Customer service',
  },
  {
    value: 'SHIPMENT_ASSISTANCE',
    label: 'Shipment assistance',
  },
  { value: 'GENERAL', label: 'General enquiry' },
  { value: 'BUSINESS', label: 'Business enquiry' },
]

function isFilled(v: string): boolean {
  return v.trim().length > 0
}

export function Contact() {
  const [form, setForm] = useState<ContactFormState>(INITIAL_STATE)
  const [submitted, setSubmitted] = useState(false)

  const ready =
    isFilled(form.name) &&
    isFilled(form.email) &&
    isFilled(form.subject) &&
    isFilled(form.message)

  function update<K extends keyof ContactFormState>(
    key: K,
    value: ContactFormState[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!ready) return
    setSubmitted(true)
  }

  return (
    <section className="tracking-page contact-page">
      <div className="tracking-heading">
        <div>
          <p className="eyebrow">CONTACT</p>
          <h1>Contact Secure Trace Logistics</h1>
          <p className="tracking-waybill">
            Customer service, shipment assistance, general
            enquiries, and business enquiries.
          </p>
        </div>
      </div>

      <section className="public-panel contact-panel">
        <div className="tracking-panel-heading">
          <p className="eyebrow">ENQUIRY TYPE</p>
          <h2>What is this about?</h2>
        </div>

        <div className="ship-choice-row">
          {ENQUIRY_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`ship-choice${
                form.kind === option.value
                  ? ' ship-choice-active'
                  : ''
              }`}
              onClick={() => update('kind', option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>

      <section className="public-panel contact-panel">
        <div className="tracking-panel-heading">
          <p className="eyebrow">MESSAGE</p>
          <h2>How can we reach you?</h2>
        </div>

        <form
          className="contact-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="ship-field-grid">
            <label className="ship-field">
              <span className="ship-field-label">Name</span>
              <input
                className="ship-field-input"
                type="text"
                value={form.name}
                onChange={(e) =>
                  update('name', e.target.value)
                }
                autoComplete="name"
              />
            </label>

            <label className="ship-field">
              <span className="ship-field-label">Email</span>
              <input
                className="ship-field-input"
                type="email"
                value={form.email}
                onChange={(e) =>
                  update('email', e.target.value)
                }
                autoComplete="email"
              />
            </label>
          </div>

          <label className="ship-field">
            <span className="ship-field-label">Subject</span>
            <input
              className="ship-field-input"
              type="text"
              value={form.subject}
              onChange={(e) =>
                update('subject', e.target.value)
              }
            />
          </label>

          <label className="ship-field">
            <span className="ship-field-label">Message</span>
            <textarea
              className="ship-field-input contact-textarea"
              value={form.message}
              onChange={(e) =>
                update('message', e.target.value)
              }
              rows={6}
            />
          </label>

          <div className="ship-actions">
            <button
              type="submit"
              className="btn-ember"
              disabled={!ready || submitted}
            >
              {submitted ? 'Message received' : 'Send message'}
            </button>

            {submitted ? (
              <p className="ship-actions-note">
                Thank you. Your enquiry has been recorded
                locally on this page. Delivery requires the
                contact backend to be connected.
              </p>
            ) : !ready ? (
              <p className="ship-actions-note">
                Fill in name, email, subject, and message to
                send.
              </p>
            ) : null}
          </div>
        </form>
      </section>
    </section>
  )
}