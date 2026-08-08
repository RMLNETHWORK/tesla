from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math

W, H = 1200, 630
ASSETS = "/home/claude/teslahub/teslahubZipped/assets"
FONTS = f"{ASSETS}/caros"

def font(name, size):
    return ImageFont.truetype(f"{FONTS}/cretype  Caros {name}.otf", size)

def layer():
    return Image.new("RGBA", (W, H), (0, 0, 0, 0))

# every translucent draw happens on a fresh transparent layer, then gets
# alpha_composite'd onto the (fully opaque) canvas — ImageDraw does NOT
# blend against existing pixels when drawing straight onto an RGBA image,
# it just overwrites RGB and stamps whatever alpha you gave it, which
# .convert("RGB") at the end would then take literally (ignoring alpha)
canvas = Image.new("RGBA", (W, H), (10, 2, 16, 255))

# ---------------------------------------------------------------------
# 1. Background: hero-bg.png, cover-fit to 1200x630
# ---------------------------------------------------------------------
bg = Image.open(f"{ASSETS}/hero-bg.png").convert("RGB")
bw, bh = bg.size
scale = max(W / bw, H / bh)
new_w, new_h = int(bw * scale) + 1, int(bh * scale) + 1
bg = bg.resize((new_w, new_h), Image.LANCZOS)
left = (new_w - W) // 2
top = (new_h - H) // 2
bg = bg.crop((left, top, left + W, top + H)).convert("RGBA")
canvas = Image.alpha_composite(canvas, bg)

# ---------------------------------------------------------------------
# 2. ::before — linear gradient + radial gold glow top-right
# ---------------------------------------------------------------------
grad = layer()
gd = ImageDraw.Draw(grad)
stops = [(0.0, (20, 4, 32, 224)), (0.55, (30, 6, 46, 140)), (1.0, (20, 4, 32, 209))]
for x in range(W):
    t = x / (W - 1)
    for i in range(len(stops) - 1):
        t0, c0 = stops[i]
        t1, c1 = stops[i + 1]
        if t0 <= t <= t1 or i == len(stops) - 2:
            lt = 0 if t1 == t0 else max(0, min(1, (t - t0) / (t1 - t0)))
            r = int(c0[0] + (c1[0] - c0[0]) * lt)
            g = int(c0[1] + (c1[1] - c0[1]) * lt)
            b = int(c0[2] + (c1[2] - c0[2]) * lt)
            a = int(c0[3] + (c1[3] - c0[3]) * lt)
            gd.line([(x, 0), (x, H)], fill=(r, g, b, a))
            break
canvas = Image.alpha_composite(canvas, grad)

glow = layer()
gld = ImageDraw.Draw(glow)
cx, cy = int(W * 0.88), int(H * 0.12)
max_r = int(max(W, H) * 0.55)
for rr in range(max_r, 0, -2):
    t = rr / max_r
    a = int(0.28 * (1 - t) ** 2 * 255)
    if a <= 0:
        continue
    gld.ellipse([cx - rr, cy - rr, cx + rr, cy + rr], fill=(254, 215, 0, a))
glow = glow.filter(ImageFilter.GaussianBlur(30))
canvas = Image.alpha_composite(canvas, glow)

# ---------------------------------------------------------------------
# 3. ::after — repeating diagonal hairlines
# ---------------------------------------------------------------------
stripes = layer()
sd = ImageDraw.Draw(stripes)
period = 13
diag = W + H
for offset in range(-H, diag, period):
    sd.line([(offset, 0), (offset - H, H)], fill=(255, 255, 255, 12), width=1)
canvas = Image.alpha_composite(canvas, stripes)

# ---------------------------------------------------------------------
# 4. Rounded-rect clip + border
# ---------------------------------------------------------------------
radius = 22
mask = Image.new("L", (W, H), 0)
ImageDraw.Draw(mask).rounded_rectangle([0, 0, W - 1, H - 1], radius=radius, fill=255)
rounded = Image.new("RGBA", (W, H), (10, 2, 16, 255))
rounded.paste(canvas, (0, 0), mask)
canvas = rounded

border = layer()
bd = ImageDraw.Draw(border)
bd.rounded_rectangle([1, 1, W - 2, H - 2], radius=radius, outline=(255, 255, 255, 46), width=2)
canvas = Image.alpha_composite(canvas, border)

