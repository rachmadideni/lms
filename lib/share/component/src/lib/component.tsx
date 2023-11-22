'use client';

import styles from './component.module.css';

/* eslint-disable-next-line */
export interface ComponentProps {
  className?: string;
}

export function Component(props: ComponentProps) {
  return (
    <div className={props.className}>
      <h1>Welcome to Component!</h1>
    </div>
  );
}

export default Component;
