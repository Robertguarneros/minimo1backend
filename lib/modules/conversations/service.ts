import { IConversation } from './model';
import conversations from './schema';
import { FilterQuery } from 'mongoose';

export default class ConversationService {
    
    public async createConversation(conversations_params: IConversation): Promise<IConversation> {
        try {
            const session = new conversations(conversations_params);
            return await session.save();
        } catch (error) {
            throw error;
        }
    }

    public async filterConversations(query: any, page: number, pageSize: number): Promise<IConversation[] | null> {
        try {
            const skipCount = (page - 1) * pageSize;
            const updatedQuery = { ...query, conversation_deactivated: { $ne: true } };
            return await conversations.find(updatedQuery).skip(skipCount).limit(pageSize);
        } catch (error) {
            throw error;
        }
    }

    public async deactivateConversation(conversation_paramsPartial: Partial<IConversation>, conversation_filter: FilterQuery<IConversation>): Promise<void> {
        try {
            await conversations.findOneAndUpdate(conversation_filter, conversation_paramsPartial);
        } catch (error) {
            throw error;
        }
    }

}