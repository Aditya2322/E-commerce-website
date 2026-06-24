const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const products = [
  { name: 'Minimal Tee', description: 'Clean, minimal cotton t-shirt for everyday wear.', price: 499, category: 'fashion', emoji: '👗', stock: 50, rating: 4.2, numReviews: 34 },
  { name: 'Cargo Pants', description: 'Durable cargo pants with multiple pockets.', price: 1299, category: 'fashion', emoji: '👟', stock: 30, rating: 4.5, numReviews: 21 },
  { name: 'Leather Bag', description: 'Genuine leather everyday carry bag.', price: 2499, category: 'fashion', emoji: '👜', stock: 15, rating: 4.7, numReviews: 58 },
  { name: 'Puffer Jacket', description: 'Warm puffer jacket for winters.', price: 3999, category: 'fashion', emoji: '🧥', stock: 20, rating: 4.3, numReviews: 12 },
  { name: 'Pro Phone X', description: 'Latest flagship smartphone with 5G.', price: 29999, category: 'electronics', emoji: '📱', stock: 25, rating: 4.6, numReviews: 130 },
  { name: 'UltraBook 14', description: 'Thin and light laptop for productivity.', price: 59999, category: 'electronics', emoji: '💻', stock: 10, rating: 4.4, numReviews: 87 },
  { name: 'Noise Earbuds', description: 'Active noise cancelling wireless earbuds.', price: 3499, category: 'electronics', emoji: '🎧', stock: 40, rating: 4.5, numReviews: 210 },
  { name: 'Smart Watch', description: 'Fitness tracking smartwatch with AMOLED display.', price: 12999, category: 'electronics', emoji: '⌚', stock: 18, rating: 4.3, numReviews: 95 },
  { name: 'Garden Salad Kit', description: 'Fresh pre-washed salad kit for 2.', price: 199, category: 'food', emoji: '🥗', stock: 100, rating: 4.1, numReviews: 45 },
  { name: 'Artisan Pizza', description: 'Handmade wood-fired artisan pizza.', price: 349, category: 'food', emoji: '🍕', stock: 60, rating: 4.8, numReviews: 78 },
  { name: 'Cold Brew Pack', description: '6-pack cold brew coffee, ready to drink.', price: 549, category: 'food', emoji: '☕', stock: 80, rating: 4.6, numReviews: 62 },
  { name: 'Dark Choco Bar', description: '70% dark chocolate artisan bar.', price: 199, category: 'food', emoji: '🍫', stock: 120, rating: 4.4, numReviews: 33 },
  { name: 'Monstera Plant', description: 'Indoor monstera deliciosa, pot included.', price: 599, category: 'lifestyle', emoji: '🪴', stock: 35, rating: 4.7, numReviews: 29 },
  { name: 'Soy Candle Set', description: 'Set of 3 hand-poured soy candles.', price: 799, category: 'lifestyle', emoji: '🕯️', stock: 45, rating: 4.5, numReviews: 41 },
  { name: 'Art Starter Set', description: 'Complete painting kit for beginners.', price: 1299, category: 'lifestyle', emoji: '🎨', stock: 22, rating: 4.3, numReviews: 18 },
  { name: 'Skincare Kit', description: 'Daily skincare routine kit, all skin types.', price: 1999, category: 'lifestyle', emoji: '🧴', stock: 28, rating: 4.6, numReviews: 67 },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    await Product.deleteMany();
    await User.deleteMany();

    // Create admin user
    await User.create({
      name: 'Admin',
      email: 'admin@shop.com',
      password: 'admin123',
      role: 'admin'
    });

    await Product.insertMany(products);
    console.log('✅ Seeded', products.length, 'products and admin user');
    console.log('Admin login: admin@shop.com / admin123');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
