import React, { Component, useState } from 'react'
import { SafeAreaView, StyleSheet, ScrollView, View, Text, FlatList, StatusBar, TouchableOpacity, Alert, } from 'react-native';
import TimeFormatter from 'minutes-seconds-milliseconds'


let laps = [
    {name: 'Lap 1', value: '00:00:01'},
    {name: 'Lap 2', value: '00:00:02'},
    {name: 'Lap 3', value: '00:00:03'},
    {name: 'Lap 4', value: '00:00:04'},
    {name: 'Lap 5', value: '00:00:05'},
];

class Stopwatch extends Component {
constructor(props) {
    super(props);
        this.state = { 
            isRunning: false,
            lapTime: null,
            mainTime: null,
            lapTimerStart: null,
            mainTimerStart: null,
    }
}

handleStartStop() {
    let { isRunning, firstTime, mainTime, lapTime } = this.state;
    //case1: Stop button clicked
    if(isRunning){
        clearInterval(this.interval);
        this.setState({ 
        isRunning: false
    });
    return;
    }
    //case2: Start button clicked
    this.setState({
        mainTimerStart: new Date(),
        lapTimerStart: new Date(),
        isRunning: true
    });
    this.interval = setInterval(() => {
        this.setState({
            mainTime: new Date() - this.state.mainTimerStart + mainTime,
            lapTime: new Date() - this.state.lapTimerStart + lapTime
    });
    },30);
}
handleLapReset() {
    let { isRunning, mainTimerStart } = this.state;
    //case1: Reset button is clicked
    if(mainTimerStart && !isRunning) {
        laps: [],
        this.setState({
            mainTimerStart: null,
            lapTimeStart: null,
            mainTime: 0,
            lapTime: 0
        });
    }
}

_header() {
  return(
    <View style={styles.header}>
        <Text style={styles.headerText}>Stopwatch</Text>
    </View>
  );
}
_lapTimer () {
  return(
    <View style={styles.timeWrapper}>
      <View style={styles.timeWrapperInner}>
        <Text style={styles.lapTimer}>{TimeFormatter(this.state.lapTime)}</Text>
        <Text style={styles.mainTimer}>{TimeFormatter(this.state.mainTime)}</Text>
      </View>
    </View>
  );
}

_buttonToggle () {
  return(
    <View style={styles.btnWrapper}>
        <TouchableOpacity style={styles.btn}
        onPress={() => {this.handleLapReset(this)}}>
            <Text style={styles.textBtn}>{(this.state.mainTimerStart && this.state.isRunning)? 'Lap' : 'Reset'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}
        onPress={() => {this.handleStartStop(this)}}>
            <Text style={[styles.textBtn, this.state.isRunning && styles.textBtnStop]}>{this.state.isRunning ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>
    </View>
  );
}
_lapList () {
    return(
        <FlatList 
            data={laps}
            renderItem={({item}) => 
            <View style={styles.lapWrapper}>
                <Text style={styles.lapNumber}>{item.name}</Text>
                <Text style={styles.lapTimes}>{item.value}</Text>
            </View>
        }/>
    );
}
    
    render() {
        return (
        <View style={styles.container}>
            <View style={styles.top}>
                {this._header()}
                {this._lapTimer()}
            </View>
            <View style={styles.bottom}>
                {this._buttonToggle()}
                {this._lapList()}
            </View>
        </View>
        );
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 1,
    backgroundColor: '#5d5d5a'
  },
  bottom: {
    flex: 2,
    backgroundColor: '#fff4e3'
  },
  header: {
    marginTop: 30,  
    height: 45,
    backgroundColor: '#5d5d5a',
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',

  },
  timeWrapper: {
    paddingTop: 30,
    alignItems: 'center',
    marginBottom: 30
  },
  timeWrapperInner: {
    alignSelf: 'center'
  },
  lapTimer: {
    fontSize: 30,
    padding: 5,
    fontWeight: '200',
    color: '#f1f2f6',
    alignSelf: 'flex-end'
  },
  mainTimer: {
    fontSize: 75,
    padding: 5,
    fontWeight: '200',
    color: '#f1f2f6',
    alignSelf: 'flex-end',
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent:'space-around',
    paddingTop: 15,
    paddingBottom: 30
  },
  btn: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginTop: 30,
    backgroundColor: '#ffcdab',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textBtn: {
    fontSize: 25,
    fontWeight: '200'
  },
  textBtnStop: {
    fontSize: 25, 
    fontWeight: '200',
    color: 'red'
  },
  lapWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: 0.5
  },
  lapNumber: {
    fontSize: 20,
    color: 'grey'
  },
  lapTimes: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default Stopwatch;