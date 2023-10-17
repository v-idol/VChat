import AudioPlayer from '@/components/AudioPlayer';
import DanceIndex from '@/components/DanceIndex';
import DanceInfoCard from '@/components/DanceInfoCard';
import DanceList from '@/components/DanceList';
import { useDanceStore } from '@/store/dance';
import { GridBackground, TabsNav } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { useState } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

import { ActionIcon } from '@lobehub/ui';
import { Space } from 'antd';
import { Loader2Icon } from 'lucide-react';

import styled from 'styled-components';

const View = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 500px;
`;

const useStyles = createStyles(({ css }) => ({
  background: css`
    width: 90%;
    margin: -24px 0 -12px;
  `,
  title: css`
    z-index: 2;
    margin-top: 24px;
    font-size: 56px;
    font-weight: 800;
  `,
}));

interface DanceProps {
  style?: React.CSSProperties;
  className?: string;
}

const Dance = (props: DanceProps) => {
  const { style, className } = props;
  const [tab, setTab] = useState('installed');
  const { danceList, fetchDanceList, loading } = useDanceStore();
  const { theme, styles } = useStyles();
  return (
    <View style={style} className={className}>
      <div style={{ paddingLeft: 24, paddingRight: 24, flex: 1 }}>
        <Center>
          <h1 className={styles.title}>Find your favorite Dance</h1>
          <GridBackground
            animation
            className={styles.background}
            colorFront={theme.colorText}
            random
          />
        </Center>
        <Flexbox
          style={{ marginBottom: 12 }}
          horizontal
          align="center"
          distribution="space-between"
        >
          <TabsNav
            activeKey={tab}
            onChange={(key) => {
              setTab(key);
            }}
            items={[
              {
                key: 'installed',
                label: '已下载',
              },
              {
                key: 'index',
                label: '在线列表',
              },
            ]}
          />
          {tab === 'installed' ? (
            <Space>
              共 {danceList.length} 项{' '}
              <ActionIcon
                /* @ts-ignore */
                icon={Loader2Icon}
                loading={loading}
                title="重新加载"
                onClick={fetchDanceList}
              />
            </Space>
          ) : null}
        </Flexbox>
        {tab === 'installed' ? <DanceList /> : null}
        {tab === 'index' ? <DanceIndex /> : null}
      </div>
      <DanceInfoCard />
      <AudioPlayer
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
        }}
      />
    </View>
  );
};

export default Dance;