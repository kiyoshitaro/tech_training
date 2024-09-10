import requests
from bs4 import BeautifulSoup

# Function to fetch HTML content from a URL
def fetch_html(url):
    response = requests.get(url)
    return response.text

# Function to extract data from HTML using BeautifulSoup
def extract_data(html):
    soup = BeautifulSoup(html, 'html.parser')
    data = []

    # Example: Extracting all text as an object

    for div in soup.find_all('article', class_='post-item'):
        # print(div.get_text(), div.get_text(strip=True) )
        author = div.find('div', class_='vcard')
        time = div.find('div', class_='the-time')
        content = div.find('div', class_='front-view-content')
        tags_div = div.find('div', class_='the-category')
        tags = [tag.get_text(strip=True) for tag in tags_div.find_all('a')] if tags_div else []

        comments_div = div.find('div', class_='limit-comments')
        comments = [tag.get_text(strip=True) for tag in comments_div.find_all('p', class_='comment__message')] if comments_div else []

        div_data = {
            'author': author.get_text(strip=True),
            'content': content.get_text(strip=True),
            'tags': tags,
            'comments': comments,
            'time': time.get_text(strip=True)
        }        
        data.append(div_data)
    
    # for paragraph in soup.find_all('div', class_='front-view-content'):
    #     data.append(paragraph.get_text())

    return data

# Function to crawl the website
def crawl_website(base_url):
    urls_to_crawl = [base_url]
    crawled_data = []

    for url in urls_to_crawl:
        html = fetch_html(url)
        data = extract_data(html)
        crawled_data.extend(data)

        # Example: Find and add more URLs to crawl
        soup = BeautifulSoup(html, 'html.parser')
        for link in soup.find_all('a', href=True):
            href = link['href']
            if href.startswith('/'):
                full_url = base_url + href
                if full_url not in urls_to_crawl:
                    urls_to_crawl.append(full_url)

    return crawled_data

# Main function to start the crawling process
def main():
    base_url = 'https://doanvanhay.com?page=3'
    data = crawl_website(base_url)

    # Print the crawled data
    for item in data:
        print(item)

if __name__ == '__main__':
    main()
