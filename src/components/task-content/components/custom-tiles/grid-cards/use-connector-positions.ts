import {useState, useCallback, useLayoutEffect} from 'react';

import type {TransportConnector} from '@store/slices/task-slice';

export interface ConnectorPosition {
  connector: TransportConnector;
  x: number; // позиция внутри wrapperRef (px)
  y: number;
}

export const useConnectorPositions = (
  connectors: TransportConnector[],
  wrapperRef: React.RefObject<HTMLElement>,
  cardRefs: React.MutableRefObject<Record<string, HTMLElement | null>>
): ConnectorPosition[] => {
  const [positions, setPositions] = useState<ConnectorPosition[]>([]);

  const measure = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const wrapRect = wrapper.getBoundingClientRect();

    const next: ConnectorPosition[] = connectors.map(conn => {
      const el1 = cardRefs.current[conn.from];
      const el2 = cardRefs.current[conn.to];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!el1 || !el2) return null as any;

      const r1 = el1.getBoundingClientRect();
      const r2 = el2.getBoundingClientRect();

      let absX: number;
      let absY: number;

      // Горизонтальное соседство
      if (r1.right <= r2.left) {
        absX = r1.right;
        const top = Math.max(r1.top, r2.top);
        const bottom = Math.min(r1.bottom, r2.bottom);
        absY = (top + bottom) / 2;
      } else if (r2.right <= r1.left) {
        absX = r2.right;
        const top = Math.max(r1.top, r2.top);
        const bottom = Math.min(r1.bottom, r2.bottom);
        absY = (top + bottom) / 2;
      }
      // Вертикальное соседство
      else if (r1.bottom <= r2.top) {
        absY = r1.bottom;
        const left = Math.max(r1.left, r2.left);
        const right = Math.min(r1.right, r2.right);
        absX = (left + right) / 2;
      } else if (r2.bottom <= r1.top) {
        absY = r2.bottom;
        const left = Math.max(r1.left, r2.left);
        const right = Math.min(r1.right, r2.right);
        absX = (left + right) / 2;
      }
      // На всякий случай: центр первой
      else {
        absX = r1.left + r1.width / 2;
        absY = r1.top + r1.height / 2;
      }

      // Переводим в координаты wrapperRef
      return {
        connector: conn,
        x: absX - wrapRect.left,
        y: absY - wrapRect.top,
      };
    }).filter(Boolean);

    setPositions(next);
  }, [connectors, wrapperRef, cardRefs]);

  useLayoutEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  return positions;
};