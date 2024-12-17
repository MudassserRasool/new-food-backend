import profileModel from '../models/profileModel.js';
import profileService from '../services/profileService.js';

// get the user profile with the id of the user
const getCurrentProfileInfo = async (req, res) => {
  const userId = req.user._id.toString(); // Convert ObjectId to string

  try {
    const profile = await profileModel.findOne({ userId: userId });
    // .populate("userId");

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateProfileInfo = async (req, res, next) => {
  try {
    const result = await profileService.updateUserProfile(req);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export { getCurrentProfileInfo, updateProfileInfo };
