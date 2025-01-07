import addressModel from '../models/addressModel.js';
import successResponse from '../utils/successResponse.js';

class AddressController {
  async createAddress(req, res, next) {
    const userId = req.user._id.toString();

    try {
      await addressModel.updateMany({ userId }, { $set: { isEnabled: false } });
      const addressData = await addressModel.create({
        userId,
        ...req.body,
      });

      successResponse(res, 'Address added successfully', addressData);
    } catch (error) {
      next(error);
    }
  }

  async getAddresses(req, res, next) {
    const userId = req.user._id.toString();
    try {
      const addresses = await addressModel.find({ userId });
      successResponse(res, 'Addresses fetched successfully', addresses);
    } catch (error) {
      next(error);
    }
  }

  async getAddress(req, res, next) {
    const userId = req.user._id.toString();
    const addressId = req.params.id;
    try {
      const address = await addressModel.findOne({ userId, _id: addressId });
      successResponse(res, 'Address fetched successfully', address);
    } catch (error) {
      next(error);
    }
  }

  async updateAddress(req, res, next) {
    const userId = req.user._id.toString();
    const addressId = req.params.id;
    try {
      // make other is enabled false
      await addressModel.updateMany({ userId }, { $set: { isEnabled: false } });
      const address = await addressModel.findOneAndUpdate(addressId, {
        isEnabled: true,
        ...req.body,
      });
      successResponse(res, 'Address updated successfully', address);
    } catch (error) {
      next(error);
    }
  }

  //  get default address
  async getEnabledAddress(req, res, next) {
    const userId = req.user._id.toString();
    try {
      const address = await addressModel.findOne({ userId, isEnabled: true });
      successResponse(res, 'Default address fetched successfully', address);
    } catch (error) {
      next(error);
    }
  }
}

const addressController = new AddressController();
export default addressController;
