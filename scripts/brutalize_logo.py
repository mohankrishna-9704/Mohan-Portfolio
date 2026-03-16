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
    
    # 1. Draw Grid
    grid_spacing = 64
    for x in range(0, size[0], grid_spacing):
        draw.line([(x, 0), (x, size[1])], fill="#E5E5E5", width=1)
    for y in range(0, size[1], grid_spacing):
        draw.line([(0, y), (size[0], y)], fill="#E5E5E5", width=1)
        
    # 2. Draw Central Circle
    circle_margin = 150
    circle_bounds = [circle_margin, circle_margin, size[0] - circle_margin, size[1] - circle_margin]
    
    # Draw Shadow for the circle (Neo-Brutalist offset)
    shadow_offset = 20
    draw.ellipse([circle_bounds[0] + shadow_offset, circle_bounds[1] + shadow_offset, 
                  circle_bounds[2] + shadow_offset, circle_bounds[3] + shadow_offset], fill=BLACK)
    
    # Draw Main Circle
    draw.ellipse(circle_bounds, fill=RED, outline=BLACK, width=16)
    
    # 3. Text Preparation
    try:
        # Try to find a bold font
        font_size = 350
        font = ImageFont.truetype("arialbd.ttf", font_size)
    except:
        font = ImageFont.load_default()

    text = initials
    
    # Calculate text position (centered inside circle)
    bbox = draw.textbbox((0, 0), text, font=font)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    
    # Center text in the canvas (which is where the circle is centered)
    x = (size[0] - w) // 2 - bbox[0]
    y = (size[1] - h) // 2 - bbox[1]
    
    # Draw Text Shadow
    draw.text((x + 12, y + 12), text, font=font, fill=BLACK)
    
    # Draw Main Text (White for high contrast on Red)
    draw.text((x, y), text, font=font, fill=WHITE, stroke_width=6, stroke_fill=BLACK)

    # 4. Final Frame
    draw.rectangle([0, 0, size[0]-1, size[1]-1], outline=BLACK, width=24)

    # Save
    img.save(output_path)
    print(f"Brutalist logo generated at: {output_path}")

if __name__ == "__main__":
    output_dir = "public"
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    create_brutalist_logo(os.path.join(output_dir, "procedural_logo2.png"))
