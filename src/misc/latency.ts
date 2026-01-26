const DEFAULT_LATENCY_TEST_URL = 'https://www.gstatic.com/generate_204';
const CN_LATENCY_TEST_URL = 'http://connect.rom.miui.com/generate_204';

const CN_NAME_RE = /(^|[^a-z0-9])cn([^a-z0-9]|$)/i;
const CN_WORD_RE = /(中国|大陆|china)/i;
const NON_CN_NAME_RE =
  /(^|[^a-z0-9])(us|usa|uk|gb|jp|kr|sg|hk|tw|de|fr|nl|ru|au|ca|br|in|id|th|vn|my|ph|es|it)([^a-z0-9]|$)/i;
const NON_CN_WORD_RE =
  /(美国|英国|日本|韩国|新加坡|香港|台湾|德国|法国|荷兰|俄罗斯|澳大利亚|加拿大|巴西|印度|印尼|泰国|越南|马来西亚|菲律宾|西班牙|意大利)/i;

export function isCnProxyName(name: string): boolean {
  if (!name) return false;
  return CN_NAME_RE.test(name) || CN_WORD_RE.test(name);
}

export function getLatencyTestUrlForName(name: string, fallbackUrl?: string): string {
  if (!name || (!isCnProxyName(name) && !NON_CN_NAME_RE.test(name) && !NON_CN_WORD_RE.test(name))) {
    return CN_LATENCY_TEST_URL;
  }
  if (isCnProxyName(name)) return CN_LATENCY_TEST_URL;
  if (fallbackUrl && fallbackUrl.trim()) return fallbackUrl;
  return DEFAULT_LATENCY_TEST_URL;
}
