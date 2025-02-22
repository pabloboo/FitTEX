import requests
import logging
from typing import List, Tuple
from fuzzywuzzy import fuzz

from config.config import settings
from constants.constants import BRANDS

logger = logging.getLogger(__name__)

class FashionAssistant:
    def __init__(self, url: str = settings.inference.url, model: str = settings.inference.model_name):
        self.url = url
        self.model = model

    def parse_response(self, output: str, threshold: int = 60) -> Tuple[List[str], str]:
        """
        Parses the response string into a list of clothes and finds the closest matching brand.

        :param output: The response string in the format "clothes | brand".
        :param threshold: The minimum similarity score to consider a match.
        :return: A tuple containing a list of clothes and the closest matching brand.
        """
        clothes_raw, brand_raw = output.split('|')
        clothes_list = [item.strip() for item in clothes_raw.split(",")]

        similarities = {brand: fuzz.ratio(brand_raw.lower(), brand.lower()) for brand in BRANDS}
        best_match = max(similarities, key=similarities.get)
        best_similarity = similarities[best_match]

        brand = best_match if best_similarity >= threshold else "unknown"
        return clothes_list, brand

    def process_prompt(self, prompt: str) -> Tuple[List[str], str]:
        """
        Process the prompt and return model response for API issues.

        :param prompt: Sentence given by the user
        :return: A tuple containing a list of clothes and the closest matching brand
        """
        data = {
            "model": self.model,
            "messages": [{"role": "user", "content": prompt}],
            "stream": False
        }

        response = requests.post(self.url, json=data)

        if response.status_code == 200:
            output = response.json().get('message', {}).get('content', "")
            logger.info("Response: %s", output)
        else:
            logger.error("Error: %d - %s", response.status_code, response.text)
            return [], "unknown"

        return self.parse_response(output)
