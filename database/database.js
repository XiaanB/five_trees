import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

let db = null;

if (Platform.OS !== 'web') {
  db = SQLite.openDatabase('userProfile.db');
} else {
  console.warn('SQLite is not supported on web');
}

export const createTables = () => {
  if (!db) return;
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS user_profile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        phone_number TEXT,
        address TEXT,
        photo_url TEXT,
        newsletter INTEGER,
        promotions INTEGER,
        subscriptionOrders INTEGER
      );`
    );
  });
};

export const insertUserProfile = ({
  name,
  email,
  phone_number,
  address,
  photo_url,
  newsletter,
  promotions,
  subscriptionOrders,
}) => {
  if (!db) return;
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO user_profile 
        (name, email, phone_number, address, photo_url, newsletter, promotions, subscriptionOrders) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, phone_number, address, photo_url, newsletter ? 1 : 0, promotions ? 1 : 0, subscriptionOrders ? 1 : 0],
      (_, result) => {
        console.log('User profile inserted:', result);
      },
      (_, error) => {
        console.error('Error inserting user profile:', error);
        return false;
      }
    );
  });
};
