import { Button, Card,Image } from "semantic-ui-react";
import { IActivity } from "../../../models/activity";

interface Props{
    activity : IActivity | undefined;
    cancelActivity :  () => void;
    openForm : (id?:string) =>void;
}

const ActivityDetails= ({activity,cancelActivity,openForm}:Props) => (
    <Card fluid>
        <Image src={`/assets/categoryImages/${activity!.category}.jpg`} />
        <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
            <span >{activity!.date}</span>
        </Card.Meta>
        <Card.Description>
            {activity!.description}
        </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button.Group widths={2}>
                <Button basic color="blue" content='Edit' onClick={() => openForm(activity!.id)}/>
                <Button basic color="grey" content='Cancel' onClick={() => cancelActivity()}/>
            </Button.Group>
        </Card.Content>
  </Card>
);
export default ActivityDetails;