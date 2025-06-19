const db = require("../models");
const UserActivities = db.models.user_activities;

const userActivity = async (user_id, business_id, activityType, notes) => {
	try {
		const userActivity = await UserActivities.create({
			user_id: user_id,
			business_id: business_id,
			activity_type: activityType,
			notes: notes,
			created_by: user_id
		});
		return { status: true };
	} catch (error) {
		logError(error);
		return { status: false };
	}
};

module.exports = {
	userActivity
};
