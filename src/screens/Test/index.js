import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import Video from 'react-native-video';

const path = RNFS.DocumentDirectoryPath;
RNFS.mkdir(`${path}/ykavras`);

class Test extends Component {
  state = {
    data: [],
    progress: 0,
    url: '',
  };

  downloadFile = () => {
    const url =
      'https://storage.googleapis.com/coverr-main/mp4/Minido.mp4?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=coverr-183014%40appspot.gserviceaccount.com%2F20200605%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20200605T030235Z&X-Goog-Expires=90000&X-Goog-SignedHeaders=host&X-Goog-Signature=18cf688518bb06e25a7fd8f80331de4e1900d4727486fb04cc2130905137ff36be794c9b08d4bbef052a6bd1b6b7599dcca00ee51ee049edb756ffe241b76d96dd71545d9c6fef788ea07cef72e4dbb8ea4bfcafc385dc8ff3b0efe2aaf3ec4c630577e39a1cae42eb55de1e6b3344aae889f7af68f57f7dad31e362f4b2837c87af3b44a3aa6f5d703e14e2be44a50f4dd839cda7fda328a77aaf34329306df1ea17a5c3c29a566617437df336871e68087e94c20ee0c4eefe759612a4e0081b9dbae5b0562fd8e27053f48c547103dc3173833177c1593dd0112816883ba96dbf20b62156ca463bd101df95f14aace4a17d5e87802970ef9db1fac20fb37fc';
    RNFetchBlob.config({
      fileCache: false,
      path: `${path}/ykavras/here3.mp4`,
    })
      .fetch('GET', url)
      .progress({interval: 1}, (received, total) => {
        this.setState({
          progress: ((received / total) * 100).toFixed(0),
        });
      })
      .then(res => {
        if (res.respInfo.status === 200) {
          alert('Success Download');
          this.setState({progress: 0});
        }
      })
      .catch(err => console.log(err));
  };

  writeFile(url, file) {
    RNFS.writeFile(url, file, 'utf8')
      .then(success => console.log('FILE WRITTEN!'))
      .catch(err => console.log(err.message));
  }

  getFile = () => {
    RNFS.readDir(`${path}/ykavras`)
      .then(content => {
        console.log('GET content', content);
        this.setState({data: []});
        content.map(item => {
          this.setState({data: [...this.state.data, item.path]});
        });
      })
      .catch(err => console.log(err));
  };

  removeDirectory = () => {
    this.state.data.map(url => {
      RNFS.unlink(url)
        .then(() => {
          console.log('FILE DELETED');
          this.setState({data: [], url: '', progress: 0});
        })
        // `unlink` will throw an error, if the item to unlink does not exist
        .catch(err => {
          console.log(err.message);
        });
    });
  };

  render() {
    const {progress} = this.state;
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={this.downloadFile} style={styles.button}>
          <Text style={styles.buttonTitle}>Download File</Text>
        </TouchableOpacity>
        {progress ? (
          <View
            style={{
              width: `${progress}%`,
              height: 20,
              backgroundColor: '#000',
            }}>
            <Text style={{color: '#FFF', textAlign: 'center'}}>
              {progress}%
            </Text>
          </View>
        ) : null}
        <TouchableOpacity onPress={this.writeFile} style={styles.button}>
          <Text style={styles.buttonTitle}>Create File</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.getFile} style={styles.button}>
          <Text style={styles.buttonTitle}>Get File</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.removeDirectory} style={styles.button}>
          <Text style={styles.buttonTitle}>Remove File</Text>
        </TouchableOpacity>
        <View>
          {this.state.data.map((item, index) => (
            <TouchableOpacity
              key={`${index}`}
              style={styles.play}
              onPress={() => {
                this.setState({url: item});
              }}>
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {this.state.url !== '' && (
          <Video
            source={{uri: this.state.url}}
            ref={ref => {
              this.player = ref;
            }}
            style={styles.backgroundVideo}
            resizeMode="contain"
          />
        )}
      </View>
    );
  }
}

export default Test;
