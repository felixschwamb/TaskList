import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";

export class UpdateForm extends Component {
	constructor() {
		super();
		this.state = {
			title: "",
			completed: ""
		};
	}

	componentDidMount = () => {
		const title = this.props.task.title;
		const completed = this.props.task.completed;
		this.setState({ title, completed });
	};

	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
			// title: e.target.value
		});
	};

	onChangeCheck = () => {
		this.setState({ completed: false });
	};

	onSave = id => {
		const title = this.state.title;
		const completed = this.state.completed;
		this.props.saveUpdate(id, title, completed);
		this.props.cancelUpdateForm();
	};

	render() {
		let checkIcon;
		if (!this.state.completed) {
			checkIcon = <FontAwesomeIcon icon={faSquare} className="fa-square" />;
		} else {
			checkIcon = (
				<FontAwesomeIcon
					icon={faCheck}
					className="fa-check clickableItem upd"
					onClick={this.onChangeCheck}
				/>
			);
		}

		return (
			<React.Fragment>
				<div className="checkIconContainer">{checkIcon}</div>
				<input
					type="text"
					name="title"
					value={this.state.title}
					onChange={this.onChange}
				/>
				<div className="savCanButtons">
					<button
						id="save"
						onClick={this.onSave.bind(this, this.props.task._id)}
					>
						Save
					</button>
					<button id="cancel" onClick={this.props.cancelUpdateForm}>
						Cancel
					</button>
				</div>
			</React.Fragment>
		);
	}
}

export default UpdateForm;
