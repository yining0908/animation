import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import albums from '../json/albums.json';
import ToMove from './ToMove';

// Make a component
class PageOne extends Component {

  state = { albums: [] };

  componentWillMount() {
    this.setState({ albums });
    console.log(this.state);
  }
  
  render() {
    return (
      <ScrollView>
        <List>
        {this.state.albums.map((album) => (
          <ToMove
         album={{...album}}
           nav={this.props.navigation} />
          ))}
        </List>
      </ScrollView>
    );
  }
}

export default PageOne;