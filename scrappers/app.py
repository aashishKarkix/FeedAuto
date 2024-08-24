from flask import Flask, jsonify
import asyncio
from eKantipurNewsScrapper import scrape_news

app = Flask(__name__)


@app.route('/scrape', methods=['GET'])
def scrape():
    news = scrape_news()
    return jsonify({"news": news})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
