from PIL import Image, ImageDraw, ImageOps
import sys
import os

def crop_to_circle(input_path, output_path=None):
    """
    Crops an image into a perfect circle with a transparent background.
    """
    try:
        # Load the image
        img = Image.open(input_path).convert("RGBA")
        
        # Get dimensions
        width, height = img.size
        min_dim = min(width, height)
        
        # 1. Square Center Crop
        left = (width - min_dim) / 2
        top = (height - min_dim) / 2
        right = (width + min_dim) / 2
        bottom = (height + min_dim) / 2
        
        img = img.crop((left, top, right, bottom))
        
        # 2. Create the Mask
        mask = Image.new('L', (min_dim, min_dim), 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((0, 0, min_dim, min_dim), fill=255)
        
        # 3. Apply the Mask
        img.putalpha(mask)
        
        # Determine output path
        if not output_path:
            base, ext = os.path.splitext(input_path)
            output_path = f"{base}_circle.png"
            
        # Save output
        img.save(output_path, "PNG")
        print(f"Success! Scaled and cropped image saved to: {output_path}")
        return output_path

    except Exception as e:
        print(f"Error processing image: {e}")
        return None

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python crop_circle.py <path_to_image>")
    else:
        # Get the path from command line arguments
        input_image = sys.argv[1]
        
        # Ensure path is absolute or correctly relative to execution context
        if not os.path.isabs(input_image):
            # If not absolute, try to find it relative to current working directory
            # but usually the user runs it from root
            pass
            
        crop_to_circle(input_image)
