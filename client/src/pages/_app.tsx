import type { AppProps } from 'next/app';
import '@/app/globals.css';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    return <Component {...pageProps} />;
};

export default App;