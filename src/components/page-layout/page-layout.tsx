import Card from "antd/es/card/Card";
import cn from 'classnames';
import type {ReactNode} from "react";

import styles from './page-layout.module.scss';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  classNames?: {
    wrapperClassName?: cn.Argument;
  }
  fullSize?: boolean;
}

export const PageLayout = ({
  children,
  title,
  classNames,
  fullSize,
}: PageLayoutProps) => {
  const {
    wrapperClassName,
  } = classNames ?? {};

  return (
    <Card
      className={cn(styles.card, wrapperClassName, fullSize && styles['full-size'])}
      title={title}
    >
      {children}
    </Card>
  )
}
