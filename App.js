import auth from '@react-native-firebase/auth';


  const signIn = async (email, password) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      console.log('Användare inloggad!');
    } catch (error) {
      console.error(error.message);
    }
  };
  
  const signOut = async () => {
    try {
      await auth().signOut();
      console.log('Användare utloggad');
    } catch (error) {
      console.error(error.message);
    }
  };
  
  import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View>
      <TextInput
        placeholder="E-post"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Lösenord"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Registrera" onPress={() => signUp(email, password)} />
      <Button title="Logga in" onPress={() => signIn(email, password)} />
    </View>
  );
};

const user = auth().currentUser;
if (user) {
  console.log('Användare är inloggad:', user.email);
} else {
  console.log('Användare ej inloggad');
}

import firestore from '@react-native-firebase/firestore';
const addTask = async (taskName, intervalMonths) => {
    const task = {
      name: taskName,
      intervalMonths: intervalMonths,
      dueDate: firestore.FieldValue.serverTimestamp(), // Startdatum
    };
  
    await firestore().collection('tasks').add(task);
    console.log('Uppgift tillagd:', taskName);
  };
  
  const fetchTasks = async () => {
    const tasksSnapshot = await firestore().collection('tasks').get();
    const tasksList = tasksSnapshot.docs.map(doc => doc.data());
    console.log('Uppgifter:', tasksList);
  };
  
  import { FlatList } from 'react-native';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks().then(tasks => setTasks(tasks));
  }, []);

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <Text>{item.name}</Text>}
    />
  );
};
