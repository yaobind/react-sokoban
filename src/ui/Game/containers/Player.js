import Player from  '../components/Player'
import { connect } from 'react-redux'

const mapState = (state) => ({
	...state.player
});

export default connect(mapState)(Player);
