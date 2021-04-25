import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMember, saveMember } from "../services/memberServices";

class MemberForm extends Form {
	state = {
		data: {
			lp: "",
			memberName: "",
			address: "",
			isActive: true,
		},
		errors: {},
	};

	schema = {
		_id: Joi.string(),

		lp: Joi.string().required().label("License Plate"),
		memberName: Joi.string().required().min(6).label("Member Name"),
		address: Joi.string().required().min(6).label("Address"),
	};

	async populateMember() {
		try {
			const member_id = this.props.match.params.id;
			if (member_id === "new") return;
			const { data: member } = await getMember(member_id);
			this.setState({ data: this.mapToViewModel(member) });
		} catch (ex) {
			if (ex.response && ex.response.status === 404)
				this.props.history.replace("/not-found");
		}
	}

	async componentDidMount() {
		await this.populateMember();
	}

	mapToViewModel(member) {
		return {
			_id: member._id,
			lp: member.lp,
			memberName: member.memberName,
			address: member.address,
			isActive: member.isActive,
		};
	}

	doSubmit = async () => {
		await saveMember(this.state.data);
		this.props.history.push("/members");
	};

	render() {
		return (
			<div>
				<h4> New Member </h4>
				<h6>
					{" "}
					OBU number will be automatically assigned from the OBU database.
				</h6>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("lp", "License Plate")}
					{this.renderInput("memberName", "Member Name")}
					{this.renderInput("address", "Address")}
					{this.renderButton("Save")}
				</form>
			</div>
		);
	}
}

export default MemberForm;
