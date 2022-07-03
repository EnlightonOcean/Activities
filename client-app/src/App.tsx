import React, { useEffect, useState } from 'react';

import './App.css';
import axios from 'axios';
import { Activity } from './model';
import { Header,List } from 'semantic-ui-react';

function App() {
  
  const url="https://localhost:5001/api/";
  const [activities,setActivities] = useState([]);
  
  useEffect(() => {
    axios.get(url+'Activities').then(r => {
      console.log(r);
      setActivities(r.data);
    })
  },[]);

  return (
    <div>
      <Header as='h2' icon='users' content='Reactivities' />
      <List>
      {activities.map((v:Activity)=>(
            <List.Item key={v.id}>{v.title}</List.Item>
          ))}
      </List>
    </div>
  );
}

export default App;
