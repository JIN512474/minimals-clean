/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true }, // Vercel 빌드 안정화
  images: { unoptimized: true }, // 정적 이미지 경로 그대로 사용
};
export default nextConfig;
