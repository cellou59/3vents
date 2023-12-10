/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    domains: ['i.pinimg.com'],
    }, 
    webpack: (config) => {
        config.externals.push("pino-pretty","encoding");
        return config;
    },
     typescript: {
        ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
