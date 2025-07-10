import {Empty} from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import cn from 'classnames';
import type {ReactNode} from 'react';

import {LayoutSpin} from './layout-spin/layout-spin';
import styles from './loadable.module.scss';

import ErrorSvg from '@assets/error.svg?react';

interface ErrorProps {
  hasError: boolean;
  errorMessage?: string;
}

interface LoadingProps {
  isLoading: boolean;
  loadingMessage?: string;
}

interface EmptyProps {
  isEmpty: boolean;
  emptyMessage?: string;
}

interface LoadableProps {
  children: ReactNode;
  loadingProps: LoadingProps;
  errorProps: ErrorProps;
  emptyProps: EmptyProps;
}

export const Loadable: React.FC<LoadableProps> = ({
  children,
  loadingProps,
  errorProps,
  emptyProps,
}) => {
  const {
    isLoading,
    loadingMessage = 'Загрузка...'
  } = loadingProps;
  const {
    hasError,
    errorMessage = 'Во время загрузки произошла ошибка'
  } = errorProps;
  const {
    isEmpty,
    emptyMessage = 'Данные не найдены'
  } = emptyProps;


  return (
    <LayoutSpin spinning={isLoading} tip={loadingMessage}>
      {(() => {
        if (hasError) {
          return (
            <div className={styles['error-container']}>
              <ErrorSvg className={styles['error-icon']} />
              <Paragraph className={styles['error-message']}>
                {errorMessage}
              </Paragraph>
            </div>
          )
        }

        if (isEmpty) {
          return (
            <Empty
              className={cn('fh', 'flex-col-center')}
              description={emptyMessage}
            />
          );
        }

        return children;
      })()}
    </LayoutSpin>
  );
};


