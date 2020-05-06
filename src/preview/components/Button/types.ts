interface OwnProps {
  className?: string;
  modifiers?: string;
  to?: string;
}

export type Props = OwnProps & React.HTMLProps<HTMLButtonElement>;