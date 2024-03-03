/* eslint-disable @next/next/no-img-element */
import { useDanceStore } from '@/store/dance';
import { DeleteOutlined } from '@ant-design/icons';
import { ActionIcon } from '@lobehub/ui';
import { Button, Drawer, List, Typography, theme } from 'antd';
import { Pause, PlayIcon, XIcon } from 'lucide-react';
import { memo } from 'react';

const { Text } = Typography;

const { Meta } = List.Item;

interface PlayListProps {
  open: boolean;
  onClose: () => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

const PlayList = (props: PlayListProps) => {
  const { open = false, onClose, isPlaying = false, setIsPlaying } = props;
  const { token } = theme.useToken();
  const [playlist, playItem, removePlayItem, setPlayList, currentPlay] = useDanceStore((s) => [
    s.playlist,
    s.playItem,
    s.removePlayItem,
    s.setPlayList,
    s.currentPlay,
  ]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      width={400}
      closeIcon={null}
      styles={{
        header: { padding: 12 },
        body: { padding: 0 },
      }}
      title="当前播放列表"
      extra={
        <Button size="small" icon={<DeleteOutlined />} onClick={() => setPlayList([])}>
          清空列表
        </Button>
      }
    >
      <List
        size="small"
        dataSource={playlist}
        renderItem={(item) => {
          const mark = currentPlay ? currentPlay!.name === item.name : false;

          return (
            <List.Item
              actions={[
                mark && isPlaying ? (
                  <ActionIcon
                    // @ts-ignore
                    icon={Pause}
                    key="pause"
                    onClick={() => setIsPlaying(false)}
                    size="small"
                  />
                ) : (
                  <ActionIcon
                    // @ts-ignore
                    icon={PlayIcon}
                    key="play"
                    onClick={() => playItem(item)}
                    size="small"
                  />
                ),
                <ActionIcon
                  // @ts-ignore
                  icon={XIcon}
                  key="delete"
                  onClick={() => removePlayItem(item)}
                  size="small"
                />,
              ]}
              style={{
                cursor: 'pointer',
                backgroundColor: mark ? token.colorBgSpotlight : undefined,
              }}
              onDoubleClick={() => playItem(item)}
            >
              <Meta
                title={
                  <Text style={{ width: 600 }} ellipsis={{ tooltip: item.name }}>
                    {item.name}
                  </Text>
                }
              />
            </List.Item>
          );
        }}
      />
    </Drawer>
  );
};

export default memo(PlayList);
