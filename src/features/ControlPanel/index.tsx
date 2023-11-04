import Panel from '@/components/Panel';
import Agent from './Agent';
import Chat from './Chat';
import Config from './Config';
import Dance from './Dance';
import SideNav from './SideNav';
import Voice from './Voice';
import { useStyles } from './style';

interface ControlPanelProps {
  style?: React.CSSProperties;
  className?: string;
  tab?: string;
}

const ControlPanel = (props: ControlPanelProps) => {
  const { style, className, tab = 'agent' } = props;
  const { styles } = useStyles();

  return (
    <Panel style={style} className={className}>
      <SideNav className="handle" />
      <div className={styles.content}>
        <Dance style={{ display: tab === 'dance' ? 'flex' : 'none' }} />
        <Agent style={{ display: tab === 'agent' ? 'flex' : 'none' }} />
        <Chat style={{ display: tab === 'chat' ? 'flex' : 'none' }} />
        <Voice style={{ display: tab === 'voice' ? 'flex' : 'none' }} />
        <Config style={{ display: tab === 'config' ? 'flex' : 'none' }} />
      </div>
    </Panel>
  );
};

export default ControlPanel;
