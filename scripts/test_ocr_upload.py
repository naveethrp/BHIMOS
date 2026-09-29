"""
Test script for verifying OCR endpoint against real files.
"""
import urllib.request
import io
import json
from PIL import Image, ImageDraw, ImageFont

def create_test_image(text="CONSTITUENT ASSEMBLY OF INDIA 1948"):
    im = Image.new("RGB", (400, 100), color=(255, 255, 255))
    draw = ImageDraw.Draw(im)
    draw.text((20, 35), text, fill=(0, 0, 0))
    buf = io.BytesIO()
    im.save(buf, format="PNG")
    return buf.getvalue()

def test_ocr():
    img_bytes = create_test_image()
    boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW"
    
    body = (
        f"--{boundary}\r\n"
        f'Content-Disposition: form-data; name="file"; filename="sample_scan.png"\r\n'
        f"Content-Type: image/png\r\n\r\n"
    ).encode("utf-8") + img_bytes + f"\r\n--{boundary}--\r\n".encode("utf-8")

    req = urllib.request.Request(
        "http://127.0.0.1:8000/api/ocr/extract",
        data=body,
        headers={"Content-Type": f"multipart/form-data; boundary={boundary}"}
    )
    
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            print("OCR Response Status:", data.get("status"))
            print("Image Info:", data.get("image_info"))
            print("Success Flag:", data.get("success"))
            print("Extracted Text:", repr(data.get("extracted_text")))
            print("Error message (if engine missing):", data.get("error"))
    except Exception as e:
        print("Upload failed:", e)

if __name__ == "__main__":
    test_ocr()
