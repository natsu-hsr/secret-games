import Col from 'antd/es/col';
import Collapse from 'antd/es/collapse/Collapse';
import Flex from 'antd/es/flex';
import Row from 'antd/es/row';
import Statistic from 'antd/es/statistic';
import Title from 'antd/es/typography/Title';
import type {FC, ReactNode} from 'react';

import DropboxOutlined from '@ant-design/icons/lib/icons/DropboxOutlined';
import type {FormInformation} from '@store/slices/task-slice';

import styles from './styles.module.scss';

interface HeaderProps {
  info: FormInformation;
  formNode: ReactNode;
}

export const HeaderGenerator: FC<HeaderProps> = ({info, formNode}) => (
  <Flex vertical className={styles.wrapper}>
    <Flex vertical>
      <Row justify="space-between" align="middle" >
        <Title level={4} className={styles.title}>
          {info.title}
          <DropboxOutlined className={styles.icon} />
        </Title>
      </Row>
      <div className={styles.description}>{info.description}</div>
    </Flex>

    {info?.sections?.map(section => (
      <Collapse
        items={[
          {
            key: '1',
            label: <Title level={5} className={styles['section-title']}>{section.title}</Title>,
            children: (
              <>
                {section.statistics?.length && (
                  <Row gutter={[8, 8]}>
                    {section.statistics?.map(({label, value}) => (
                      <Col span={8}>
                        <Statistic className={styles['statistic']} title={label} value={value} />
                      </Col>
                    ))}
                  </Row>
                )}
                {section.lists?.length && (
                  <Row gutter={16}>
                    {section.lists?.map(({subtitle, statistics}) => (
                      <Col span={12}>
                        <Title level={5} className={styles['list-subtitle']}>{subtitle}</Title>
                        <ul className={styles['list-wrapper']}>
                          {statistics.map(({label, value}) => (
                            <li>
                              <span className={styles['list-label']}>{label}:</span>&nbsp;
                              <span>{value}</span>
                            </li>
                          ))}
                        </ul>
                      </Col>
                    ))}
                  </Row>
                )}
                {section?.withForm && formNode}
              </>
            ),
          },
        ]}
      />
    ))}
  </Flex>
);