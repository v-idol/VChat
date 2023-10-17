import { danceListSelectors, useDanceStore } from '@/store/dance';
import { DraggablePanel } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { ReactNode, memo, useState } from 'react';

const useStyles = createStyles(({ css, token, stylish }) => ({
  content: css`
    display: flex;
    flex-direction: column;
  `,
  header: css`
    border-bottom: 1px solid ${token.colorBorder};
  `,
}));

// eslint-disable-next-line react/display-name
const SideBar = memo<{ children?: ReactNode }>(({ children }) => {
  const { styles } = useStyles();
  const [tempId, setTempId] = useState<string>('');
  const [showDanceSidebar, activateDance, deactivateDance] = useDanceStore((s) => [
    danceListSelectors.showSideBar(s),
    s.activateDance,
    s.deactivateDance,
  ]);

  return (
    <DraggablePanel
      className={styles.content}
      minWidth={240}
      mode={'fixed'}
      expand={showDanceSidebar}
      onExpandChange={(show) => {
        if (!show) {
          setTempId(useDanceStore.getState().currentIdentifier);
          deactivateDance();
        } else if (tempId) {
          activateDance(tempId);
        }
      }}
      placement={'right'}
    >
      {children}
    </DraggablePanel>
  );
});

export default SideBar;