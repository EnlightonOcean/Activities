import { Button, Container, Menu} from "semantic-ui-react";

interface Props{
    openForm : (id?:string) => void;
}

function NavBar({openForm}:Props){
    return (
        <Menu inverted={true} fixed='top'>
            <Container>
                <Menu.Item header={true}>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities'/>
                <Menu.Item> 
                    <Button positive={true} content='Create Activity' onClick={() => openForm(undefined)}/>
                </Menu.Item>
            </Container>
        </Menu>
    );
}
export default NavBar;