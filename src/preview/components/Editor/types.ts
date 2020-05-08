interface OwnProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export type Props = OwnProps;