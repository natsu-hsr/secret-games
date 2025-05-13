import Card from 'antd/es/card/Card'
import Title from 'antd/es/typography/Title'
import cn from 'classnames';
import {useState} from 'react';

import {
  type TTileData,
  type TTilesData,
  taskSliceActions,
} from '../../../../store/slices/task-slice';
import {useAppDispatch} from '../../../../store/config/hooks';

import styles from './custom-tiles.module.scss';

interface CustomTilesProps {
  tilesData: TTilesData
}

export const CustomTiles = ({tilesData}: CustomTilesProps) => {
  const dispatch = useAppDispatch();
  const [selectedId, setSelectedId] = useState<number | undefined>(tilesData?.[0].id ?? undefined);

  const handleClick = (tile: TTileData) => {
    const {
      id,
      coordinates,
      formConfig,
    } = tile;

    setSelectedId(id);
    dispatch(taskSliceActions.updateMapData(coordinates));
    dispatch(taskSliceActions.updateFormConfig(formConfig));
  };

  return (
    <div className={styles.container}>
      <Title className={styles.title} level={4}>Продукты</Title>
      <div className={styles.tileGrid}>
        {tilesData.map(t => (
          <Card
            key={t.id}
            className={cn(styles.tile, selectedId === t.id && styles.selected)}
            onClick={() => handleClick(t)}
            hoverable
          >
            <Title level={5}>{t.title}</Title>
          </Card>
        ))}
      </div>
    </div>
  )
}
