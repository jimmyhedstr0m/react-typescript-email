declare namespace JSX {
  interface IntrinsicElements {
    unsubscribe: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}

declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.scss' {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module "*.json" {
  const value: any;
  export default value;
}