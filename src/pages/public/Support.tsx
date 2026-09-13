
import { navigateTo } from '../../lib/navigation'
import { STL_ROUTES } from '../../routes/routes'
import { FloatingCard } from '../../components/ui/FloatingCard'

export function Support() {
  return (
    <section className="tracking-page support-page">
      <div className="tracking-heading">
        <div>
          <p className="eyebrow">SUPPORT CENTER</p>

          <h1>
            When you need clarity,
            <br />
            we are here to help.
          </h1>

          <p className="tracking-waybill">
            Every shipment has a journey. Sometimes that journey
            raises a question. SecureTraceLogistics is here to
            help you understand what your tracking information
            means, what has happened, and what to do next.
          </p>
        </div>
      </div>

      <section className="floating-card-grid">
        <FloatingCard
          number="01"
          title="Find your shipment"
          body="A tracking number is your key to shipment visibility. Enter it exactly as shown on your shipment receipt to reveal the recorded journey and latest available status."
        />

        <FloatingCard
          number="02"
          title="Understand the status"
          body="A shipment status is more than a label. It tells you where your shipment stands within its recorded movement. If something looks unfamiliar, we are here to help you understand it."
        />

        <FloatingCard
          number="03"
          title="Resolve a concern"
          body="When a shipment does not move as expected, clarity comes first. Contact us with the relevant shipment details and our support channel can help guide your enquiry."
        />

        <FloatingCard
          number="04"
          title="Ask with confidence"
          body="No question is too small when it concerns something entrusted to our logistics network. Reach out for tracking assistance, shipment enquiries, service questions, or general guidance."
        />
      </section>

      <section className="public-panel support-panel">
        <p className="eyebrow">HELP WHEN IT MATTERS</p>

        <h2>
          A clear answer is
          <br />
          better than uncertainty.
        </h2>

        <ul className="support-channels">
          <li>
            <div>
              <strong>Contact our team</strong>
              <span>
                For shipment assistance, customer service,
                general enquiries, and business conversations,
                send us a message through the contact channel.
              </span>
            </div>

            <button
              type="button"
              className="support-channel-action"
              onClick={() => navigateTo(STL_ROUTES.contact)}
            >
              Contact us
            </button>
          </li>

          <li>
            <div>
              <strong>Explore the answers</strong>
              <span>
                Find straightforward guidance for tracking,
                shipment movement, delivery questions, transit
                holds, and security.
              </span>
            </div>

            <button
              type="button"
              className="support-channel-action"
              onClick={() => navigateTo(STL_ROUTES.faq)}
            >
              Explore FAQ
            </button>
          </li>

          <li>
            <div>
              <strong>Live assistance</strong>
              <span>
                Direct live chat is being prepared for a future
                stage of the SecureTraceLogistics support
                experience.
              </span>
            </div>

            <span className="support-channel-disabled">
              Coming soon
            </span>
          </li>
        </ul>
      </section>
    </section>
  )
}

