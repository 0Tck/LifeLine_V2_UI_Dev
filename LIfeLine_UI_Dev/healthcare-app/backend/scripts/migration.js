// migration-script.js
const MongoClient = require('mongodb').MongoClient;

async function migrateData() {
    const url = 'mongodb://localhost:27017';
    const client = await MongoClient.connect(url);
    const db = client.db('healthcareApp');
    
    // 1. First create a backup collection
    await db.collection('users').aggregate([
        { $out: "users_backup" }
    ]).toArray();
    
    // 2. Check existing data structure
    const sampleUser = await db.collection('users').findOne({});
    console.log('Current user structure:', sampleUser);
    
    // 3. Update existing documents to include new fields with default values
    await db.collection('users').updateMany(
        {},
        {
            $set: {
                bloodGroup: null,
                medicalHistory: [],
                currentMedications: [],
                previousAppointments: [],
                upcomingAppointments: [],
                services: [],
                trustees: [],
                diagnoses: [],
                updatedAt: new Date(),
                status: 'approved' // For existing users
            }
        }
    );
    
    console.log('Migration completed successfully');
    client.close();
}

migrateData().catch(console.error);