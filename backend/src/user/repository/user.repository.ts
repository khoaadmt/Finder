import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private UserModel: Model<User>,
  ) {}

  async findUserToUpdate(username: string): Promise<User> {
    const user = await this.UserModel.findOne({ username: username })
      .select('displayName contactPhone facebookId avaUrl')
      .lean();

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async saveUserByUsername(username: string, updateData: any): Promise<User> {
    const updatedUser = await this.UserModel.findOneAndUpdate(
      { username: username },
      { $set: updateData },
      { new: true, runValidators: true },
    ).select('displayName contactPhone facebookId avaUrl');
    return updatedUser;
  }
}
