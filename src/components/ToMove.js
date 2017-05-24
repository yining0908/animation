import React, { Component } from 'react';
import {  
    View,
    Text,
    LayoutAnimation,
    TouchableWithoutFeedback,
    UIManager,
    Animated,
    Dimensions,
    PanResponder
 } from 'react-native';

import { List, ListItem } from 'react-native-elements';
import albums from '../json/albums.json';

// Make a component
class Tomove extends Component {
    constructor(props) {
        super(props);
        const position = new Animated.ValueXY();
        this.state = { height: this.props.expanded ? null : 0, position }
    }

    componentWillMount() {
        this.panResponder = PanResponder.create({
            //onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: (event, gesture) => {
                this.state.position.setValue({ x: gesture.dx });
            },
            onPanResponderRelease: this.onReleaseItem,
            onPanResponderTerminate: this.onReleaseItem,
        });
    }

      onToggle = () => {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
        this.setState({
            height: this.state.height === null ? 0 : null,
        })
    }

    onReleaseItem = (event, gesture) => {
        let config = {
            toValue: { x: 0, y: 0 },
            duration: 500,
        };

        Animated.spring(
            this.state.position,
            config,
        ).start();
    }

  render() {
    const { content, title,album , nav } = this.props;
    const { height,position } = this.state;
    return (
        <Animated.View
          style={ position.getLayout()}
          {...this.panResponder.panHandlers}>
         
          <ListItem
              key={album.title}
              avatar={{ uri: album.image }}
              title={album.title}
              subtitle={album.artist}
            roundAvatar
            onPress={() => nav.navigate('Details', { ...album })}/>
        </Animated.View>
    );
  }
}

export default Tomove;