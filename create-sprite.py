from PIL import Image, ImageDraw
import numpy as np

# Create a simple sprite sheet with colorful characters
width, height = 600, 280  # 15 cols x 7 rows, each 40x40
img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

colors = [
    (255, 100, 100), (100, 255, 100), (100, 100, 255),
    (255, 255, 100), (255, 100, 255), (100, 255, 255),
    (200, 150, 100), (150, 200, 100), (100, 150, 200)
]

for row in range(7):
    for col in range(15):
        x = col * 40
        y = row * 40
        color = colors[(row + col) % len(colors)]

        # Draw simple character shapes
        # Head
        draw.ellipse([x+10, y+5, x+30, y+25], fill=color)
        # Body
        draw.rectangle([x+15, y+25, x+25, y+35], fill=color)
        # Legs
        draw.rectangle([x+12, y+35, x+18, y+38], fill=color)
        draw.rectangle([x+22, y+35, x+28, y+38], fill=color)

img.save('public/images/peeps/all-peeps.png')
print("Sprite sheet created successfully!")