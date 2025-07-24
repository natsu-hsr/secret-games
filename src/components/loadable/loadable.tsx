import {Empty, Skeleton} from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import cn from 'classnames';
import type {ReactNode} from 'react';

import {LayoutSpin} from './layout-spin';
import styles from './styles.module.scss';

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
  skeleton?: boolean;
}

export const Loadable: React.FC<LoadableProps> = ({
  children,
  loadingProps,
  errorProps,
  emptyProps,
  skeleton = false,
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

  if (skeleton) {
    return (
      <Skeleton
        className={styles.skeleton}
        active={isLoading}
        loading={isLoading}
        title
        paragraph={{rows: 8}}
      >
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

          if (isEmpty && !isLoading) {
            return (
              <Empty
                className={cn('fh', 'flex-col-center')}
                description={emptyMessage}
              />
            );
          }

          return children;
        })()}
      </Skeleton>
    );
  }

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

        if (isEmpty && !isLoading) {
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


