import type { FormEvent } from 'react'
import { MessageCircle } from 'lucide-react'
import type { Destination } from '../../types/travel'

type AssistantChatProps = {
  destination: Destination
  chatText: string
  onChatTextChange: (text: string) => void
  chatAnswer: string
  onAskQuestion: (promptOverride?: string) => void
}

export function AssistantChat({
  destination,
  chatText,
  onChatTextChange,
  chatAnswer,
  onAskQuestion,
}: AssistantChatProps) {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onAskQuestion()
  }

  return (
    <div className="assistant-panel">
      <div className="section-heading slim">
        <p className="eyebrow">AI assistant</p>
        <h2>Ask before you over-plan.</h2>
        <p>
          Chat about timing, routes, pace, and what to skip. With a Gemini key, this becomes a live
          conversational assistant.
        </p>
      </div>

      <div className="chat-box" aria-live="polite">
        <div className="assistant-message">
          <MessageCircle size={18} />
          <p>
            Ask me how long to spend in {destination.name}, what to see first, or when to go.
          </p>
        </div>

        <div className="quick-prompts" aria-label="Suggested questions">
          <button
            type="button"
            className="prompt-chip"
            onClick={() => onAskQuestion(`What are the top 3 hidden gems in ${destination.name}?`)}
          >
            ✦ Top hidden gems
          </button>
          <button
            type="button"
            className="prompt-chip"
            onClick={() =>
              onAskQuestion(`What is the ideal itinerary length for ${destination.name}?`)
            }
          >
            ✦ Ideal duration
          </button>
          <button
            type="button"
            className="prompt-chip"
            onClick={() =>
              onAskQuestion(`What are the must-eat local dishes in ${destination.name}?`)
            }
          >
            ✦ Food & cafe guide
          </button>
        </div>

        {chatAnswer && <p className="answer">{chatAnswer}</p>}

        <form className="chat-input" onSubmit={handleSubmit}>
          <input
            value={chatText}
            onChange={(event) => onChatTextChange(event.target.value)}
            placeholder={`Ask about ${destination.name}...`}
            aria-label="Ask the AI travel assistant"
          />
          <button type="submit">Ask</button>
        </form>
      </div>
    </div>
  )
}
