from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import pytesseract
import cv2
import numpy as np
import re
app = FastAPI()

from google import genai

client = genai.Client(api_key="AIzaSyAQb_mQXFssy1wQzJ0v81iQu2k03ylc-FU")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace * with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def clean_prescription_text(raw_text: str) -> str:
    lines = raw_text.split('\n')
    cleaned_lines = []
    medicine_section = False
    for line in lines:
        line = line.strip()
        # Detect start of medicine section by keywords
        if re.search(r'\b(Medicine|Rx|TAB\.|CAP\.|SYP\.)\b', line, re.IGNORECASE):
            medicine_section = True
        if medicine_section:
            # Normalize common patterns
            line = re.sub(r'\b(Morning|Night|Aft|Eve)\b', lambda m: m.group(0).capitalize(), line, flags=re.IGNORECASE)
            line = re.sub(r'(Before|After)\s+Food', lambda m: m.group(0).lower(), line, flags=re.IGNORECASE)
            line = re.sub(r'\s+', ' ', line)  # Remove extra spaces
            line = re.sub(r'\(Tot:(.*?)\)', '', line)  # Remove total pills info (optional)
        cleaned_lines.append(line)
    # Join everything back
    cleaned_text = '\n'.join(cleaned_lines)
    # Add basic formatting if needed
    cleaned_text = re.sub(r'\s*\|\s*', '\n', cleaned_text)  # Split pipe-separated metadata
    cleaned_text = re.sub(r'(\d+\))', r'\n\1', cleaned_text)  # Ensure medicines start on a new line
    return cleaned_text.strip()



def preprocess_image(image_bytes: bytes) -> np.ndarray:
    # Convert bytes to numpy array
    np_arr = np.frombuffer(image_bytes, np.uint8)
    # Decode image from numpy array
    image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    if image is None:
        raise ValueError("Failed to decode image from bytes.")   
    # Resize, grayscale, etc. if needed
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    return gray



def extract_text_from_image(image_path):
    preprocessed_image = preprocess_image(image_path)   
    # Use Tesseract to extract text
    extracted_text = pytesseract.image_to_string(preprocessed_image)
    return extracted_text

def get_medicine_info(medicine_name: str) -> str:
    prompt = (
        f"Provide a short medical description of the medicine '{medicine_name}', "
        "including its usage and side effects. Keep it concise and simple."
    )
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt
    )
    return response.text

def validate_and_extract_medicines(text: str) -> dict:
    prompt = (
        "Extract medicine names from the following prescription text.\n"
        "Return them in Markdown format as a bulleted list using dashes (-). "
        "Each medicine name should be on a new line, using sentence case.\n\n"
        f"Prescription Text:\n{text}"
    )

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt
    )
    return response.text

class Message(BaseModel):
    user_input: str

@app.post("/chat")
async def chat(message: Message):
    user_text = message.user_input
    prompt = (
        "Be the friendliest chat bot and respond to the customers query but keep in mind to give a concise answer. \n"
        "Give a short summary answer."
        f"Prescription Text:\n{user_text}"
    )
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt
    )
    reply_text = response.text 
    return {"reply": reply_text}

@app.post("/extract_text/")
async def extract_text(file: UploadFile = File(...)):
    contents = await file.read()
    raw_text = extract_text_from_image(contents)
    cleaned_text = clean_prescription_text(raw_text)
    
    return {"extracted_text": cleaned_text}


@app.post("/validate_prescription/")
async def validate_prescription(data: dict):
    text = data.get("text", "")
    response_text = validate_and_extract_medicines(text)

    # Clean Markdown bullet list (starting with `-`)
    medicine_names = [
        line.lstrip("- ").strip()
        for line in response_text.split("\n")
        if line.strip().startswith("-")
    ]

    info = {med: get_medicine_info(med) for med in medicine_names}
    return {
        "validated": response_text,  # this will be in Markdown
        "details": info
    }


@app.post("/medicine_info/")
async def medicine_info(data: dict):
    medicines: List[str] = data.get("medicines", [])
    info = {med: get_medicine_info(med) for med in medicines}
    return {"medicine_info": info}