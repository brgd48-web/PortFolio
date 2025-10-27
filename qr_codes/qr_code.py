import qrcode

# Remplace par l’URL de ton site
url = "https://briac-regeard-portfolio.netlify.app/"

# Génération du QR code
img = qrcode.make(url)

# Sauvegarde du fichier
img.save("qr_portfolio.png")

print("✅ QR code généré : qr_portfolio.png")
