# 🚀 Quick Start Guide - Moroccan Qamis

## ✅ Your site is ready to run!

All placeholder images are already configured using Unsplash CDN. The site will work immediately without any additional setup.

## 📂 What You Have

```
✅ 8 HTML Pages (fully functional)
✅ Complete CSS (responsive + animations)
✅ 5 JavaScript modules (cart, language, filters, etc.)
✅ 8 Products with images
✅ Bilingual support (EN/AR)
✅ Shopping cart system
✅ Product filtering
```

## 🎯 3 Ways to Run Locally

### Option 1: Double-Click (Simplest)
1. Open `index.html` in your browser
2. That's it! ✨

**Note:** Some features (like loading JSON) work better with a local server.

### Option 2: VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

### Option 3: Python Server
```bash
# Navigate to project folder
cd moroccan-qamis

# Python 3
python -m http.server 8000

# Then open: http://localhost:8000
```

### Option 4: Node.js
```bash
npx http-server
# Then open the URL shown
```

## 🌐 Deploy to Production (Free)

### Vercel (Recommended - 2 minutes)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts, done!
```

Or use the web interface:
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import from GitHub or drag & drop folder
4. Click "Deploy"

### Netlify (Drag & Drop)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire `moroccan-qamis` folder
3. Wait 30 seconds
4. Your site is live!

### GitHub Pages
1. Create GitHub repository
2. Push your code
3. Go to Settings → Pages
4. Select branch → Save
5. Site live at `username.github.io/repo-name`

## 🎨 Customize Your Site

### Change Colors
Edit `assets/css/style.css` (lines 8-16):
```css
:root {
  --primary: #2A7C5B;      /* Change this */
  --secondary: #D4AF37;    /* And this */
  --accent: #C41E3A;       /* And this */
}
```

### Add/Edit Products
Edit `data/products.json`:
```json
{
  "id": 9,
  "name": { "en": "New Product", "ar": "منتج جديد" },
  "price": 99.99,
  "image": "https://your-image-url.com/image.jpg",
  "category": "classic",
  "sizes": ["M", "L", "XL"],
  "colors": ["white"],
  "description": { "en": "Description", "ar": "الوصف" },
  "featured": true,
  "bestseller": false
}
```

### Change Text/Translations
Edit `data/translations.json`

### Use Your Own Images
1. Replace placeholder URLs in `data/products.json`
2. Or save images to `assets/img/products/` and update paths
3. See `image-placeholders.html` for current URLs

## 📱 Test Your Site

### Desktop
- Open in Chrome, Firefox, Safari, Edge
- Test language switcher (EN/AR)
- Add products to cart
- Try checkout form

### Mobile
- Open on phone browser
- Test responsive menu
- Verify touch interactions work

### Features to Test
- ✅ Language switching (top right)
- ✅ Add to cart
- ✅ Product filtering (shop page)
- ✅ Product search/sort
- ✅ Cart persistence (refresh page)
- ✅ Responsive design (resize window)
- ✅ Forms (contact, checkout)

## 🔧 Common Issues

### Images not loading?
- Check internet connection (using Unsplash CDN)
- Or download images and use local paths

### Cart not working?
- Enable localStorage in browser
- Check browser console for errors

### Translations not showing?
- Make sure you're running via local server
- Check `data/translations.json` loaded correctly

### Filters not working on shop page?
- Ensure `assets/js/filters.js` is loaded
- Check browser console for errors

## 📊 Performance Tips

### Before Going Live:
1. **Optimize images** - Compress to < 200KB each
2. **Use WebP format** - Better compression
3. **Enable caching** - On your hosting
4. **Minify CSS/JS** - Use online tools
5. **Add meta tags** - For SEO

### SEO Checklist:
- ✅ Update page titles
- ✅ Add meta descriptions
- ✅ Include alt text on images
- ✅ Create sitemap.xml
- ✅ Add robots.txt

## 🎓 Next Steps

### Add Backend (Optional)
- Node.js + Express
- PHP + MySQL
- Firebase
- Supabase

### Add Payments
- Stripe
- PayPal
- Square

### Add Features
- User authentication
- Order tracking
- Product reviews
- Wishlist
- Email notifications
- Admin dashboard

## 📞 Need Help?

1. Check `README.md` for detailed docs
2. Open `image-placeholders.html` for image URLs
3. View browser console for errors (F12)

## 🎉 You're All Set!

Your Moroccan Qamis e-commerce site is production-ready!

**Open `index.html` now and see it in action!** 🚀

---

Built with ❤️ - No backend required, fully static, deploy anywhere!
