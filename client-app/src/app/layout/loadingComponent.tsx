import { Dimmer, Loader } from "semantic-ui-react";

interface Props {
    inverted?:boolean;
    content?: string;
}
const LoadingComponents = ({inverted=true,content='Loading...'}: Props) => (
    <Dimmer active={true} inverted={inverted} >
        <Loader content={content} />
    </Dimmer>
);
export default LoadingComponents;