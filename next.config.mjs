/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  /**
   * @see{https://github.com/WalletConnect/walletconnect-monorepo/issues/1908}
   */
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  }
};

export default nextConfig;
