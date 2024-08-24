import requests
from bs4 import BeautifulSoup


def fetch_article_content(article_url):
    response = requests.get(article_url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, "html.parser")

        content_div = soup.find("div", class_="description current-news-block")

        if content_div:
            paragraphs = content_div.find_all("p")
            content = "\n".join([p.get_text(strip=True) for p in paragraphs])

            image_tags = content_div.find_all("img")
            images = [img['data-src'] for img in image_tags if 'data-src' in img.attrs]

            return {
                'content': content,
                'content-images': images
            }
        else:
            print(f"Content not found for URL: {article_url}")
            return None
    else:
        print(f"Failed to fetch article content from URL: {article_url}")
        return None


def scrape_news():
    url = "https://ekantipur.com/news"
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, "html.parser")

        articles = soup.find_all("article", class_="normal")

        news_list = []

        for article in articles:
            title_tag = article.find("h2").find("a")
            title = title_tag.text.strip()
            article_url = title_tag["href"]
            article_url = f"https://ekantipur.com{article_url}"

            author_tag = article.find("div", class_="author").find("a")
            author = author_tag.text.strip()

            image_tag = article.find("div", class_="image").find("img")
            image = image_tag['data-src'] if image_tag else None

            content = fetch_article_content(article_url)

            news_list.append({
                'title': title,
                'url': article_url,
                'author': author,
                'image': image,
                'content': content
            })

        return news_list
    else:
        print("Error: Unable to fetch the page.")
        return []
