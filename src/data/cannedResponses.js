export const cannedResponses = [
  // Room Service
  {
    keywords: ['food', 'breakfast', 'menu', 'order', 'lunch', 'dinner', 'meal', 'eat', 'hungry', 'restaurant'],
    response: "Our restaurant is open 24/7. You can order food from the in-room tablet or by calling extension 9."
  },
  {
    keywords: ['water', 'bottle', 'drinking water', 'bottles'],
    response: "Sure! Housekeeping will deliver two bottles of drinking water shortly."
  },

  // Housekeeping
  {
    keywords: ['clean room', 'housekeeping', 'towel', 'towels', 'linen', 'clean', 'maid', 'cleaning'],
    response: "Housekeeping has been notified. They will attend to your room in 10–15 minutes."
  },

  // Facilities & Timings
  {
    keywords: ['wifi', 'internet', 'password', 'wi-fi', 'network', 'connection'],
    response: "The WiFi password is: ROOM1234."
  },
  {
    keywords: ['swimming pool', 'pool', 'swim', 'swimming'],
    response: "The swimming pool is open from 6 AM to 8 PM."
  },
  {
    keywords: ['gym', 'fitness', 'exercise', 'workout', 'fitness center'],
    response: "Our gym is open 24 hours and accessible using your room card."
  },

  // Hotel Info
  {
    keywords: ['check out', 'checkout', 'check-out', 'leaving', 'departure'],
    response: "Standard checkout time is 11 AM. You can request late checkout based on availability."
  },
  {
    keywords: ['location', 'address', 'where', 'directions'],
    response: "We are located at 12th Cross, MG Road, Bangalore."
  },

  // Additional helpful responses
  {
    keywords: ['help', 'assist', 'support', 'need'],
    response: "I'm here to help! You can ask me about room service, housekeeping, WiFi, pool timings, gym access, or hotel information."
  },
  {
    keywords: ['thank', 'thanks', 'appreciate'],
    response: "You're welcome! Is there anything else I can help you with?"
  },
  {
    keywords: ['hello', 'hi', 'hey', 'greetings'],
    response: "Hello! Welcome to our hotel. How can I assist you today?"
  },
]

export const fallbackResponse = "I'm sorry, I didn't understand that. Could you please rephrase? You can ask me about food ordering, housekeeping, WiFi, swimming pool timings, gym access, checkout details, or hotel location."