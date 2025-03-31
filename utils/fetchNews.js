const puppeteer = require("puppeteer");
 const fetchNews = async () => {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();
  await page.goto("https://indianexpress.com/about/pollution");
  const news = await page.evaluate(() => {
    const news = Array.from(document.querySelectorAll("#tag_article .details "));
    console.log(news);
    const data = news.map((item) => ({
      title: item.querySelector(".img-context h3 a")?.getAttribute("title"),
      link: item.querySelector(".img-context h3 a")?.getAttribute("href"),
      date: item.querySelectorAll(".img-context p")?.[0].textContent,
      content: item.querySelectorAll(".img-context p")?.[1].textContent,
      image: item.querySelector(".about-thumb a img")?.getAttribute("src"),
    }));
    return data;
  });
  console.log("Fetched News:", news.length);
  await browser.close();
  return news;
};


const main = async () => {
  try {
    const news = await fetchNews();
    console.log(news);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
};

main();