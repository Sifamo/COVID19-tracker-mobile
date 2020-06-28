import React from 'react';
import MapView, { Polyline, Polygon, Circle, Callout } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Firebase from '../../config';


export default class Map extends React.Component {
    isMountd = false;
    constructor(props){
        super(props);

        this.state = {
              regions: [],
              
        };
    }
    
    regionsListener() {
      Firebase.database().ref('coordinates').on('value', (snapshot) => {
        var items = [];
        snapshot.forEach((child) => {
          items.push({
            case: child.val().case,
            name: child.key,
            latitude: child.val().latitude,
            longitude: child.val().longitude
          })
        })
        this.setState({regions: items});
    })
    }


componentDidMount(){
  this.isMountd = true;
  if(this.isMountd)
  this.regionsListener();
}

componentWillUnmount() {
  this.isMountd = false;
}
    
  render() {
    return (
      <View style={styles.container}>
        <MapView 
            style={styles.mapStyle}
            initialRegion={{
                latitude: 32.296374,
                longitude: -9.236988,
                latitudeDelta: 0.098965,
                longitudeDelta: 0.085488,
              }}
        >
             {
                this.state.regions.map(element => (
                     <Circle
                        key= {element.name}
                        center={{ latitude: element.latitude, longitude: element.longitude }}
                        //radius={element.case*25}
                        radius = {300}
                       fillColor={'rgba(200, 300, 200, 0.5)'}
                    >
                         
                    </Circle>
                )
                )
            } 
            
             
            
            

        </MapView>    
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});