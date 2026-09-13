interface FaqItem {
  question: string
  answer: string
}

interface FaqSection {
  title: string
  items: FaqItem[]
}

const SECTIONS: FaqSection[] = [
  {
    title: 'Tracking',
    items: [
      {
        question: 'How do I track my shipment?',
        answer:
          'Enter your Secure Trace tracking number on the Track Shipment page and select Trace Shipment.',
      },
      {
        question: 'Where can I find my tracking number?',
        answer:
          'Your tracking number is provided in your shipment confirmation or shipping documentation.',
      },
      {
        question:
          'Why is my tracking information not updating?',
        answer:
          'A shipment may temporarily have no new event while it is moving between operational checkpoints. The last verified event remains displayed until a new scan or event is recorded.',
      },
      {
        question: 'What does "In Transit" mean?',
        answer:
          'The shipment has departed one operational point and is moving toward its next destination.',
      },
    ],
  },
  {
    title: 'Transit holds',
    items: [
      {
        question: 'What does "Put On Hold" mean?',
        answer:
          'The shipment has temporarily stopped progressing while Secure Trace addresses an operational issue.',
      },
      {
        question: 'Does a hold mean my shipment is lost?',
        answer:
          'No. A hold is an operational status and does not by itself indicate that a shipment is lost.',
      },
      {
        question: 'Why was my shipment placed on hold?',
        answer:
          'Possible reasons include routing verification, documentation review, package handling issues, destination clarification, or other operational conditions.',
      },
      {
        question:
          'How will I know when the hold is resolved?',
        answer:
          'The tracking timeline shows Hold Cleared and the shipment returns to its next movement stage.',
      },
    ],
  },
  {
    title: 'Delivery',
    items: [
      {
        question: 'Can the delivery date change?',
        answer:
          'Yes. Operational events may change the estimated delivery window. The tracking system displays the latest available estimate.',
      },
      {
        question: 'What does "Out for Delivery" mean?',
        answer:
          'The shipment has entered the final delivery stage.',
      },
      {
        question:
          'What happens if delivery cannot be completed?',
        answer:
          'The shipment receives an appropriate delivery-exception event and the next operational action is recorded.',
      },
    ],
  },
  {
    title: 'Security',
    items: [
      {
        question:
          'Can anyone see my shipment information?',
        answer:
          'Public tracking exposes only the information necessary to identify and follow a shipment. Sensitive customer information is protected.',
      },
      {
        question: 'Can I receive shipment notifications?',
        answer:
          'Yes, where notification services are enabled for the shipment or account.',
      },
    ],
  },
  {
    title: 'Business',
    items: [
      {
        question:
          'Can businesses manage multiple shipments?',
        answer:
          'Yes. Business customers can use the customer portal and operational integrations for shipment visibility.',
      },
      {
        question: 'Will Secure Trace provide API access?',
        answer:
          'The architecture supports a future authenticated logistics API.',
      },
    ],
  },
]

export function Faq() {
  return (
    <section className="tracking-page faq-page">
      <div className="tracking-heading">
        <div>
          <p className="eyebrow">FREQUENTLY ASKED QUESTIONS</p>
          <h1>FAQ</h1>
          <p className="tracking-waybill">
            Tracking, transit holds, delivery, security, and
            business questions.
          </p>
        </div>
      </div>

      {SECTIONS.map((section) => (
        <section
          key={section.title}
          className="public-panel faq-panel"
        >
          <p className="eyebrow">{section.title.toUpperCase()}</p>
          <h2>{section.title}</h2>

          <dl className="faq-list">
            {section.items.map((item) => (
              <div key={item.question} className="faq-item">
                <dt>{item.question}</dt>
                <dd>{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </section>
  )
}