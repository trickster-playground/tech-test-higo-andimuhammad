const csv = require('csvtojson');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');
require('dotenv').config();

const BATCH_SIZE = 5000;
const FILE_PATH = path.join(__dirname, '../Dataset.csv'); // sesuaikan path CSV-mu

// Fungsi mapping dari CSV ke schema mongoose
function mapCsvRowToSchema(row) {
  return {
    Number: Number(row['Number']),
    Name_of_Location: row['Name of Location'],
    Date: row['Date'],
    Login_Hour: row['Login Hour'],
    Name: row['Name'],
    Age: Number(row['Age']),
    gender: row['gender'],
    Email: row['Email'],
    No_Telp: row['No Telp'],
    Brand_Device: row['Brand Device'],
    Digital_Interest: row['Digital Interest'],
    Location_Type: row['Location Type'],
  };
}

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    const readStream = fs.createReadStream(FILE_PATH);
    const converter = csv();

    let batch = [];
    let totalInserted = 0;

    converter.subscribe(
      async (json, lineNumber) => {
        const mapped = mapCsvRowToSchema(json);
        batch.push(mapped);

        if (batch.length >= BATCH_SIZE) {
          readStream.pause(); // jeda baca sementara
          try {
            await User.insertMany(batch, { ordered: false });
            totalInserted += batch.length;
            console.log(`✅ Inserted ${totalInserted} rows`);
          } catch (e) {
            console.error(`⚠️ Error during insertMany:`, e.message);
          }
          batch = [];
          readStream.resume(); // lanjut baca
        }
      },
      (error) => {
        console.error('❌ CSV parsing error:', error.message);
      },
      async () => {
        // Insert sisa batch terakhir jika ada
        if (batch.length > 0) {
          try {
            await User.insertMany(batch, { ordered: false });
            totalInserted += batch.length;
            console.log(`✅ Final insert: ${batch.length} rows`);
          } catch (e) {
            console.error('❌ Final insert error:', e.message);
          }
        }
        console.log(`🎉 Import selesai. Total rows inserted: ${totalInserted}`);
        process.exit();
      }
    );

    readStream.pipe(converter);

    readStream.on('error', (err) => {
      console.error('❌ Read stream error:', err.message);
    });
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
  }
})();
