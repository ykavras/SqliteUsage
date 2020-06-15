import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import DataBase from '../../database';

const Button = ({onPress, title}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

class SqLite extends Component {
  constructor(props) {
    super(props);
    this.database = new DataBase();
  }
  componentDidMount() {
    console.log('SqLite');
  }

  dataBaseCreateTable = () => {
    this.database.createTable();
  };

  dataBaseGetTable = async () => {
    const data = await this.database.getTable();
    if (data.length > 0) {
      data.map(item => console.log(item));
    }
  };

  dataBaseDropTable = () => {
    this.database.dropTable();
  };

  dataBaseAddItem = () => {
    const title = 'Müslüm Gürses';
    const cover = 'image-path';
    const mp3Path = 'mp3-path';
    this.database.addItem(title, cover, mp3Path);
  };

  dataBaseClearTable = () => {
    this.database.clearTable();
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <Button title="Create Table" onPress={this.dataBaseCreateTable} />
        <Button title="Drop Table" onPress={this.dataBaseDropTable} />
        <Button title="Clear Table" onPress={this.dataBaseClearTable} />
        <Button title="Get Table" onPress={this.dataBaseGetTable} />
        <Button title="Add Item" onPress={this.dataBaseAddItem} />
      </View>
    );
  }
}

export default SqLite;
