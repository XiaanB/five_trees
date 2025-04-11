import * as SQLite from 'expo-sqlite';

export const DatabaseConnection = {
  getConnection: () => {
    return SQLite.openDatabase('userProfile.db');
  }
};
