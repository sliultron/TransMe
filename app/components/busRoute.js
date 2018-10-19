import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    ListView,
    Text,
    Linking,
    Button
} from 'react-native';


const BusRoute = (props)=> {
 const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
 let addButton;
if(props.addRoute) 
{
    addButton = <Button
                    onPress={()=>props.addRoute(props.route.RouteNo)}
                    title="Add"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
}

        return(
            <View style={styles.card}>
                <Text>{props.route.RouteNo}</Text>
                <Text>{props.route.RouteName}</Text>
                <Text>{props.route.Direction}</Text>
                <Text>Next Schedules:</Text>
                <ListView
                        dataSource={ds.cloneWithRows(props.route.Schedules)}
                        renderRow={(rowData) => <Text>{rowData.ExpectedLeaveTime}</Text>}
                    />
                <Text>Refresh to see the update</Text>
                 {addButton}
            </View>
        )
    }



const styles = StyleSheet.create({
    card:{
        borderBottomWidth:1,
        borderStyle:"solid",
        borderColor:"#eee",
        marginTop:10,
        padding:5,
        paddingBottom:10
    }
});

export default BusRoute;