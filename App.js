import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

import {
  Text,
  Container,
  Content,
  Header,
  Card,
  Body,
  H1,
  H3,
  Button,
  Title,
  Item,
} from 'native-base';

import Icons from './components/Icons';
import Snackbar from 'react-native-snackbar';

const ItemArray = new Array(9).fill('empty');

const App = () => {
  const [isCross, setIsCross] = useState(false);
  const [winMessage, setWinMessage] = useState('');

  const changeItem = (itemNumber) => {
    if (winMessage) {
      return Snackbar.show({
        text: winMessage,
        backgroundColor: '#000',
        textColor: '#fff',
      });
    }

    if (ItemArray[itemNumber] === 'empty') {
      ItemArray[itemNumber] = isCross ? 'cross' : 'circle';
      setIsCross(!isCross);
    } else {
      return Snackbar.show({
        text: 'Position is already filled',
        backgroundColor: 'red',
        color: '#fff',
      });
    }
  };

  const reloadGame = () => {
    setIsCross(false);
    setWinMessage('');
    ItemArray.fill('empty', 0, 9);
  };

  const checkIsWinner = () => {
    if(
      ItemArray[0] === ItemArray[1] && 
      ItemArray[0] === ItemArray[2] &&
      ItemArray[0] !== 'empty'  
    ){
      setWinMessage(`${ItemArray[0]} Won`)
    } else if (
      ItemArray[3] !== 'empty' &&
      ItemArray[3] === ItemArray[4] && 
      ItemArray[4] === ItemArray[5]
    )
    {
      setWinMessage(`${ItemArray[3]} Won`)
    } else if (
      ItemArray[6] !== 'empty' &&
      ItemArray[6] === ItemArray[7] && 
      ItemArray[7] === ItemArray[8]
    )
    {
      setWinMessage(`${ItemArray[6]} Won`)
    } else if (
      ItemArray[0] !== 'empty' &&
      ItemArray[0] === ItemArray[3] && 
      ItemArray[3] === ItemArray[6]
    )
    {
      setWinMessage(`${ItemArray[0]} Won`)
    } else if (
      ItemArray[1] !== 'empty' &&
      ItemArray[1] === ItemArray[4] && 
      ItemArray[4] === ItemArray[7]
    )
    {
      setWinMessage(`${ItemArray[1]} Won`)
    }
    else if (
      ItemArray[0] !== 'empty' &&
      ItemArray[0] === ItemArray[4] && 
      ItemArray[4] === ItemArray[8]
    )
    {
      setWinMessage(`${ItemArray[0]} Won`)
    } else if (
      ItemArray[2] !== 'empty' &&
      ItemArray[2] === ItemArray[4] && 
      ItemArray[4] === ItemArray[6]
    )
    {
      setWinMessage(`${ItemArray[2]} Won`)
    }
  };

  return (
    <Container style={{backgroundColor: '#333945', padding: 5}}>
      <Header>
        <Body>
          <Title>TicTacToe</Title>
        </Body>
      </Header>
      <Content>
        <View style={styles.grid}>
          {ItemArray.map((item, index) => (
            <TouchableOpacity
              style={styles.box}
              key={index}
              onPress={() => changeItem(index)}>
              <Card style={styles.card}>
                <Icons name={item} />
              </Card>
            </TouchableOpacity>
          ))}
        </View>
        {winMessage ? (
          <View>
            <H1 style={styles.message}>{winMessage}</H1>
            <Button onPress={reloadGame} primary block rounded>
              <Text>Reload Game</Text>
            </Button>
          </View>
        ) : (
          <H3 style={styles.message}>{isCross ? 'Cross' : 'Circle'} turns</H3>
        )}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  box: {
    width: '33%',
    marginBottom: 6,
  },
  card: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#fff',
    marginTop: 20,
    backgroundColor: '#4652b3',
    marginVertical: 10,
    marginVertical: 10,
  },
});

export default App;
