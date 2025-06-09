import {Spin, type SpinProps} from "antd";
import type {ReactNode} from "react"

import styles from './layout-spin.module.scss';

interface LayoutSpinProps extends SpinProps {
  children: ReactNode;
}

export const LayoutSpin = ({children, ...props}: LayoutSpinProps) => (
  <Spin
    {...props}
    wrapperClassName={styles['sp-container']}
    delay={200}
  >
    {children}
  </Spin>
)
