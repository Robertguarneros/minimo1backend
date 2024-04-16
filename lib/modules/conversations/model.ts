import * as mongoose from 'mongoose';

export interface IConversation {
    _id?: mongoose.Types.ObjectId; // Optional _id field
    user: mongoose.Types.ObjectId;
    content: string;
    conversation_deactivated?: boolean;
}