import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { Device, DeviceDocument } from './schemas/device.schema';

@Injectable()
export class DevicesRepository {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
  ) {}

  async findOne(deviceFilterQuery: FilterQuery<DeviceDocument>) {
    return this.deviceModel.findOne(deviceFilterQuery);
  }

  async find(devicesFilterQuery: FilterQuery<DeviceDocument>, limit = 20) {
    return this.deviceModel.find(devicesFilterQuery).limit(limit);
  }

  async create(device: Partial<Device> & { name: string; meta: string }) {
    const newDevice = new this.deviceModel(device);
    return newDevice.save();
  }

  async remove(deviceFilterQuery: FilterQuery<DeviceDocument>) {
    return this.deviceModel.deleteMany(deviceFilterQuery);
  }

  async findOneAndUpdate(
    deviceFilterQuery: FilterQuery<DeviceDocument>,
    device: Partial<Device>,
  ) {
    return this.deviceModel.findOneAndUpdate(deviceFilterQuery, device, {
      new: true,
    });
  }
}
