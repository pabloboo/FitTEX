from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Tuple
from src.services.fashion_assistant import FashionAssistant
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todos los orígenes
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos
    allow_headers=["*"],  # Permite todos los headers
)

class PromptRequest(BaseModel):
    prompt: str

@app.post("/process-prompt")
async def process_prompt(request: PromptRequest):
    fashion_assistant = FashionAssistant()
    clothes, brand = fashion_assistant.process_prompt(request.prompt)
    
    if not clothes:
        raise HTTPException(status_code=400, detail="Error processing the prompt")
    
    return {"clothes": clothes, "brand": brand}

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}