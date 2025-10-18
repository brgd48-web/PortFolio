import qrcode

# Remplace par l’URL de ton site
url = "https://brgd48-web.github.io/PortFolio/"

# Génération du QR code
img = qrcode.make(url)

# Sauvegarde du fichier
img.save("qr_portfolio.png")

print("✅ QR code généré : qr_portfolio.png")
