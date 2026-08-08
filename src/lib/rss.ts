export interface NewsItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
  category: string;
  image?: string;
}

function extractTag(xml: string, tag: string): string {
  const cdata = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, "i");
  const plain = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = xml.match(cdata) ?? xml.match(plain);
  return m ? m[1].replace(/<[^>]+>/g, "").trim() : "";
}

function extractMediaUrl(xml: string): string {
  const m = xml.match(/media:content[^>]+url="([^"]+)"/i) ??
            xml.match(/media:thumbnail[^>]+url="([^"]+)"/i) ??
            xml.match(/<enclosure[^>]+url="([^"]+)"/i);
  return m ? m[1] : "";
}

function formatDate(raw: string): string {
  try {
    return new Date(raw).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return raw;
  }
}

async function fetchFeed(url: string, sourceName: string, category: string): Promise<NewsItem[]> {
  try {
    const res = await fetch(url, {
      next: { revalidate: 1800 },
      headers: { "User-Agent": "Mozilla/5.0 (compatible; MAdvisory/1.0)" },
    });
    if (!res.ok) return [];
    const xml = await res.text();

    const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/gi;
    const items: NewsItem[] = [];
    let match;

    while ((match = itemRegex.exec(xml)) !== null && items.length < 5) {
      const itemXml = match[1];
      const title = extractTag(itemXml, "title");
      const link = extractTag(itemXml, "link") || extractTag(itemXml, "guid");
      const description = extractTag(itemXml, "description");
      const pubDate = formatDate(extractTag(itemXml, "pubDate"));
      const image = extractMediaUrl(itemXml);

      if (title && link) {
        items.push({ title, description: description.slice(0, 200), link, pubDate, source: sourceName, category, image });
      }
    }
    return items;
  } catch {
    return [];
  }
}

const EN_FEEDS = [
  { url: "https://feeds.bbci.co.uk/news/business/rss.xml", source: "BBC Business", category: "Business" },
  { url: "https://feeds.hbr.org/harvardbusiness", source: "Harvard Business Review", category: "Leadership" },
  { url: "https://rss.nytimes.com/services/xml/rss/nyt/Business.xml", source: "The New York Times", category: "Business" },
  { url: "https://www.ft.com/rss/home/uk", source: "Financial Times", category: "Markets" },
  { url: "https://feeds.a.dj.com/rss/WSJcomUSBusiness.xml", source: "Wall Street Journal", category: "Business" },
];

const PT_FEEDS = [
  { url: "https://exame.com/feed/", source: "Exame", category: "Negócios" },
  { url: "https://www.infomoney.com.br/feed/", source: "InfoMoney", category: "Mercados" },
  { url: "https://g1.globo.com/dynamo/economia/rss2.xml", source: "G1 Economia", category: "Economia" },
  { url: "https://valor.globo.com/rss/valor.xml", source: "Valor Econômico", category: "Negócios" },
  { url: "https://agenciabrasil.ebc.com.br/rss/economia/feed.xml", source: "Agência Brasil", category: "Economia" },
];

export async function getNews(locale: string): Promise<NewsItem[]> {
  const feeds = locale === "pt" ? PT_FEEDS : EN_FEEDS;

  const results = await Promise.allSettled(
    feeds.map((f) => fetchFeed(f.url, f.source, f.category))
  );

  const all: NewsItem[] = [];
  for (const r of results) {
    if (r.status === "fulfilled") all.push(...r.value);
  }

  return all
    .filter((item) => item.title.length > 10)
    .sort(() => Math.random() - 0.5)
    .slice(0, 12);
}
