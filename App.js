import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroBox,
  ViroMaterials,
  ViroAnimations,
} from '@viro-community/react-viro';

const MyScene = () => {
  ViroMaterials.createMaterials({
    side: {
      diffuseTexture: require('./assets/acme.jpeg'),
    },
  });

  ViroAnimations.registerAnimations({
    rotate: {
      duration: 2500,
      properties: {
        rotateY: '+=90',
      },
    },
  });

  return (
    <ViroARScene>
      <ViroBox
        height={2}
        length={2}
        width={2}
        scale={[0.2, 0.2, 0.2]}
        position={[0, 0, -1]}
        materials={['side']}
        animation={{name: 'rotate', loop: true, run: true}}
      />
    </ViroARScene>
  );
};

export default () => {
  return (
    <ViroARSceneNavigator
      initialScene={{
        scene: MyScene,
      }}
      style={{flex: 1}}
    />
  );
};

var styles = StyleSheet.create({});
