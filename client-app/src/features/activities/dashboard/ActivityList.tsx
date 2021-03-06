import { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../../models/activity";

interface Props{
    activities : IActivity[];
    selectActivity: (id:string) => void;
    deleteActivity: (id:string) => void;
    submitting : boolean;
}

const ActivityList = ({activities,selectActivity,deleteActivity,submitting}:Props) => {
    const[target,setTarget]= useState('');

    const handleDeleteActivity = (e:SyntheticEvent<HTMLButtonElement>,id: string) => {
        console.log(`targetname ${e.currentTarget.name}`);
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    };
    return (
    <Segment>
        <Item.Group divided={true}>
            {activities.map(activity => (
                <Item key={activity.id}>
                    <Item.Content>
                        <Item.Header as={'a'}>{activity.title}</Item.Header>
                        <Item.Meta>{activity.date}</Item.Meta>
                        <Item.Description>
                            <div>{activity.description}</div>
                            <div>{activity.city},{activity.venue}</div>
                        </Item.Description>
                        <Item.Extra>
                            <Button floated="right" content='View' color="blue" onClick={() => selectActivity(activity.id)}/>
                            <Button 
                                name={activity.id}
                                loading={submitting && target===activity.id} 
                                floated="right" 
                                content='Delete' 
                                color="red" 
                                onClick={(e) => handleDeleteActivity(e,activity.id)}/>
                            <Label basic content={activity.category}/>
                        </Item.Extra>
                    </Item.Content>
                </Item>
            ))}
        </Item.Group>
    </Segment>
);}
export default ActivityList;