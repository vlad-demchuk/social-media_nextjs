import { Message } from '@/graphql/generated/graphql';
import Link from 'next/link';

interface Props {
  message: Omit<Message, 'sender'> & { sender: { id: number; username: string; image?: string | null } };
}

export const MessageToast = ({ message }: Props) => {
  // TODO: Implement open chat with url search params
  const href = '/messages';

  return (
    <Link href={href ?? ''} className="block ">
      <div>{`New message from @${message.sender.username}`}</div>

      <div className="mt-2">{message.content}</div>
    </Link>
  );
};
