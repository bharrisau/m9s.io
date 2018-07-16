import { Component } from 'inferno';

class Title extends Component {
    constructor(props) {
        super(props);
        this.title = props.title;
    }
    componentDidMount() {
        document.title = this.title;
    }
}

export default Title;