# ---------------------------------------------------------------------
# 5. Seal — glass circle behind it
# ---------------------------------------------------------------------
seal_outer = 210
pad_x = 74
seal_cx = pad_x + seal_outer // 2
seal_cy = H // 2
r = seal_outer // 2

glass = layer()
gld2 = ImageDraw.Draw(glass)
gld2.ellipse([seal_cx - r, seal_cy - r, seal_cx + r, seal_cy + r], fill=(255, 255, 255, 22))
canvas = Image.alpha_composite(canvas, glass)

ring = layer()
rd = ImageDraw.Draw(ring)
rd.ellipse([seal_cx - r, seal_cy - r, seal_cx + r, seal_cy + r], outline=(255, 255, 255, 60), width=2)
canvas = Image.alpha_composite(canvas, ring)

corona = layer()
cd = ImageDraw.Draw(corona)
r2 = r + 14
cd.ellipse([seal_cx - r2, seal_cy - r2, seal_cx + r2, seal_cy + r2], outline=(254, 215, 0, 70), width=2)
canvas = Image.alpha_composite(canvas, corona)

seal_img_size = seal_outer - 44
seal_img = Image.open(f"{ASSETS}/seal.png").convert("RGBA").resize((seal_img_size, seal_img_size), Image.LANCZOS)
seal_circle_mask = Image.new("L", (seal_img_size, seal_img_size), 0)
ImageDraw.Draw(seal_circle_mask).ellipse([0, 0, seal_img_size, seal_img_size], fill=255)
seal_alpha = Image.composite(seal_img.split()[3], Image.new("L", seal_img.size, 0), seal_circle_mask)
seal_layer = layer()
seal_layer.paste(seal_img, (seal_cx - seal_img_size // 2, seal_cy - seal_img_size // 2), seal_alpha)
canvas = Image.alpha_composite(canvas, seal_layer)

# ---------------------------------------------------------------------
# 6. Text block
# ---------------------------------------------------------------------
draw = ImageDraw.Draw(canvas)
text_start_x = pad_x + seal_outer + 56
ACCENT_OPAQUE = (254, 215, 0, 255)

def draw_tracked_text(dr, xy, text, fnt, fill, tracking=0):
    x, y = xy
    for ch in text:
        dr.text((x, y), ch, font=fnt, fill=fill)
        x += dr.textlength(ch, font=fnt) + tracking
    return x

def tracked_width(dr, text, fnt, tracking=0):
    w = sum(dr.textlength(ch, font=fnt) + tracking for ch in text) - tracking
    return w

eyebrow_font = font("Bold", 22)
eyebrow_text = "WELCOME TO"
tracking = 3
pill_pad_x, pill_pad_y = 26, 14
ew = tracked_width(draw, eyebrow_text, eyebrow_font, tracking)
pill_w = ew + pill_pad_x * 2
pill_h = 22 + pill_pad_y * 2
pill_y = 150

pill = layer()
pd = ImageDraw.Draw(pill)
pd.rounded_rectangle([text_start_x, pill_y, text_start_x + pill_w, pill_y + pill_h],
                      radius=pill_h // 2, fill=(254, 215, 0, 34), outline=(254, 215, 0, 92), width=2)
canvas = Image.alpha_composite(canvas, pill)
draw = ImageDraw.Draw(canvas)
draw_tracked_text(draw, (text_start_x + pill_pad_x, pill_y + pill_pad_y - 2), eyebrow_text, eyebrow_font, ACCENT_OPAQUE, tracking)

title_font = font("ExtraBold", 68)
title_y = pill_y + pill_h + 22
draw.text((text_start_x, title_y), "Tesla Archive", font=title_font, fill=(255, 255, 255, 255))

desc_font = font("Medium", 27)
desc_text = "Your central place for Posts, Snaps, and Scrolls. Use the sidebar to jump into any section."
max_width = W - text_start_x - 70

def wrap_text(dr, text, fnt, max_w):
    words = text.split()
    lines, cur = [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if dr.textlength(trial, font=fnt) <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines

lines = wrap_text(draw, desc_text, desc_font, max_width)
desc_layer = layer()
dd = ImageDraw.Draw(desc_layer)
desc_y = title_y + 92
line_height = 40
for i, line in enumerate(lines):
    dd.text((text_start_x, desc_y + i * line_height), line, font=desc_font, fill=(255, 255, 255, 235))
canvas = Image.alpha_composite(canvas, desc_layer)

canvas.convert("RGB").save(f"{ASSETS}/og-home.png", "PNG", optimize=True)
print("saved og-home.png")