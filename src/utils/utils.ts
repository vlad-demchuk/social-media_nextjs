import { User } from '@/graphql/generated/graphql';

export const getParticipant = (participants: User[], currentUserId: string | null): User | null => {
  if (!currentUserId) {
    // TODO: check auth
    return null;
  }

  return participants.filter((participant) => participant.id !== Number(currentUserId))[0];
};
