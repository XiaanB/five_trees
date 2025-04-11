import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import * as SQLite from 'expo-sqlite';  // Use * as SQLite for the import
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DatabaseConnection = {
  getConnection: () => {
    return SQLite.openDatabase('userProfile.db');  // This is correct
  }
};

export default function TestSQLite() {
  useEffect(() => {
    // Use SQLite.openDatabase correctly
    const db = SQLite.openDatabase('test.db');  // Change openDatabase from openDatabase directly

    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY NOT NULL, name TEXT);',
        [],
        () => console.log('✅ Table created'),
        (_, err) => {
          console.log('❌ Error creating table:', err);
          return true;
        }
      );
    });
  }, []);

  return (
    <View>
      <Text>SQLite test</Text>
    </View>
  );
}
