from PIL import Image, ImageDraw

# Load image
img = Image.open("public/").convert("RGBA")

# Get size
width, height = img.size
size = min(width, height)

# Create circular mask
mask = Image.new("L", (size, size), 0)
draw = ImageDraw.Draw(mask)
draw.ellipse((0, 0, size, size), fill=255)

# Crop image to square first
left = (width - size) // 2
top = (height - size) // 2
right = left + size
bottom = top + size
img_cropped = img.crop((left, top, right, bottom))

# Apply mask
img_cropped.putalpha(mask)

# Save result
img_cropped.save("logo_circle.png")

print("Saved as logo_circle.png")