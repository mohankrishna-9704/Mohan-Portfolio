import os
import random
from PIL import Image, ImageDraw, ImageFont

def create_brutalist_logo(output_path, initials="MK", size=(1024, 1024)):
    """
    Generates a procedural Neo-Brutalist logo for the portfolio.
    Features: 
    - Heavy black borders
    - Signal Red accents
    - Grid background
    - Offset 'Brutal' shadow
    """
    # Colors
    RED = "#FF3B30"
    BLACK = "#111111"
    WHITE = "#F5F5F5"
    
    # Create Canvas
    img = Image.new('RGB', size, WHITE)
    draw = ImageDraw.Draw(img)
    
    # 2. Draw Central Circle
    # Make the circle larger to fill the icon space
    circle_margin = 80 
    circle_bounds = [circle_margin, circle_margin, size[0] - circle_margin, size[1] - circle_margin]
    
    # Draw Main Circle (Signal Red)
    draw.ellipse(circle_bounds, fill=RED, outline=WHITE, width=20)
    
    # 3. Text Preparation
    try:
        # Extra bold font, very large for favicon visibility
        font_size = 450
        font = ImageFont.truetype("arialbd.ttf", font_size)
    except:
        font = ImageFont.load_default()

    text = initials
    
    # Calculate text position
    bbox = draw.textbbox((0, 0), text, font=font)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    
    x = (size[0] - w) // 2 - bbox[0]
    y = (size[1] - h) // 2 - bbox[1]
    
    # Draw Text (White with black stroke for maximum contrast)
    draw.text((x, y), text, font=font, fill=WHITE, stroke_width=12, stroke_fill=BLACK)

    # Save
    img.save(output_path)
    print(f"Brutalist Circular Logo generated at: {output_path}")

if __name__ == "__main__":
    output_dir = "public"
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    create_brutalist_logo(os.path.join(output_dir, "procedural_logo_circular1.png"))
