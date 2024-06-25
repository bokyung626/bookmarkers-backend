const extractS3KeyFromUrl = (url: string): string => {
  const urlObj = new URL(url);
  return urlObj.pathname.substring(1); // 첫 번째 '/' 제거
};

export default extractS3KeyFromUrl;
