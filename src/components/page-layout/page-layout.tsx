import Card from "antd/es/card/Card";
import type {ReactNode} from "react";

import styles from './page-layout.module.scss';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  classNames?: {
    wrapperClassName?: string;
  }
}

export const PageLayout = ({
  children,
  title,
  classNames,
}: PageLayoutProps) => {
  const {
    wrapperClassName,
  } = classNames ?? {};


  return (
    <Card
      className={`${styles.card}${wrapperClassName ? ` ${wrapperClassName}` : ''}`}
      title={title}
    >
      {children}
    </Card>
  )
}
