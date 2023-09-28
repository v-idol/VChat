import AgentViewer from '@/components/AgentViewer';
import Header from '@/components/Header';
import SideNav from '@/components/SideNav';
import { useThemeStore } from '@/store/theme';
import '@/styles/globals.css';
import { ThemeProvider } from '@lobehub/ui';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  const themeMode = useThemeStore((s) => s.themeMode);
  return (
    <ThemeProvider themeMode={themeMode}>
      <Header />
      <main style={{ display: 'flex', width: '100%' }}>
        <SideNav />
        <div style={{ display: 'flex', width: '100%' }}>
          <Component {...pageProps} />
        </div>
      </main>
      <AgentViewer />
    </ThemeProvider>
  );
}
