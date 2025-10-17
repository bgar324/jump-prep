interface Props {
  link: string;
  text: string;
}

export default function Button({ link, text }: Props) {
  return (
    <a
      className="text-sm rounded-full bg-blue-600 px-5 py-2 text-white font-medium hover:opacity-90 active:opacity-80 transition"
      href={link}
    >
      {text}
    </a>
  );
}

// Problem Statement: Order Book Matcher
// You're building a simplified order matching system.
// Requirements:
// Build a React + TypeScript component that:

// Displays two columns:

// Left column (BIDS): Buy orders, sorted by price descending (highest first)
// Right column (ASKS): Sell orders, sorted by price ascending (lowest first)


// Shows for each order:

// Price
// Quantity
// Total quantity at that price level (if multiple orders exist)


// Aggregate orders by price:

// If multiple orders have the same price, combine their quantities
// Example: Two buy orders at $150 for 100 and 50 shares → show "150 @ $150"


// Add a "Submit Order" form:

// Inputs: Side (BUY/SELL dropdown), Price, Quantity
// On submit: Add to the appropriate column
// Matching logic: If the new order crosses the spread, execute the trade:

// BUY order at $155 when lowest SELL is $150 → Match! Remove both orders, show "Trade executed!"
// Otherwise, add to the book

// Display the spread:

// Show: Best Bid (highest buy), Best Ask (lowest sell), Spread (difference)