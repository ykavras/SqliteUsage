import SQLite from 'react-native-sqlite-storage';

export default class DataBase {
  constructor() {
    this.sqlite = SQLite;
    this.sqlite.DEBUG(true);
    this.sqlite.enablePromise(true);
    this.sqlite
      .openDatabase({
        name: 'PodCast',
        location: 'default',
      })
      .then(db => (this.dbInstance = db));
  }

  createTable = async () => {
    try {
      await this.dbInstance.executeSql(
        `CREATE TABLE PlayList (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          cover TEXT NOT NULL,
          mp3Path TEXT NOT NULL
        )`,
      );
      console.log('createTable SUCCESS');
    } catch (e) {
      console.log('createTable ERROR =>', e);
    }
  };

  dropTable = async () => {
    try {
      await this.dbInstance.executeSql('DROP TABLE PlayList');
      console.log('dropTable SUCCESS');
    } catch (e) {
      console.log('dropTable ERROR =>', e);
    }
  };

  clearTable = async () => {
    try {
      await this.dbInstance.executeSql('DELETE FROM PlayList');
      console.log('clearTable SUCCESS');
    } catch (e) {
      console.log('clearTable ERROR =>', e);
    }
  };

  getTable = async () => {
    try {
      const [values] = await this.dbInstance.executeSql(
        'SELECT * FROM PlayList',
      );
      const array = [];
      for (let index = 0; index < values.rows.length; index++) {
        const element = values.rows.item(index);
        array.push(element);
      }
      console.log('getTable SUCCESS');
      return array;
    } catch (e) {
      console.log('getTable ERROR =>', e);
    }
  };

  addItem = async (title, cover, mp3Path) => {
    try {
      await this.dbInstance.executeSql(
        `INSERT INTO PlayList (title,cover,mp3Path) VALUES('${title}', '${cover}', '${mp3Path}')`,
      );
      console.log('addItem SUCCESS');
    } catch (e) {
      console.log('addItem ERROR =>', e);
    }
  };
}
