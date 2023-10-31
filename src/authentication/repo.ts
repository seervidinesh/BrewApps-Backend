import { SessionModel } from './schema';
export const saveSession = async (sessionId, userId) => {
    const session = new SessionModel({ userId, sessionId });
    return await session.save();
}

export const getSessionBySessionId = async (sessionId: string) => {
    return await SessionModel.findOne({ sessionId });
}

export const deleteSession = async (sessionId: string) => {
    return await SessionModel.deleteOne({ sessionId: sessionId });
}