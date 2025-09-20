import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/blazeup-social",
        destination: "/blazeup-social.pdf",
        permanent: true, // 301 redirect; set to false if temporary (302)
      },
    ];
  },
};

export default nextConfig;
