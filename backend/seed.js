const connectDB = require('../configg/database');
const User = require('./models/User');
const Policy = require('./models/Policy');
const bcrypt = require('bcryptjs');

async function seed() {
  await connectDB();
  await User.deleteMany({});
  await Policy.deleteMany({});

  const password = await bcrypt.hash('motise@neo05', 10);
  const neo = new User({ name: 'Neo', email: 'neo@motise.com', password });
  await neo.save();

  const policies = [
    { policyNumber: 'P-10001', type: 'Auto', premium: 450.5, effectiveDate: new Date('2025-03-01'), user: neo._id },
    { policyNumber: 'P-20002', type: 'Home', premium: 1200.0, effectiveDate: new Date('2024-10-15'), user: neo._id }
  ];
  await Policy.insertMany(policies);

  console.log('Seed completed. Login with neo@motise.com / motise@neo05');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});