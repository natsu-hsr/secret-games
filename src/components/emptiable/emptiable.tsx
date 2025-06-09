import Empty from "antd/es/empty";
import type {ReactNode} from "react";

interface EmptiableProps {
  ready: boolean; 
  children: ReactNode | ReactNode[];
  emptyMessage: string;
}

export const Emptiable = ({ready, children, emptyMessage}: EmptiableProps) => {
  return (
    <>
      {
        ready ? (
          {children}
        ) : (
          <Empty description={emptyMessage} />
        )
      }
    </>
  )
}
