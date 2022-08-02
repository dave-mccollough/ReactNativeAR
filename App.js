import React, {useState} from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroBox,
  ViroMaterials,
  ViroAnimations,
  Viro3DObject,
  ViroAmbientLight,
  viroAppProps,
} from '@viro-community/react-viro';

const MyScene = props => {
  const [jeepRotation, setJeepRotation] = useState([0, 90, 0]);
  const [jeepPosition, setJeepPostion] = useState([0, 0, 0]);
  const [tvRotation, setTVRotation] = useState([-45, 50, 50]);
  const [tvPosition, setTVPostion] = useState([0, 0, -5]);
  const [jeepScale, setJeepScale] = useState([0.01, 0.01, 0.01]);
  const [tvScale, setTVScale] = useState([0.005, 0.005, 0.005]);

  let data = props.sceneNavigator.viroAppProps;
  ViroMaterials.createMaterials({
    tv: {
      diffuseTexture: require('./assets/tv/TV_Body_material_Base_Color.png'),
    },
    jeep: {
      diffuseTexture: require('./assets/jeep/car_jeep_ren.jpg'),
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

  // Move TV object
  const moveTVObject = newTVPostion => {
    setTVPostion(newTVPostion);
  };

  // Move Jeep object
  const moveJeepObject = newJeepPostion => {
    setJeepPostion(newJeepPostion);
  };

  // Rotate TV object
  const rotateTVObject = (rotateState, rotationFactor, source) => {
    if (rotateState === 3) {
      let currentRotation = [
        tvRotation[0] - rotationFactor,
        tvRotation[1] - rotationFactor,
        tvRotation[2] - rotationFactor,
      ];
      setTVRotation(currentRotation);
    }
  };

  // Rotate Jeep object
  const rotateJeepObject = (rotateState, rotationFactor, source) => {
    if (rotateState === 3) {
      let currentRotation = [
        jeepRotation[0] - rotationFactor,
        jeepRotation[1] - rotationFactor,
        jeepRotation[2] - rotationFactor,
      ];
      setJeepRotation(currentRotation);
    }
  };

  // Scale Jeep Object
  const scaleJeepObject = (pinchState, scaleFactor, source) => {
    if (pinchState === 3) {
      let currentScale = jeepScale[0];
      let newScale = currentScale * scaleFactor;
      let newScaleArray = [newScale, newScale, newScale];
      setJeepScale(newScaleArray);
    }
  };

  // Scale TV Object
  const scaleTVObject = (pinchState, scaleFactor, source) => {
    if (pinchState === 3) {
      let currentScale = tvScale[0];
      let newScale = currentScale * scaleFactor;
      let newScaleArray = [newScale, newScale, newScale];
      setTVScale(newScaleArray);
    }
  };

  return (
    <ViroARScene>
      <ViroAmbientLight color="#ffffff" />
      {data.object === 'jeep' ? (
        <Viro3DObject
          source={require('./assets/jeep/Jeep_Renegade_2016.obj')}
          // Cartesian position of the object in 3d world space, specified as [x, y, z].
          position={jeepPosition}
          // The scale of the object in 3d space, specified as [x,y,z]
          // A scale of 1 represents the object's current size.
          //A scale value of < 1 will make the object proportionally smaller while a value >1 will make the object proportionally bigger along the specified axis.
          scale={jeepScale}
          // The rotation of the object around it's local axis specified as Euler angles [x, y, z]. Units for each angle are specified in degrees.
          rotation={jeepRotation}
          materials={['jeep']}
          type="OBJ"
          onDrag={moveJeepObject}
          onRotate={rotateJeepObject}
          onPinch={scaleJeepObject}
        />
      ) : (
        <Viro3DObject
          source={require('./assets/tv/Old_Tv.obj')}
          // Cartesian position of the object in 3d world space, specified as [x, y, z].
          position={tvPosition}
          // The scale of the object in 3d space, specified as [x,y,z]
          // A scale of 1 represents the object's current size.
          //A scale value of < 1 will make the object proportionally smaller while a value >1 will make the object proportionally bigger along the specified axis.
          scale={tvScale}
          // The rotation of the object around it's local axis specified as Euler angles [x, y, z]. Units for each angle are specified in degrees.
          rotation={tvRotation}
          materials={['tv']}
          type="OBJ"
          onDrag={moveTVObject}
          onRotate={rotateTVObject}
          OnPinch={scaleTVObject}
        />
      )}
    </ViroARScene>
  );
};

export default () => {
  const [object, setObject] = useState('jeep');
  return (
    <View style={styles.primaryView}>
      <ViroARSceneNavigator
        initialScene={{
          scene: MyScene,
        }}
        viroAppProps={{object: object}}
        style={{flex: 1}}
      />
      <View style={styles.controlView}>
        <TouchableOpacity onPress={() => setObject('jeep')}>
          <Text style={styles.text}>Display Jeep</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setObject('tv')}>
          <Text style={styles.text}>Display TV</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

var styles = StyleSheet.create({
  primaryView: {flex: 1},
  controlView: {
    width: '100%',
    height: 100,
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    margin: 20,
    backgroundColor: '#9d9d9d',
    padding: 10,
    fontWeight: 'bold',
  },
});
