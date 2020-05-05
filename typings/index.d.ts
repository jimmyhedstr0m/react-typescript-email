export { };

declare global {
  namespace JSX {
    interface IntrinsicElements {
      unsubscribe: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}