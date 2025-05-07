import Card from 'antd/es/card/Card'
import Title from 'antd/es/typography/Title'

import styles from './custom-tiles.module.scss';

export const CustomTiles = () => {
  return (
    <div>
      <Title level={4}>Продукты</Title>
      <div className={styles.tileGrid}>
        {[1, 2, 3, 4].map(p => (
          <Card key={p} className={styles.tile} hoverable>
            <Title level={5}>Продукт {p}</Title>
            <p>Цена: ...</p>
            <p>Спрос: ...</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
