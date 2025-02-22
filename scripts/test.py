import requests
import json
from fuzzywuzzy import fuzz

def buildAPIRequest(userPrompt):
    # URL del endpoint
    url = 'http://localhost:11434/api/generate'

    # Cuerpo de la solicitud
    data = {
        "model": "llama3.2",
        "temperature" : 0,
        "prompt": """
        From now you will be a information extractor, your mission is to extract information from the given prompt
        Do **not** include any brand names unless explicitly mentioned in the prompt. 
        Include the exact cloth that the prompt is talking about.
        If more than one cloth is found, return more than one cloth but only the clothes.
        Separate the clothes in the query by commas as format "cloth1, cloth2, cloth3...". Only return the clothes names in the query field and the field brand if it applies.
        Do not include the 'brand' field in the response unless the prompt **explicitly** mentions a brand.
        The prompt can have filters related with the price.

        Respond to the following query restricting by the described rules: "I need a white shirt and a trousers"
        """,
        "stream": False,
        "temperature": 0,
        "format": {
            "type": "object",
            "properties": {
                "query": {"type": "string"},
                "brand": {"type": "string",
                        "enum": ["zara", "lefties", "massimo_dutti", "oysho", "pull_and_bear", "stradivarius", "zara_home"]},
                "filter": {"type": "string"}
            },
            "required": ["query"]
        }
    }

    # Encabezados para indicar que el contenido es JSON
    headers = {
        'Content-Type': 'application/json'
    }

    # Realizar la solicitud POST
    response = requests.post(url, headers=headers, data=json.dumps(data))

    # Verificar si la solicitud fue exitosa
    if response.status_code == 200:
        print("Respuesta:", response.json()['response'])
    else:
        print(f"Error: {response.status_code} - {response.text}")   

# Lista de marcas conocidas
brands = ["zara", "lefties", "massimo_dutti", "oysho", "pull_and_bear", "stradivarius", "zara_home"]

# Función para encontrar la marca más similar
def get_closest_brand(input_brand, known_brands, threshold=60):
    # Calculamos la similitud con cada marca conocida
    similarities = {brand: fuzz.ratio(input_brand.lower(), brand.lower()) for brand in known_brands}
    
    # Encontramos la marca más similar
    best_match = max(similarities, key=similarities.get)
    best_similarity = similarities[best_match]
    
    # Si la similitud es mayor que el umbral, devolvemos la marca más cercana
    if best_similarity >= threshold:
        return best_match
    else:
        return "unknown"

# Ejemplo de uso
input_brand = ""  # Error tipográfico
result = get_closest_brand(input_brand, brands)
print(result)  # Salida: zara (si la similitud es alta)

def processPrompt(prompt: str):
    url = 'http://localhost:11434/api/chat'

    #Esto é 
    data = {
        "model" : "fittex",
        "messages" : [{"role": "user", "content": "I want a blue skirt of Zara"}],
        "stream": False
    }

    #Realizar la solicitud POST
    response = requests.post(url, json=data)

    #Verificar si la solicitud fue exitosa
    if response.status_code == 200:
        output = response.json()['message']['content']
        print("Respuesta:", response.json()['response'])
    else:
        print(f"Error: {response.status_code} - {response.text}")

    clothesRaw, brandRaw = output.split('|')

    #The received the response has the format clothes | brand
    clothesList = clothesRaw.split(",")

    brand = get_closest_brand(brandRaw, brands)

    for value in clothesList:
        #TODO meter petición a la API de inditex
        print(value, brand)

    print(clothesList, brand)